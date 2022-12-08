import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends PickType(Comment, ['playload']) {
  @Field((type) => Int)
  videoId: number;
}

@ObjectType()
export class CreateCommentOutput extends CoreOutputDto {}
