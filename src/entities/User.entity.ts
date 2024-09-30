import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { UserRole } from '../utils/enum/userRole.enum';
import { Projects } from './Project.entity';
import { Materials } from './Materials.entity';
import { Notifications } from './Notification.entity';
@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id?: string;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  firstname: string;

  @Column({ unique: true })
  @Field()
  lastname: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  adresse: string;

  @Column()
  @Field()
  image: string;

  @Column()
  isdeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  public updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Object.keys(UserRole),
  })
  @Field(() => UserRole)
  role: UserRole;

  @ManyToMany(() => Projects, (project) => project.users)
  @JoinTable({
    name: 'user_project',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  projects: Projects[];

  @OneToMany(() => Materials, (material) => material.createdBy)
  materials: Materials[];

  @ManyToMany(() => Notifications, (notification) => notification.users)
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
  notifications: Notifications[];

  @Column()
  @Field()
  deviceToken: string;
}
