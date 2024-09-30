import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export function getRequest(context: ExecutionContext) {
  let req: any;

  if (context.getType() === 'http') {
    req = context.switchToHttp().getRequest();
  } else {
    // assume context is graphql
    const ctx = GqlExecutionContext.create(context);
    req = ctx.getContext().req as any;
  }

  return req;
}

export function extractTokenFromHeader(request: any): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
