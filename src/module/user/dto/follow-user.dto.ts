import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class FollowUserInput {
  @Field((type) => Int)
  userId: number;
}

@ObjectType()
export class FollowUserOutput extends CoreOutputDto {}
