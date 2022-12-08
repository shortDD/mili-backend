import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutputDto } from 'src/dto/core.dto';

@InputType()
export class EditIntroductionInput {
  @Field((type) => Int)
  videoId: number;

  @Field((type) => String)
  introduction: string;
}

@ObjectType()
export class EditIntroductionOutput extends CoreOutputDto {}
