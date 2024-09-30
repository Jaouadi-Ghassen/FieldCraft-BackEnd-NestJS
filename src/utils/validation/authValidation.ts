import { SigninDto } from '../../modules/auth/dto/signIn.dto';
import * as yup from 'yup';

export const AuthValidation = yup.object<SigninDto>({
  username: yup.string().required(),
  password: yup.string().required(),
});
