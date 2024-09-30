import { Field, InputType } from '@nestjs/graphql';
import { ProjectState } from '../../../utils/enum/projectState.enum';

@InputType()
export class CreateHistoryDto {
  @Field()
  projectId: string;

  @Field()
  state: ProjectState;
}
