import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutputDto {
  @Field((type) => User, { nullable: true })
  user?: User;
}
