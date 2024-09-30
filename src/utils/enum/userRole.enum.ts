import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  admin = 'admin',
  diagnostician = 'diagnostician',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
