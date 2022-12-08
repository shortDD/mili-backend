import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class DelCommentInput {
  @Field((type) => Int)
  commentId: number;
}

@ObjectType()
export class DelCommentOutput extends CoreOutputDto {}
