import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  username: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  adresse: string;

  @Field()
  image: string;
}
