import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationtDto {
  @Field()
  title: string;

  @Field()
  subTitle: string;

  @Field()
  content: string;
}

@InputType()
export class UpdateNotificationtDto {
  @Field()
  title: string;

  @Field()
  subTitle: string;

  @Field()
  content: string;
}
