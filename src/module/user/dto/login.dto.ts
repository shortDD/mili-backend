import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { User } from '../entities/user.entity';
@InputType()
export class LoginInput extends PickType(User, ['username', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutputDto {
  @Field((type) => String, { nullable: true })
  token?: string;
}
