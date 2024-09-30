import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninDto, SignInResult } from './dto/signIn.dto';
import { SkipJwtGuard } from '../../common/decorator/skip_jwt.decorator';
import { UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import { AuthValidation } from '../../utils/validation/authValidation';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @SkipJwtGuard()
  @Mutation(() => SignInResult)
  @UsePipes(new YupValidationPipe(AuthValidation))
  signin(@Args('values') values: SigninDto) {
    return this.authService.signIn(values);
  }
}
