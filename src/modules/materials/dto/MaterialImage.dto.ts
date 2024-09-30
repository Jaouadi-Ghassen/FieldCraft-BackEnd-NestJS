import { Field, InputType } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class UploadMaterialImageDTO {
  @Field()
  materialId: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}
