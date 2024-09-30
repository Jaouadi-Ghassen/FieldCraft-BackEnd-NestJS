import { InputType, Field } from '@nestjs/graphql';
import { MaterialState } from '../../../utils/enum/materialState.enum';
import { Category } from '../../../entities/Category.entity';

@InputType()
export class UpdateMaterialsDto {
  @Field()
  materialName: string;

  @Field()
  materialState: MaterialState;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  description: string;

  @Field({ nullable: true })
  categoryId: string;
}
