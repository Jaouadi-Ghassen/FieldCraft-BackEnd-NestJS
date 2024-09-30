import { EntityManager } from 'typeorm';
import { User } from '../../entities/User.entity';

export const findUserByUsernameOrEmail = async (
  manager: EntityManager,
  username: string,
  email: string,
): Promise<User | undefined> => {
  const repository = manager.getRepository(User);
  return repository.findOne({
    where: [{ username }, { email }],
  });
};
