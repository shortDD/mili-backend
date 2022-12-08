import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field((type) => Int)
  take: number;

  @Field((type) => Int)
  page: number;
}
