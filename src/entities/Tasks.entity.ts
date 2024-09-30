import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projects } from './Project.entity';
import { ProjectState } from '../utils/enum/projectState.enum';

@Entity({ name: 'tasks' })
@ObjectType()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ name: 'project_id' })
  @Field()
  projectId: string;

  @Column()
  @Field()
  taskName: string;

  @Column()
  @Field()
  description: string;

  @Column({ default: false })
  @Field()
  taskState: boolean;

  @Column({ default: false })
  resetProject: boolean;

  @Column({ type: 'enum', enum: ProjectState })
  @Field(() => ProjectState)
  taskPhase: ProjectState;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedAt: Date;

  @ManyToOne(() => Projects, (project) => project.tasks)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Projects;
}
