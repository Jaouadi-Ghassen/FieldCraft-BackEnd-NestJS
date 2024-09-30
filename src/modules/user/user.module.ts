import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { Images } from '../../entities/Images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Images])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
