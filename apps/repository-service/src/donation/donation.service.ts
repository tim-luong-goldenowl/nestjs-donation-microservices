import {
  DONATION_REPOSITORY_SERVICE_NAME,
  REPOSITORY_SERVICE_CLIENT_NAME,
} from '@app/common/constants';
import {
  DonationRepositoryServiceClient,
  GetDonationCountByDrIdResponse,
} from '@app/common/types/repositoryService';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DonationService implements OnModuleInit {
  private donationRepositoryService: DonationRepositoryServiceClient;

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME)
    private repositoryClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.donationRepositoryService =
      this.repositoryClient.getService<DonationRepositoryServiceClient>(
        DONATION_REPOSITORY_SERVICE_NAME,
      );
  }

  async getDonationCount(
    donationReceiverUid: string,
  ): Promise<GetDonationCountByDrIdResponse> {
    return await lastValueFrom(
      this.donationRepositoryService.getDonationCountByDrId({
        donationReceiverUid,
      }),
    );
  }
}
