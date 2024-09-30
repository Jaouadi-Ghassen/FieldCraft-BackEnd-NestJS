import { Field, InputType } from '@nestjs/graphql';
import { MaterialState } from '../../../utils/enum/materialState.enum';

@InputType()
export class CreateMaterialsDto {
  @Field()
  materialName: string;

  @Field(() => MaterialState)
  materialState: MaterialState;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  description: string;

  @Field()
  projectId: string;

  @Field()
  categoryId: string;
}
