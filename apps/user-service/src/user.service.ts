import { DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME, REPOSITORY_SERVICE_CLIENT_NAME, USERS_REPOSITORY_SERVICE_NAME } from '@app/common/constants';
import { DonationReceiverRepositoryServiceClient, UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { GetUserProfilesRequest, GetUserProfilesResponse, UpdateUserProfileRequest, User } from '@app/common/types/user';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { S3Service } from './s3/s3.service';

@Injectable()
export class UserService implements OnModuleInit {
  private userRepositoryService: UserRepositoryServiceClient
  private donationRepositoryService: DonationReceiverRepositoryServiceClient

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc,
    private s3Service: S3Service
  ) { }


  onModuleInit() {
    this.userRepositoryService =
      this.client.getService<UserRepositoryServiceClient>(USERS_REPOSITORY_SERVICE_NAME);

    this.donationRepositoryService =
      this.client.getService<DonationReceiverRepositoryServiceClient>(DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME);
  }

  async getProfiles(request: GetUserProfilesRequest): Promise<GetUserProfilesResponse> {
    const user = await lastValueFrom(this.userRepositoryService.findOneById({ uid: request.uid }))

    const donationReceiverFindResult = await lastValueFrom(this.donationRepositoryService.findOneByUser({ uid: request.uid }))

    if (donationReceiverFindResult.found) {
      return {
        userProfile: user,
        donationReceiverProfile: donationReceiverFindResult.donationReceiver
      }
    } else {
      return {
        userProfile: user,
        donationReceiverProfile: null
      }
    }
  }

  async updateUserProfile(request: UpdateUserProfileRequest): Promise<User> {
    const user = await lastValueFrom(this.userRepositoryService.findOneById({uid: request.uid}))
    
    const oldAvatarUrl = user.avatarUrl
    const newAvatar = request.avatar

    if (newAvatar) {
      if (oldAvatarUrl) {
        const oldAvatarFileName = oldAvatarUrl[oldAvatarUrl.length - 1]
        const uploadFileUrl = await this.s3Service.replaceObject(newAvatar, oldAvatarFileName)
        request.avatarUrl = uploadFileUrl
      } else {
        const uploadFileUrl = await this.s3Service.createObject(newAvatar)
        request.avatarUrl = uploadFileUrl
      }
    }

    return await lastValueFrom(this.userRepositoryService.updateUserProfile(request))
  }
}
