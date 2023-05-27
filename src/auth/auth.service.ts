import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async register(registrationDto: RegistrationDto) {
    const user = await this.usersRepository.findOne({
      where: { username: registrationDto.username },
    });

    if (user) {
      throw new HttpException(
        'Username already exists, please choose another one',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = this.usersRepository.create(registrationDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      return false;
    }

    const isPasswordValid = this.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return false;
    }

    return true;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const validated = await this.validateUser(username, password);
    if (!validated) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.generateBasicAuthHeader(username, password);
  }

  private comparePassword(providedPassword: string, passwordInDb: string) {
    return providedPassword === passwordInDb;
  }

  private generateBasicAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
  }
}
