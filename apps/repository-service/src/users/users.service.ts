import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import { CreateUserDto, UpdateUserProfileRequest, User } from '@app/common/types/user';
import { UpdateUserStripeCustomerIdRequest } from '@app/common/types/repositoryService';

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
      dob: user.dob ? user.dob.toString() : ''
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

  async updateProfile(params: UpdateUserProfileRequest): Promise<User> {
    console.log("@@@@@@@@@@@@@@@params", params)

    const user = await this.userRepository.save({
        uid: params.uid,
        ...params
    })

    return this.userMapper(user)
  }

  async updateStripeCustomerId(request: UpdateUserStripeCustomerIdRequest): Promise<User> {
    const user = await this.userRepository.save({
      uid: request.uid,
      ...request
    })

    return this.userMapper(user)
  }


  private userMapper(user: UserEntity): User {
    const userInstance = {
      ...user,
      dob: user.dob ? user.dob.toString() : ''
    }

    return userInstance
  }
}
