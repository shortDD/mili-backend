import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthUser } from 'src/auth-guard/auth-user.decorator';
import { Roles } from 'src/auth-guard/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { CommentService, ReplyService } from './comment.service';
import {
  CreateCommentInput,
  CreateCommentOutput,
} from './dto/create-comment.dto';
import { CreateReplyInput, CreateReplyOutput } from './dto/create-reply.dto';
import { DelCommentInput, DelCommentOutput } from './dto/del-comment.dto';
import { DelReplyInput, DelReplyOutput } from './dto/del-reply.dto';
import { SeeCommentsInput, SeeCommentsOutput } from './dto/see-comments.dto';
import { Comment } from './entities/comment.entity';
import { Reply } from './entities/reply.entity';

@Resolver((of) => Comment)
export class CommentResolver {
  constructor(
    private commentService: CommentService,
    private prisma: PrismaService,
  ) {}

  @Mutation((returns) => CreateCommentOutput)
  @Roles('Any')
  createComment(
    @AuthUser() user: User,
    @Args('input') createCommentInput: CreateCommentInput,
  ): Promise<CreateCommentOutput> {
    return this.commentService.createComment(user, createCommentInput);
  }
  @Mutation((returns) => DelCommentOutput)
  @Roles('Any')
  delComment(
    @AuthUser() user: User,
    @Args() delCommentInput: DelCommentInput,
  ): Promise<DelCommentOutput> {
    return this.commentService.delComment(user, delCommentInput);
  }
  @Query((returns) => SeeCommentsOutput)
  seeComments(
    @Args('input') seeCommentsInput: SeeCommentsInput,
  ): Promise<SeeCommentsOutput> {
    return this.commentService.seeComments(seeCommentsInput);
  }

  @ResolveField((returns) => [Reply], { nullable: true })
  async replys(@Parent() comment: Comment) {
    const replys = await this.prisma.comment
      .findUnique({ where: { id: comment.id } })
      .replys();
    return replys;
  }

  @ResolveField((returns) => User)
  async user(@Parent() comment: Comment) {
    const user = await this.prisma.user.findUnique({
      where: { id: comment.userId },
    });
    return user;
  }

  @ResolveField((returns) => Boolean)
  async isMine(@Parent() comment: Comment, @AuthUser() me: User) {
    if (!me) return false;
    return comment.userId === me.id;
  }
  @ResolveField((returns) => Int)
  async likes(@Parent() comment: Comment) {
    const likes = await (
      await this.prisma.comment
        .findUnique({ where: { id: comment.id } })
        .commentLikes()
    ).length;
    return likes;
  }
  @ResolveField((returns) => Boolean)
  async isLike(@Parent() comment: Comment, @AuthUser() me: User) {
    if (!me) return false;
    const isLike = await await this.prisma.commentLike.findUnique({
      where: { userId_commentId: { userId: me.id, commentId: comment.id } },
    });
    return isLike ? true : false;
  }
  @ResolveField((returns) => Int)
  async totalReplys(@Parent() comment: Comment) {
    const totalReplys = await (
      await this.prisma.comment
        .findUnique({ where: { id: comment.id } })
        .replys()
    ).length;
    return totalReplys;
  }
}

@Resolver((of) => Reply)
export class ReplyResolver {
  constructor(
    private replyService: ReplyService,
    private prisma: PrismaService,
  ) {}

  @Mutation((returns) => CreateReplyOutput)
  @Roles('Any')
  createReply(
    @AuthUser() user: User,
    @Args('input') createReplyInput: CreateReplyInput,
  ): Promise<CreateReplyOutput> {
    return this.replyService.createReply(user, createReplyInput);
  }

  @Mutation((returns) => DelReplyOutput)
  @Roles('Any')
  delReply(
    @AuthUser() user: User,
    @Args() delReplyInput: DelReplyInput,
  ): Promise<DelReplyOutput> {
    return this.replyService.delReply(user, delReplyInput);
  }
  @ResolveField((returns) => Int)
  async likes(@Parent() reply: Reply) {
    const likes = await (
      await this.prisma.reply
        .findUnique({ where: { id: reply.id } })
        .commentLikes()
    ).length;
    return likes;
  }
  @ResolveField((returns) => Boolean)
  async isMine(@Parent() reply: Reply, @AuthUser() me: User) {
    if (!me) return false;
    return reply.userId === me.id;
  }

  @ResolveField((returns) => Boolean)
  async isLike(@Parent() reply: Reply, @AuthUser() me: User) {
    if (!me) return false;
    const isLike = await await this.prisma.commentLike.findUnique({
      where: { userId_replyId: { userId: me.id, replyId: reply.id } },
    });
    return isLike ? true : false;
  }

  @ResolveField((returns) => User)
  async user(@Parent() reply: Reply) {
    const user = await this.prisma.user.findUnique({
      where: { id: reply.userId },
    });
    return user;
  }
}
