import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Prisma, Video as PrismaVideo } from '@prisma/client';
import { AuthUser } from 'src/auth-guard/auth-user.decorator';
import { Roles } from 'src/auth-guard/roles.decorator';
import { Comment } from '../comment/entities/comment.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserOutput } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { CreateVideoInput } from './dto/create-video.dto';
import { DelVideoInput, DelVideoOutput } from './dto/del-video.dto';
import {
  EditIntroductionInput,
  EditIntroductionOutput,
} from './dto/edit-introduction.dto';
import { SearchVideoInput, SearchVideoOutput } from './dto/search-video.dto';
import { SeeVideoInput, SeeVideoOutput } from './dto/see-video.dto';
import { SeedFeedOutput } from './dto/seedFeed.dto';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

@Resolver((of) => Video)
export class VideoResolver {
  constructor(
    private videoService: VideoService,
    private prisma: PrismaService,
  ) {}
  @Query((returns) => SeeVideoOutput)
  seeVideo(@Args() seeVideoInput: SeeVideoInput): Promise<SeeVideoOutput> {
    return this.videoService.seeVideo(seeVideoInput);
  }
  @Mutation((returns) => CreateUserOutput)
  @Roles('Any')
  createVideo(
    @AuthUser() user: User,
    @Args('input') createVideoInput: CreateVideoInput,
  ): Promise<CreateUserOutput> {
    return this.videoService.createVideo(user, createVideoInput);
  }
  @Mutation((returns) => DelVideoOutput)
  @Roles('Any')
  delVideo(
    @AuthUser() user: User,
    @Args() delVideoInput: DelVideoInput,
  ): Promise<CreateUserOutput> {
    return this.videoService.delVideo(user, delVideoInput);
  }
  @Mutation((returns) => EditIntroductionOutput)
  @Roles('Any')
  editIntroduction(
    @AuthUser() user: User,
    @Args('input') editIntroductionInput: EditIntroductionInput,
  ): Promise<EditIntroductionOutput> {
    return this.videoService.editIntroduction(user, editIntroductionInput);
  }

  @Query((returns) => SeedFeedOutput)
  seedFeed(): Promise<SeedFeedOutput> {
    return this.videoService.seedFeed();
  }
  @Query((returns) => SearchVideoOutput)
  searchVideo(
    @Args() searchVideoInput: SearchVideoInput,
  ): Promise<SearchVideoOutput> {
    return this.videoService.searchVideo(searchVideoInput);
  }
  @ResolveField((returns) => [Comment], { nullable: true })
  async comments(@Parent() video) {
    const comments = await this.prisma.video
      .findUnique({ where: { id: video.id } })
      .comments({ skip: 0, take: 10 });

    return comments;
  }
  @ResolveField((returns) => User, { nullable: true })
  async user(@Parent() video: Video) {
    const user = await this.prisma.user.findUnique({
      where: { id: video.userId },
    });
    return user;
  }
  @ResolveField((returns) => Boolean)
  async isMine(@Parent() video: PrismaVideo, @AuthUser() user: User) {
    return video.userId === user.id;
  }
  @ResolveField((returns) => Int)
  async likes(@Parent() video: Video) {
    const likes = await (
      await this.prisma.video
        .findUnique({ where: { id: video.id } })
        .videoLikes()
    ).length;
    return likes;
  }

  @ResolveField((returns) => Int)
  async totalComments(@Parent() video: Video) {
    let totalComments = 0;
    const comments = await await this.prisma.video
      .findUnique({ where: { id: video.id } })
      .comments();
    totalComments += comments.length;
    for (let i = 0; i < comments.length; i++) {
      const replys = await (
        await this.prisma.comment
          .findUnique({ where: { id: comments[i].id } })
          .replys()
      ).length;
      totalComments += replys;
    }
    return totalComments;
  }
  @ResolveField((returns) => Boolean)
  async isLike(@Parent() video: Video, @AuthUser() me: User) {
    if (!me) return false;
    const isLike = await await this.prisma.videoLike.findUnique({
      where: { userId_videoId: { userId: me.id, videoId: video.id } },
    });
    return isLike ? true : false;
  }
}
