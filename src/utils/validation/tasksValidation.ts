import * as yup from 'yup';
import { CreateTaskDto } from '../../modules/tasks/dto/createTask.dto';
import { UpdateTaskDto } from '../../modules/tasks/dto/updateTask.dto';
import { ProjectState } from '../enum/projectState.enum';

export const CreateTaskValidation = yup.object<CreateTaskDto>({
  projectId: yup.string().required(),
  taskName: yup.string().required().min(3, 'Name too short'),
  description: yup.string().required().min(3, 'Description too short'),
  resetProject: yup.boolean().required(),
  taskPhase: yup
    .mixed<ProjectState>()
    .oneOf(Object.values(ProjectState))
    .required(),
});

export const UpdateTaskValidation = yup.object<UpdateTaskDto>({
  taskName: yup.string().required().min(3, 'Name too short'),
  description: yup.string().required().min(3, 'Description too short'),
});
