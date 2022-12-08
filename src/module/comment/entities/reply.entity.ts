import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/entities/core.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Comment } from './comment.entity';
@InputType({ isAbstract: true })
@ObjectType({ isAbstract: true })
export class Reply extends CoreEntity {
  @Field((type) => User)
  user: User;
  @Field((type) => Int)
  userId: number;
  @Field((type) => Comment)
  rootComment: Comment;

  @Field((type) => Reply, { nullable: true })
  parentComment?: Reply;

  @Field((type) => String)
  playload: string;

  // replys          Reply[]       @relation("reply")
  // commentLikes    CommentLike[]
}
