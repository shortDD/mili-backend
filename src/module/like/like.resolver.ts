import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth-guard/auth-user.decorator';
import { Roles } from 'src/auth-guard/roles.decorator';
import { User } from '../user/entities/user.entity';
import {
  ToggleLikeCommentInput,
  ToggleLikeCommentOutput,
  ToggleLikeInput,
  ToggleLikeOutput,
} from './dto/like-video.dto';
import { Like } from './entities/like.entity';
import { LikeService } from './like.service';

@Resolver((of) => Like)
export class LikeResolver {
  constructor(private likeService: LikeService) {}
  @Mutation((returns) => ToggleLikeOutput)
  @Roles('Any')
  toggleLike(
    @AuthUser() user: User,
    @Args() toggleLikeInput: ToggleLikeInput,
  ): Promise<ToggleLikeOutput> {
    return this.likeService.toggleLike(user, toggleLikeInput);
  }

  @Mutation((returns) => ToggleLikeCommentOutput)
  @Roles('Any')
  toggleLikeComment(
    @AuthUser() user: User,
    @Args() toggleLikeCommentInput: ToggleLikeCommentInput,
  ): Promise<ToggleLikeCommentOutput> {
    return this.likeService.toggleLikeComment(user, toggleLikeCommentInput);
  }
}
