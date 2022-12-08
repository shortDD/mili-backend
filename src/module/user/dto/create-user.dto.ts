import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { User } from '../entities/user.entity';
@InputType()
export class CreateUserInput extends PickType(User, [
  'avatar',
  'bio',
  'password',
  'username',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutputDto {}
