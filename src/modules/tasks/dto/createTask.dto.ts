import { Field, InputType } from '@nestjs/graphql';
import { ProjectState } from '../../../utils/enum/projectState.enum';

@InputType()
export class CreateTaskDto {
  @Field()
  projectId: string;

  @Field()
  taskName: string;

  @Field()
  description: string;

  @Field()
  resetProject: boolean;

  @Field()
  taskPhase: ProjectState;
}
