import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';
import { Pagination } from 'src/dto/pagination.dto';
import { User } from '../entities/user.entity';

@InputType()
export class SeeFollowersInput extends Pagination {
  @Field((type) => String)
  username: string;
}

@ObjectType()
export class SeeFollowersOutput extends CoreOutputDto {
  @Field((type) => [User], { nullable: true })
  followers?: User[];
  @Field((type) => Int, { nullable: true })
  totalPages?: number;
}
