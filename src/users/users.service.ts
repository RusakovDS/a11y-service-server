import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { roleEnum } from './enums/role.enum';
import { statusEnum } from './enums/status.enum';

import { CreateUserDto } from '../dto/create-user.dto';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDto, roles: Array<roleEnum>): Promise<User> {
    const candidate = new User();
    candidate.firstName = userData.firstName;
    candidate.lastName = userData.lastName;
    candidate.email = userData.email;
    candidate.roles = roles;
    candidate.status = statusEnum.active;
    candidate.password = await this.generateHash(userData.password);

    try {
      return await this.userRepository.save(candidate);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate email
        throw new ConflictException('email already exist');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ id });
  }

  async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }
}
