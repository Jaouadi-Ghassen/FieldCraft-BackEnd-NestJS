import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'notifications' })
@ObjectType()
export class Notifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  subTitle: string;

  @Column()
  @Field()
  content: string;

  @Column()
  isOpen: Boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  @Field()
  public createdAt: Date;

  @ManyToMany(() => User, (user) => user.notifications)
  @JoinTable({
    name: 'user_notification',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'notification_id',
      referencedColumnName: 'id',
    },
  })
  users: User[];
}
