import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Video } from '../entities/video.entity';

@InputType()
export class CreateVideoInput extends PickType(Video, [
  'title',
  'coverUrl',
  'fileUrl',
  'introduction',
]) {
  @Field((type) => Int)
  categoryId: number;
}

@ObjectType()
export class CreateVideoOutput extends CoreOutputDto {}
