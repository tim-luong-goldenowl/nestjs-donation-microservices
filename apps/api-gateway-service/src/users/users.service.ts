import {
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { UserRegistrationParamsDto } from '../auth/dtos/user-registration-params.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { GetUserProfilesResponse, UpdateUserProfileRequest, User } from '@app/common/types/user';
import { UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME, USERS_REPOSITORY_SERVICE_NAME, USER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common/types/userService';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  private userRepositoryService: UserRepositoryServiceClient;
  private userService: UsersServiceClient;

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc,
    @Inject(USER_SERVICE_CLIENT_NAME) private userServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userRepositoryService =
      this.client.getService<UserRepositoryServiceClient>(USERS_REPOSITORY_SERVICE_NAME);

    this.userService =
      this.userServiceClient.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async createUser(params: UserRegistrationParamsDto): Promise<User> {
    const user = await lastValueFrom(this.userRepositoryService.createUser(params));

    return user;
  }

  async findOneById(uid: string): Promise<User> {
    const user = await lastValueFrom(this.userRepositoryService.findOneById({ uid }));

    return user;
  }

  async getProfiles(uid: string): Promise<GetUserProfilesResponse> {
      return await lastValueFrom(this.userService.getProfiles({uid}))
  }

  async updateUser(params: UpdateUserProfileDto, avatar: Express.Multer.File): Promise<User> {
    console.log("@@@@params", params)
    return await lastValueFrom(this.userService.updateUserProfile({...params, avatar: avatar}))
  }
}
