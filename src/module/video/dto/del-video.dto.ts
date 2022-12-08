import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class DelVideoInput {
  @Field((type) => Int)
  videoId: number;
}

@ObjectType()
export class DelVideoOutput extends CoreOutputDto {}
