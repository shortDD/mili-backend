import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class ToggleLikeInput {
  @Field((type) => Int)
  videoId: number;
}

@ObjectType()
export class ToggleLikeOutput extends CoreOutputDto {}
@ArgsType()
export class ToggleLikeCommentInput {
  @Field((type) => Int, { nullable: true })
  commentId?: number;
  @Field((type) => Int, { nullable: true })
  replyId?: number;
}

@ObjectType()
export class ToggleLikeCommentOutput extends CoreOutputDto {}
