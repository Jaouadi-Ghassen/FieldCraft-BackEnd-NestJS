import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from '../../entities/Project.entity';
import { User } from '../../entities/User.entity';
import { UserModule } from '../user/user.module';
import { HistoryModule } from '../history/history.module';
import { FirebaseModule } from '../../firebase.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projects, User]),
    FirebaseModule,
    UserModule,
    HistoryModule,
    NotificationsModule,
  ],
  providers: [ProjectResolver, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
