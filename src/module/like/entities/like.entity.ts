import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Video } from 'src/module/video/entities/video.entity';

@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class Like extends CoreEntity {
  @Field((type) => User)
  user: User;
  @Field((type) => Video)
  video: Video;
}
