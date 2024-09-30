import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Materials } from './Materials.entity';

@Entity({ name: 'materialImage' })
@ObjectType()
export class Images {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  imagePath: string;

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

  @Column({ name: 'material_id' })
  @Field()
  materialtId: string;

  @ManyToOne(() => Materials, (material) => material.images)
  @JoinColumn({ name: 'material_id', referencedColumnName: 'id' })
  material: Materials;
}
