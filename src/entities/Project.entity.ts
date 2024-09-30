import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Tasks } from './Tasks.entity';
import { History } from './History.entity';
import { Materials } from './Materials.entity';

@Entity({ name: 'projects' })
@ObjectType()
export class Projects {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  projectName: string;

  @Column()
  @Field()
  projectAdress: string;

  @Column()
  @Field()
  codePostal: number;

  @Column()
  @Field()
  city: string;

  @Column()
  @Column({ unique: true })
  @Field()
  reference: string;

  @Column()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  public createdAt: Date;

  @Column()
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  public updatedAt: Date;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  estimatedstartDate: Date;

  @Column()
  @Field()
  endDate: Date;

  @Column()
  @Field()
  estimatedEndDate: Date;

  @ManyToMany(() => User, (user) => user.projects)
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
  users: User[];

  @OneToMany(() => Tasks, (task) => task.project)
  tasks: Tasks[];

  @OneToMany(() => History, (history) => history.project)
  history: History[];

  @OneToMany(() => Materials, (material) => material.project)
  materials: Materials[];
}
