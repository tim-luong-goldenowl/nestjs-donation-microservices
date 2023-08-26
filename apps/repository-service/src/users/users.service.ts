import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import { CreateUserDto, User } from '@app/common/types/user';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
) { }

  async createUser(params: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(params);

    await this.userRepository.save(user);

    const userInstance = {
      ...user,
      dob: user.dob ? user.dob.toDateString() : ''
    }

    return userInstance
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({email})

    return this.userMapper(user)
  }

  async findById(uid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({uid})

    return this.userMapper(user)
  }

  private userMapper(user: UserEntity): User {
    const userInstance = {
      ...user,
      dob: user.dob ? user.dob.toDateString() : ''
    }

    return userInstance
  }
}
