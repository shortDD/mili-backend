import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType({ isAbstract: true })
export class CoreEntity {
  @Field((type) => Int)
  id: number;
  @Field((type) => Date)
  createdAt: Date;
  @Field((type) => Date)
  updatedAt: Date;
}
