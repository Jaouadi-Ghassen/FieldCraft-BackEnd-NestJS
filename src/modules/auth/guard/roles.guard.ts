import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../utils/enum/userRole.enum';
import { ROLES_KEY } from '../../../common/decorator/roles.decorator';
import {
  extractTokenFromHeader,
  getRequest,
} from '../../../utils/helpers/auth.helper';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = getRequest(context);
    const token = extractTokenFromHeader(req);
    const result: any = this.jwtService.decode(token);

    return requiredRoles.includes(result.role);
  }
}
