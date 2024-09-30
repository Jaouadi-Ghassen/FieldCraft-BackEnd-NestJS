import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaterialState } from '../utils/enum/materialState.enum';
import { User } from './User.entity';
import { Projects } from './Project.entity';
import { Images } from './Images.entity';
import { Category } from './Category.entity';

@Entity({ name: 'materials' })
@ObjectType()
export class Materials {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ name: 'project_id' })
  @Field()
  projectId: string;

  @Column({ name: 'category_id' })
  @Field()
  categoryId: string;

  @Column()
  @Field()
  materialName: string;

  @Column({ type: 'enum', enum: MaterialState, name: 'material_state' })
  @Field()
  materialState: MaterialState;

  @Column()
  @Field()
  price: number;

  @Column()
  @Field()
  quantity: number;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  created_by_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @ManyToOne(() => Projects, (project) => project.materials)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Projects;

  @OneToMany(() => Images, (images) => images.material)
  @Field(() => [Images])
  images: Images[];

  @ManyToOne(() => Category, (category) => category.materials)
  @JoinColumn({ name: 'category_id' })
  @Field(() => Category)
  category: Category;

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
}
