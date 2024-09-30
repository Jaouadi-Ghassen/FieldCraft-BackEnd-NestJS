import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectState } from '../utils/enum/projectState.enum';
import { Projects } from './Project.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'history' })
@ObjectType()
export class History {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: 'enum',
    enum: ProjectState,
    name: 'project_state',
  })
  @Field()
  state: ProjectState;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  @Field()
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  public updatedAt: Date;

  @Column({ name: 'project_id' })
  @Field()
  projectId: string;

  @ManyToOne(() => Projects, (project) => project.history)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Projects;
}
