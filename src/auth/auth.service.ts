import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from './dto/registration.dto';

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
}
