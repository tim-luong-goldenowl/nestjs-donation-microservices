import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CompleteOnboardingRequest, CompleteOnboardingResponse, DonationReceiver, DonationReceivers, FileObject, FindAllVerifiedRequest, FindOneByUidRequest, UpdateProfileRequest, VerifyRequest, VerifyResponse } from '@app/common/types/donationReceiver';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { DONATION_RECEIVER_REPOSITORY_SERVICE_NAME, DonationReceiverRepositoryServiceClient } from '@app/common/types/repositoryService';
import { DONATION_RECEIVER_SERVICE_CLIENT_NAME, DONATION_RECEIVER_SERVICE_NAME, REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { DONATIONS_SERVICE_NAME, DonationReceiversServiceClient, DonationsServiceClient } from '@app/common/types/donationReceiverService';
import { DonationReceiverRegistrationDto } from './dtos/donation-receiver-registration.dto';
import { GetDonationCountByDrIdRequest, GetDonationCountByDrIdResponse } from '@app/common/types/donation';

@Injectable()
export class DonationReceiversService implements OnModuleInit {
  private donationReceiverRepositoryService: DonationReceiverRepositoryServiceClient;
  private donationReceiverService: DonationReceiversServiceClient;
  private donationService: DonationsServiceClient;

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private repositoryClient: ClientGrpc,
    @Inject(DONATION_RECEIVER_SERVICE_CLIENT_NAME) private serviceClient: ClientGrpc,

  ) { }

  onModuleInit() {
    this.donationReceiverRepositoryService =
      this.repositoryClient.getService<DonationReceiverRepositoryServiceClient>(
        DONATION_RECEIVER_REPOSITORY_SERVICE_NAME,
      );

    this.donationReceiverService =
      this.serviceClient.getService<DonationReceiversServiceClient>(
        DONATION_RECEIVER_SERVICE_NAME,
      );

    this.donationService =
      this.serviceClient.getService<DonationsServiceClient>(
        DONATIONS_SERVICE_NAME,
      );
  }

  async getVerifiedDonationReceivers(params: FindAllVerifiedRequest): Promise<DonationReceivers> {
    return await lastValueFrom(this.donationReceiverRepositoryService.findAllVerified({ currentUserUid: params.currentUserUid }))
  }

  async create(uid: string): Promise<DonationReceiver> {
    return await lastValueFrom(this.donationReceiverService.create({uid}))
  }

  async updateProfile(request: DonationReceiverRegistrationDto, avatar: Express.Multer.File): Promise<DonationReceiver> {
    return await lastValueFrom(this.donationReceiverService.updateProfile({...request, avatar: avatar}))
  }

  async verify(uid: string): Promise<VerifyResponse> {
    return await lastValueFrom(this.donationReceiverService.verify({donationReceiverUid: uid}))
  }

  async completeOnboarding(request: CompleteOnboardingRequest): Promise<CompleteOnboardingResponse> {
    return await lastValueFrom(this.donationReceiverService.completeOnboarding(request))
  }

  async getByUid(request: FindOneByUidRequest): Promise<DonationReceiver> {
    const findResult = await lastValueFrom(this.donationReceiverRepositoryService.findOneByUid(request))

    return findResult.donationReceiver
  }

  async getDonationCount(req: GetDonationCountByDrIdRequest): Promise<GetDonationCountByDrIdResponse> {
    return await lastValueFrom(this.donationService.getDonationCountByDrId(req))
  }
}
