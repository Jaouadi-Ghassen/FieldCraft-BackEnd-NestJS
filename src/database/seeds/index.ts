import { AppDataSource } from '../../../ormconfig';
import UserSeeder from './user.seeder';

AppDataSource.initialize()
  .then(async () => {
    console.log('test');
    const manager = AppDataSource.manager;
    UserSeeder(manager);
  })
  .catch((error) => console.log(error));
