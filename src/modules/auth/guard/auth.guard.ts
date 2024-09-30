import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constant';
import { Reflector } from '@nestjs/core';
import {
  extractTokenFromHeader,
  getRequest,
} from '../../../utils/helpers/auth.helper';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipJwt = this.reflector.get<boolean>(
      'SKIP_JWT_GUARD',
      context.getHandler(),
    );
    if (skipJwt) return true;
    const req = getRequest(context);
    const token = extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }

    try {
      const decodedToken = this.jwtService.decode(token);
      if (typeof decodedToken === 'object' && decodedToken?.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
          throw new UnauthorizedException('Token expired');
        }
      }
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.userService.findUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      req['user'] = user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
