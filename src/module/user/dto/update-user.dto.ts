import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { CreateUserInput } from './create-user.dto';
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutputDto {}
