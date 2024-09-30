import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRequest } from '../../utils/helpers/auth.helper';

export function getRequestValue(keyName: string, fromHeader = false) {
  return (_data: unknown, context: ExecutionContext) => {
    const req = getRequest(context);
    if (fromHeader) return req.headers[keyName];
    const res = (req as any)[keyName];
    if (!res) {
      console.error('getRequestValue', `missing key ${keyName} in request`);
      throw new NotFoundException(`missing key ${keyName} in request`);
    }
    return res;
  };
}

export const CurrentUser = createParamDecorator(getRequestValue('user'));
