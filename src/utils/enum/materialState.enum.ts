import { registerEnumType } from '@nestjs/graphql';

export enum MaterialState {
  new = 'new',
  old = 'old',
  used = 'used',
}

registerEnumType(MaterialState, {
  name: 'MaterialState',
});
