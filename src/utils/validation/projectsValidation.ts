import * as yup from 'yup';
import { CreateProjectDto } from '../../modules/project/dto/createProject.dto';
import { UpdateProjectDto } from '../../modules/project/dto/updateProject.dto';

export const CreateProjectValidation = yup.object<CreateProjectDto>({
  projectName: yup.string().required().min(3, 'name too short').max(20),
  projectAdress: yup.string().required(),
  codePostal: yup.number().required(),
  city: yup.string().required(),
  reference: yup.string().required().min(4),
});

export const UpdateProjectValidation = yup.object<UpdateProjectDto>({
  projectName: yup.string().required().min(3, 'name too short').max(20),
  projectAdress: yup.string().required(),
  codePostal: yup.number().required(),
  city: yup.string().required(),
  reference: yup.string().required().min(4),
});
