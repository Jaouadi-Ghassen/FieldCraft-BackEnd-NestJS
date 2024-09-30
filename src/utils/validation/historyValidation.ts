import * as yup from 'yup';
import { CreateHistoryDto } from '../../modules/history/dto/createHistory.dto';

export const CreateHistoryValidation = yup.object<CreateHistoryDto>({
  projectId: yup.string().required(),
});
