import {
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { UserRegistrationParamsDto } from '../auth/dtos/user-registration-params.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from '@app/common/types/user';
import { UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME, USERS_REPOSITORY_SERVICE_NAME } from '@app/common/constants';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UserRepositoryServiceClient;

  constructor(@Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UserRepositoryServiceClient>(USERS_REPOSITORY_SERVICE_NAME);
  }

  async createUser(params: UserRegistrationParamsDto): Promise<User> {
    const user = await lastValueFrom(this.usersService.createUser(params));

    return user;
  }

  async findOneById(uid: string): Promise<User> {
    const user = await lastValueFrom(this.usersService.findOneById({ uid }));

    return user;
  }

  // async getProfiles(id: number): Promise<any> {
  //     const user: User = await this.userRepository.findOne({
  //         where: {
  //             id
  //         }
  //     });

  //     const userInstance = plainToInstance(User, user, {})

  //     const donationReceiver = await this.donationReceiverRepository.findOne({
  //         where: {
  //             user: user
  //         }
  //     });

  //     const donationReceiverInstance = plainToInstance(DonationReceiver, donationReceiver, {})

  //     return {
  //         user: userInstance,
  //         donationReceiver: donationReceiverInstance
  //     }
  // }

  // async updateUser(params: any, avatar: Express.Multer.File): Promise<User> {
  //     try {
  //         const tParams: User = {
  //             ...params,
  //             dob: new Date(params.dob)
  //         }

  //         delete tParams['id']
  //         const user = await this.userRepository.findOne({
  //             where: {
  //                 id: parseInt(params.id)
  //             }
  //         });

  //         const oldAvatarUrl = user.avatarUrl;

  //         if (avatar) {
  //             if (oldAvatarUrl) {
  //                 const oldAvatarFileName = oldAvatarUrl[oldAvatarUrl.length - 1]
  //                 const uploadFileUrl = await this.s3Service.replaceObject(avatar, oldAvatarFileName)
  //                 tParams.avatarUrl = uploadFileUrl
  //             } else {
  //                 const uploadFileUrl = await this.s3Service.createObject(avatar)
  //                 tParams.avatarUrl = uploadFileUrl
  //             }
  //         }

  //         return await this.userRepository.save({
  //             id: user.id,
  //             ...tParams
  //         });

  //     } catch (error) {
  //         console.log("eee", error)
  //         throw new BadRequestException
  //     }
  // }
}
