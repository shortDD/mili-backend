import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@ArgsType()
export class DelCategoryInput {
  @Field((type) => Int)
  categoryId: number;
}

@ObjectType()
export class DelCategoryOutput extends CoreOutputDto {}
