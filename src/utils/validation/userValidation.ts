// import * as yup from 'yup';
// import { CreateUserDto } from '../../modules/user/dto/createUser.dto';
// import { UpdateUserDto } from '../../modules/user/dto/updateUser.dto';

// export const UpdatePasswordValidation = yup.object({
//   oldPassword: yup.string().required('Old password is required'),
//   password: yup
//     .string()
//     .required()
//     .min(4)
//     .max(20)
//     .matches(
//       /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
//       'Password too weak',
//     ),
//   confirmPassword: yup
//     .string()
//     .required()
//     .oneOf([yup.ref('password')], 'Passwords do not match'),
// });

// export const CreateUserValidation = yup.object<CreateUserDto>({
//   username: yup.string().required().min(3, 'user name too short').max(20),
//   firstname: yup.string().required().min(3, 'first name too short').max(20),
//   lastname: yup.string().required(),
//   email: yup.string().required().email(),
//   password: UpdatePasswordValidation,
//   adresse: yup.string().required(),
// });

// export const UpdateUserValidation = yup.object<UpdateUserDto>({
//   username: yup.string().required().min(3, 'user name too short').max(20),
//   firstname: yup.string().required().min(3, 'first name too short').max(20),
//   lastname: yup.string().required(),
//   email: yup.string().required().email(),
//   adresse: yup.string().required(),
// });

import * as yup from 'yup';
import { CreateUserDto } from '../../modules/user/dto/createUser.dto';
import { UpdateUserDto } from '../../modules/user/dto/updateUser.dto';

export const UpdatePasswordValidation = yup
  .string()
  .required()
  .min(4)
  .max(20)
  .matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    'Password too weak',
  );

export const CreateUserValidation = yup.object<CreateUserDto>({
  username: yup.string().required().min(3, 'Username is too short').max(20),
  firstname: yup.string().required().min(3, 'First name is too short').max(20),
  lastname: yup.string().required(),
  email: yup.string().required().email(),
  password: UpdatePasswordValidation,
  adresse: yup.string().required(),
});

export const UpdateUserValidation = yup.object<UpdateUserDto>({
  username: yup.string().required().min(3, 'Username is too short').max(20),
  firstname: yup.string().required().min(3, 'First name is too short').max(20),
  lastname: yup.string().required(),
  email: yup.string().required().email(),
  adresse: yup.string().required(),
});
