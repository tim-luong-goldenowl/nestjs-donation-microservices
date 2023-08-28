import { DONATION_RECEIVER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import {
  CreateDonationRequest,
  CreateDonationResponse,
  GetDonationCountByDrIdRequest,
  GetDonationCountByDrIdResponse,
} from '@app/common/types/donation';
import {
  DONATIONS_SERVICE_NAME,
  DonationsServiceClient,
} from '@app/common/types/donationReceiverService';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DonationService implements OnModuleInit {
  private donationService: DonationsServiceClient;

  constructor(
    @Inject(DONATION_RECEIVER_SERVICE_CLIENT_NAME) private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.donationService = this.client.getService<DonationsServiceClient>(
      DONATIONS_SERVICE_NAME,
    );
  }

  async createDonation(
    request: CreateDonationRequest,
  ): Promise<CreateDonationResponse> {
    return await lastValueFrom(this.donationService.createDonation(request));
  }

  async getDonationCount(
    request: GetDonationCountByDrIdRequest,
  ): Promise<GetDonationCountByDrIdResponse> {
    return await lastValueFrom(
      this.donationService.getDonationCountByDrId(request),
    );
  }
}
