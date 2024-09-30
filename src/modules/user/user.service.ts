import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User.entity';
import { UserRole } from '../../utils/enum/userRole.enum';
import { hashPassword } from '../../utils/helpers/hashPassword';
import { ImageType } from '../../utils/enum/imagePath.enum';
import { uploadImage } from '../../utils/helpers/uploadImage';
import { FileUpload } from 'graphql-upload';
import { comparePassword } from '../../utils/helpers/comparePassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      where: { role: UserRole.diagnostician },
    });
  }

  async findByUserName(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findByUserEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['projects'],
    });
  }

  async findUserImage(id: string): Promise<string | null> {
    const user = await this.findUserById(id);
    if (!user) {
      return null;
    }
    return user.image;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUsername = await this.findByUserName(createUserDto.username);
    const existingEmail = await this.findByUserEmail(createUserDto.email);

    if (existingUsername || existingEmail) {
      throw new ConflictException('Username or email already exist');
    }

    const hashedPassword = await hashPassword(createUserDto.password);

    const user = this.userRepository.create({
      ...createUserDto,
      role: UserRole.diagnostician,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, values: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, values);
    return await this.findUserById(id);
  }
  async updateDiagnostician(id: string, values: Partial<User>): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.update({ id }, values);
    return await this.findUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
  }

  async uploadImage(image: FileUpload, user: User): Promise<boolean> {
    try {
      const imagePath = await uploadImage(image, ImageType.profile);
      user.image = imagePath;
      console.log(imagePath);
      await this.userRepository.save(this.userRepository.create(user));
      return true;
    } catch (error) {
      return false;
    }
  }

  async compareOldPassword(id: string, oldPassword: string): Promise<boolean> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await comparePassword(oldPassword, user.password);
    return passwordMatch;
  }
  async addDeviceToken(id: string, deviceToken: string): Promise<User> {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.deviceToken = deviceToken;
    await this.userRepository.save(user);
    return user;
  }
}
