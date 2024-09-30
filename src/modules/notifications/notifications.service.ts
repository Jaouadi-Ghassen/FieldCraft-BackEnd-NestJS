import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from '../../entities/Notification.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/User.entity';
import {
  CreateNotificationtDto,
  UpdateNotificationtDto,
} from './dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepository: Repository<Notifications>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findNotificationById(id: string): Promise<Notifications> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return notification;
  }

  async findAllNotifications(): Promise<Notifications[]> {
    return await this.notificationRepository.find();
  }

  async findNotificationByUserId(userId: string): Promise<Notifications[]> {
    const user = await this.userRepository.find({
      where: { id: userId },
      relations: ['notifications'],
    });
    if (!user || user.length === 0) {
      throw new NotFoundException('User not found');
    }
    return user[0].notifications;
  }

  async createNotification(
    createNotificationtDto: CreateNotificationtDto,
  ): Promise<Notifications> {
    // console.log(createNotificationtDto);
    // const existingNotification = await this.notificationRepository.findOne({
    //   where: { title: createNotificationtDto.title },
    // });
    // if (existingNotification) {
    //   throw new ConflictException('Notification already exists');
    // }
    const newMNotification = this.notificationRepository.create(
      createNotificationtDto,
    );
    console.log(newMNotification);
    return await this.notificationRepository.save(newMNotification);
  }

  async updateNotification(
    id: string,
    updateNotificationtDto: UpdateNotificationtDto,
  ): Promise<Notifications> {
    const notification = await this.findNotificationById(id);
    Object.assign(notification, updateNotificationtDto);
    return await this.notificationRepository.save(notification);
  }

  async deleteNotification(id: string): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('notification not found');
    }
  }
}
