import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SigninDto, SignInResult } from './dto/signIn.dto';
import { comparePassword } from '../../utils/helpers/comparePassword';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto): Promise<SignInResult> {
    const { username, password } = signinDto;
    const user = await this.userService.findByUserName(username);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('No accounnt found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
      image: user.image,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUserName(username);
    if (user) {
      comparePassword(password, user.password);
      if (comparePassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
