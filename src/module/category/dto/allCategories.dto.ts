import { Field, ObjectType, PickType, PartialType, Int } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutputDto {
  @Field((type) => [PartOnCategory])
  categories?: PartOnCategory[];
}
@ObjectType()
class PartOnCategory {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
}
