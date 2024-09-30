import * as yup from 'yup';
import {
  CreateNotificationtDto,
  UpdateNotificationtDto,
} from '../../modules/notifications/dto/notification.dto';

export const CreateNotificationValidation = yup.object<CreateNotificationtDto>({
  title: yup.string().required(),
  subTitle: yup.string().required(),
  content: yup.string().required(),
});

export const UpdateNotificationValidation = yup.object<UpdateNotificationtDto>({
  title: yup.string().required(),
  subTitle: yup.string().required(),
  content: yup.string().required(),
});
