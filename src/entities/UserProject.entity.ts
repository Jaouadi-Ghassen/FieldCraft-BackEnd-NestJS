import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User.entity';
import { Projects } from './Project.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'user_project' })
@ObjectType()
export class UserProject {
  @PrimaryColumn('uuid')
  @Field()
  userId?: string;

  @PrimaryColumn('uuid')
  @Field()
  projectId?: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: User;

  @ManyToOne(() => Projects, (project) => project.users)
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  projects: Projects;
}
