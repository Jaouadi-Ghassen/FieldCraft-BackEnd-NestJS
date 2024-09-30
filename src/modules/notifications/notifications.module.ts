import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from '../../entities/Notification.entity';
import { User } from '../../entities/User.entity';
import { FirebaseModule } from '../../firebase.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications, User]), FirebaseModule],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
