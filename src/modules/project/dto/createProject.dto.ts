import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectDto {
  @Field()
  projectName: string;

  @Field()
  projectAdress: string;

  @Field()
  codePostal: number;

  @Field()
  city: string;

  @Field()
  reference: string;

  @Field()
  estimatedstartDate: Date;

  @Field()
  startDate: Date;

  @Field()
  estimatedEndDate: Date;

  @Field()
  endDate: Date;
}
