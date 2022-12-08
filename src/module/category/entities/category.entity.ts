import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
import { Video } from 'src/module/video/entities/video.entity';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class Category extends CoreEntity {
  @Field((type) => String)
  name: string;

  @Field((type) => [Video])
  videos?: Video[];
}
