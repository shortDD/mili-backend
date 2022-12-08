import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Roles } from 'src/auth-guard/roles.decorator';
import { CategoryService } from './category.service';
import { AllCategoriesOutput } from './dto/allCategories.dto';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './dto/create-category.dto';
import { DelCategoryInput, DelCategoryOutput } from './dto/del-category.dto';
import { SeeCategoryInput, SeeCategoryOutput } from './dto/see-category.dto';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query((type) => SeeCategoryOutput)
  seeCategory(
    @Args() seeCategoryInput: SeeCategoryInput,
  ): Promise<SeeCategoryOutput> {
    return this.categoryService.seeCategory(seeCategoryInput);
  }

  @Query((type) => AllCategoriesOutput)
  allCategory(): Promise<AllCategoriesOutput> {
    return this.categoryService.allCategories();
  }

  @Mutation((type) => CreateCategoryOutput)
  @Roles('Vip')
  createCategory(
    @Args() createCategoryInput: CreateCategoryInput,
  ): Promise<CreateCategoryOutput> {
    return this.categoryService.createCategory(createCategoryInput);
  }
  @Mutation((type) => UpdateCategoryOutput)
  @Roles('Vip')
  updateCategory(
    @Args('input') updateCategoryInput: UpdateCategoryInput,
  ): Promise<UpdateCategoryOutput> {
    return this.categoryService.updateCategory(updateCategoryInput);
  }

  @Mutation((type) => DelCategoryOutput)
  @Roles('Vip')
  delCategory(
    @Args() delCategoryInput: DelCategoryInput,
  ): Promise<DelCategoryOutput> {
    return this.categoryService.delCategory(delCategoryInput);
  }
}
