import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Video } from 'src/module/video/entities/video.entity';
import { Category } from '../entities/category.entity';

@ArgsType()
export class SeeCategoryInput {
  @Field((type) => Int)
  categoryId: number;
}

@ObjectType()
export class SeeCategoryOutput extends CoreOutputDto {
  @Field((type) => Category)
  category?: Category;
}
