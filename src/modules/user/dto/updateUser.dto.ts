import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  adresse: string;
}
