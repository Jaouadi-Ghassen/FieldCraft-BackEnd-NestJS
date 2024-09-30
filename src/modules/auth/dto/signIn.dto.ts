import { Field, InputType, ObjectType } from '@nestjs/graphql';
@InputType()
export class SigninDto {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class SignInResult {
  @Field()
  access_token: string;

  @Field()
  username: string;

  @Field()
  image: string;
}
