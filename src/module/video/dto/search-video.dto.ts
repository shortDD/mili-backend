import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Video } from '../entities/video.entity';

@ArgsType()
export class SearchVideoInput {
  @Field((type) => String)
  keyword: string;
}

@ObjectType()
export class SearchVideoOutput extends CoreOutputDto {
  @Field((type) => [Video])
  videos?: Video[];
}
