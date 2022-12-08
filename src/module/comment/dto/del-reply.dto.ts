import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class DelReplyInput {
  @Field((type) => Int)
  replyId: number;
}

@ObjectType()
export class DelReplyOutput extends CoreOutputDto {}
