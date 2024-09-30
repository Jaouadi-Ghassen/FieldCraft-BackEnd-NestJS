import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordDto {
  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field()
  oldPassword: string;
}
