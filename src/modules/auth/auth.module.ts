import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './auth.resolver';
import { RolesGuard } from './guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '15 s' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
