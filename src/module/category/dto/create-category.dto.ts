import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class CreateCategoryInput {
  @Field((type) => String)
  name: string;
}

@ObjectType()
export class CreateCategoryOutput extends CoreOutputDto {}

@InputType()
export class UpdateCategoryInput {
  @Field((type) => Int)
  categoryId: number;
  @Field((type) => String)
  name: string;
}

@ObjectType()
export class UpdateCategoryOutput extends CoreOutputDto {}
