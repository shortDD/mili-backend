import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Pagination } from 'src/dto/pagination.dto';
import { Comment } from '../entities/comment.entity';

@InputType()
export class SeeCommentsInput extends Pagination {
  @Field((type) => Int)
  videoId: number;
}

@ObjectType()
export class SeeCommentsOutput extends CoreOutputDto {
  @Field((type) => [Comment])
  comments?: Comment[];
}
