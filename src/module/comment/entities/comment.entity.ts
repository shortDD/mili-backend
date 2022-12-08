import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Video } from 'src/module/video/entities/video.entity';
import { Comment as PrismaComment } from '@prisma/client';
import { Reply } from './reply.entity';
@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class Comment extends CoreEntity {
  // @Field((type) => User)
  // user: User;
  // @Field((type) => Video)
  // video: Video;
  @Field((type) => String)
  playload: string;
  @Field((type) => Int)
  userId: number;
  // @Field((type) => [Reply])
  // replys: Reply[];
  // commentLikes  CommentLike[]
  // childComments Reply[]
}
