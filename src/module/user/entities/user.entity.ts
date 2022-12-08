import { CoreEntity } from 'src/entities/core.entity';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { Video } from 'src/module/video/entities/video.entity';
@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class User extends CoreEntity {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
  @Field((type) => String, { nullable: true })
  avatar?: string;

  @Field((type) => String, { nullable: true })
  bio?: string;

  @Field((type) => [User], { nullable: true })
  following?: User[];
  @Field((type) => [User], { nullable: true })
  followed?: User[];

  // @Field((type) => [Video], { nullable: true })
  // videos?: Video[];
}
