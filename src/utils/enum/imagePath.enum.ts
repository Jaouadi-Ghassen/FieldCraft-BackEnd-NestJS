import { registerEnumType } from '@nestjs/graphql';

export enum ImageType {
  profile = 'profile',
  materials = 'materials',
}

registerEnumType(ImageType, {
  name: 'ImageType',
});
