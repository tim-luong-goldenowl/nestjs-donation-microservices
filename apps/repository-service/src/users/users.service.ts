import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, User } from '@app/common';
import UserEntity from '../entities/user.entity';

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

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({id})

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
