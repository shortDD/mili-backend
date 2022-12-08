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
import { Video } from '../video/entities/video.entity';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { FollowUserInput, FollowUserOutput } from './dto/follow-user.dto';
import { LoginInput, LoginOutput } from './dto/login.dto';
import { UnfollowUserInput, UnfollowUserOutput } from './dto/unfollow-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.dto';
import { UserProfileInput, UserProfileOutput } from './dto/userProfile.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}
  @Query((returns) => User)
  @Roles('Any')
  me(@AuthUser() me: User): User {
    return me;
  }

  @Query((returns) => UserProfileOutput)
  userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.userProfle(userProfileInput);
  }
  @Mutation((returns) => CreateUserOutput)
  createAccount(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.userService.createAccount(createUserInput);
  }

  @Mutation((retruns) => LoginOutput)
  login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Mutation((retruns) => UpdateUserOutput)
  @Roles('Any')
  updateUser(
    @AuthUser() user: User,
    @Args('input') updateUserInput: UpdateUserInput,
  ): Promise<UpdateUserOutput> {
    return this.userService.updateUser(user, updateUserInput);
  }
  @Mutation((retruns) => FollowUserOutput)
  @Roles('Any')
  followUser(
    @AuthUser() user: User,
    @Args() followUserInput: FollowUserInput,
  ): Promise<FollowUserOutput> {
    return this.userService.followUser(user, followUserInput);
  }
  @Mutation((retruns) => UnfollowUserOutput)
  @Roles('Any')
  unfollowUser(
    @AuthUser() user: User,
    @Args() unfollowUserInput: UnfollowUserInput,
  ): Promise<UnfollowUserOutput> {
    return this.userService.followUser(user, unfollowUserInput);
  }

  @ResolveField((returns) => [Video])
  async videos(@Parent() user: User) {
    const videos = await this.prisma.user
      .findUnique({ where: { id: user.id } })
      .videos();
    return videos;
  }
  @ResolveField((returns) => Boolean)
  async isMe(@Parent() user: User, @AuthUser() me: User) {
    if (!me) return false;
    return me.id === user.id;
  }
  @ResolveField((returns) => Boolean)
  async isfollowing(@Parent() user: User, @AuthUser() me: User) {
    if (!me) return false;
    const exist = await this.prisma.user
      .findUnique({ where: { id: me.id } })
      .following({ where: { id: user.id } });
    return exist.length ? true : false;
  }

  @ResolveField((returns) => Int)
  async totalFollowings(@Parent() user: User) {
    const nums = await (
      await this.prisma.user.findUnique({ where: { id: user.id } }).following()
    ).length;
    return nums;
  }

  @ResolveField((returns) => Int)
  async totalFolloweds(@Parent() user: User) {
    const nums = await (
      await this.prisma.user.findUnique({ where: { id: user.id } }).followed()
    ).length;
    return nums;
  }
  @ResolveField((returns) => Int)
  async posts(@Parent() user: User) {
    const nums = await (
      await this.prisma.user.findUnique({ where: { id: user.id } }).videos()
    ).length;
    return nums;
  }
}
