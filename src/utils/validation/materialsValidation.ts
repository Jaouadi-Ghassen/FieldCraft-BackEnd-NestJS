import * as yup from 'yup';
import { CreateMaterialsDto } from '../../modules/materials/dto/create-materials.dto';
import { MaterialState } from '../enum/materialState.enum';
import { UpdateMaterialsDto } from '../../modules/materials/dto/update-materials.dto';

export const CreateMaterialsValidation = yup.object<CreateMaterialsDto>({
  materialName: yup.string().required().min(3, 'Name too short'),
  description: yup.string().required().min(3, 'Description too short'),
  price: yup.number().required(),
  quantity: yup.number().required(),
  materialState: yup
    .mixed<MaterialState>()
    .oneOf(Object.values(MaterialState))
    .required(),
});

export const UpdateMaterialsValidation = yup.object<UpdateMaterialsDto>({
  materialName: yup.string().required().min(3, 'Name too short'),
  description: yup.string().required().min(3, 'Description too short'),
  price: yup.number().required(),
  quantity: yup.number().required(),
  materialState: yup
    .mixed<MaterialState>()
    .oneOf(Object.values(MaterialState))
    .required(),
});
