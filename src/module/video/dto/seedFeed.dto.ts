import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Video } from 'src/module/video/entities/video.entity';

@ObjectType()
export class SeedFeedOutput extends CoreOutputDto {
  @Field((type) => [Video], { nullable: true })
  videos?: Video[];
}
