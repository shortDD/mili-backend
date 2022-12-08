import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Comment } from '../entities/comment.entity';
import { Reply } from '../entities/reply.entity';

@InputType()
export class CreateReplyInput extends PickType(Reply, ['playload']) {
  @Field((type) => Int)
  rootCommentId: number;
  @Field((type) => Int, { nullable: true })
  parentCommentId?: number;
}

@ObjectType()
export class CreateReplyOutput extends CoreOutputDto {}
