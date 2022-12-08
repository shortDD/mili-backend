import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Video } from '../entities/video.entity';

@ArgsType()
export class SeeVideoInput {
  @Field((type) => Int)
  id: number;
}

@ObjectType()
export class SeeVideoOutput extends CoreOutputDto {
  @Field((type) => Video, { nullable: true })
  video?: Video;
}
