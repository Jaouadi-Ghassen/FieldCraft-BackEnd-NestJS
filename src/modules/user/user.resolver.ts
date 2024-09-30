import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '../../entities/User.entity';
import { Roles } from '../../common/decorator/roles.decorator';
import { UserRole } from '../../utils/enum/userRole.enum';
import { ConflictException, UsePipes } from '@nestjs/common';
import { YupValidationPipe } from '../../utils/pipes/yupValidationPipe';
import {
  CreateUserValidation,
  UpdatePasswordValidation,
  UpdateUserValidation,
} from '../../utils/validation/userValidation';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CurrentUser } from '../../common/decorator/user.decorator';
import { hashPassword } from '../../utils/helpers/hashPassword';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UpdateUserPasswordDto } from './dto/update-Password.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  async userId(@Args('userId') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Query(() => User)
  async CurrentuserId(@CurrentUser() user: User): Promise<User> {
    return this.userService.findUserById(user.id);
  }

  @Query(() => String, { nullable: true })
  async userImage(@CurrentUser() user: User): Promise<string | null> {
    return await this.userService.findUserImage(user.id);
  }

  @Mutation(() => User)
  @Roles(UserRole.admin)
  @UsePipes(new YupValidationPipe(CreateUserValidation))
  create_user(@Args('values') values: CreateUserDto): Promise<User> {
    return this.userService.createUser(values);
  }

  @Mutation(() => User)
  async addDeviceToken(
    @Args('deviceToken') deviceToken: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    console.log('user id', user.id, 'device token', deviceToken);
    return this.userService.addDeviceToken(user.id, deviceToken);
  }

  @Mutation(() => User)
  async updatePassword(
    @Args('values', new YupValidationPipe(UpdatePasswordValidation))
    values: UpdateUserPasswordDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    const { oldPassword, password } = values;

    const OldPasswordValid = await this.userService.compareOldPassword(
      user.id,
      oldPassword,
    );
    if (!OldPasswordValid) {
      throw new ConflictException('Old password is incorrect');
    }

    const hashedPassword = await hashPassword(password);
    return this.userService.updateUser(user.id, { password: hashedPassword });
  }

  @Mutation(() => User)
  async update_user(
    @Args('values', new YupValidationPipe(UpdateUserValidation))
    values: UpdateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    console.log(user);
    return this.userService.updateUser(user.id, values);
  }

  @Mutation(() => User)
  async update_diagnostician(
    @Args('id') id: string,
    @Args('values', new YupValidationPipe(UpdateUserValidation))
    values: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateDiagnostician(id, values);
  }

  @Mutation(() => User)
  @Roles(UserRole.admin)
  async deleteUser(@Args('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => Boolean)
  async uploadUserImage(
    @Args('values', { type: () => GraphQLUpload }) image: FileUpload,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.userService.uploadImage(image, user);
  }
}
