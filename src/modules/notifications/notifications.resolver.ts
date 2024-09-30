import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notifications } from '../../entities/Notification.entity';
import {
  CreateNotificationtDto,
  UpdateNotificationtDto,
} from './dto/notification.dto';

@Resolver(() => Notifications)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notifications])
  async notifications(): Promise<Notifications[]> {
    return this.notificationsService.findAllNotifications();
  }

  @Mutation(() => Notifications)
  async createNotification(
    @Args('values') values: CreateNotificationtDto,
  ): Promise<Notifications> {
    return this.notificationsService.createNotification(values);
  }

  @Mutation(() => Notifications)
  async updateNotification(
    @Args('id') id: string,
    @Args('values')
    values: UpdateNotificationtDto,
  ): Promise<Notifications> {
    return this.notificationsService.updateNotification(id, values);
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('id') id: string): Promise<boolean> {
    await this.notificationsService.deleteNotification(id);
    return true;
  }
}
