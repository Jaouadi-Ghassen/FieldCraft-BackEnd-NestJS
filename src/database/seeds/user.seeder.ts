import { EntityManager } from 'typeorm';
import { User } from '../../entities/User.entity';
import { hashPassword } from '../../utils/helpers/hashPassword';
import { UserRole } from '../../utils/enum/userRole.enum';
import { v4 as uuidv4 } from 'uuid';
import { findUserByUsernameOrEmail } from '../../utils/helpers/findUserByUsernameOrEmail';

const UserSeeder = async (manager: EntityManager) => {
  const repository = manager.getRepository(User);

  const userToSeed = [
    {
      id: uuidv4(),
      username: 'admin',
      password: await hashPassword('admin'),
      role: UserRole.admin,
      firstname: 'admin',
      lastname: 'admin',
      adresse: 'sousse',
      isdeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      image: 'urlimage',
      email: 'admin@gmail.com',
    },
  ];

  for (const user of userToSeed) {
    const existingUser = await findUserByUsernameOrEmail(
      manager,
      user.username,
      user.email,
    );
    if (existingUser) {
      console.log(
        `User with username ${user.username} or email ${user.email} already exists.`,
      );
    } else {
      await repository.insert(user);
      console.log(`User ${user.username} seeded successfully.`);
    }
  }
};

export default UserSeeder;
