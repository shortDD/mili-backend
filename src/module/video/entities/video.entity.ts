import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class Video extends CoreEntity {
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  fileUrl: string;
  @Field((type) => String)
  coverUrl: string;
  @Field((type) => String, { nullable: true })
  introduction?: string;

  @Field((type) => Int)
  userId: number;
  // @Field((type) => User)
  // user: User;
  // @Field((type) => [Comment])
  // comments?: Comment[];
  //   videoLikes VideoLike[]
  //   categories Category[]
}
