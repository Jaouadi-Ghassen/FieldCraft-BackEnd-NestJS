import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Materials } from './Materials.entity';

@Entity({ name: 'category' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Category, (category) => category.children)
  @JoinColumn({ name: 'parent_id' })
  @Field(() => Category, { nullable: true })
  parent?: Category;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  parent_id: string | null;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

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

  @OneToMany(() => Materials, (materials) => materials.category)
  materials: Materials[];
}
