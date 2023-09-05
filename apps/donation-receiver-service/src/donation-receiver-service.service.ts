import { DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME, REPOSITORY_SERVICE_CLIENT_NAME, SEND_MAIL_QUEUE_NAME, SEND_ONBOARDING_LINK_JOB_NAME } from '@app/common/constants';
import { CompleteOnboardingRequest, CompleteOnboardingResponse, CreateDonationReceiverRequest, DonationReceiver, UpdateProfileRequest, VerifyRequest, VerifyResponse } from '@app/common/types/donationReceiver';
import { DonationReceiverRepositoryServiceClient } from '@app/common/types/repositoryService';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { S3Service } from './s3/s3.service';
import { randomBytes } from 'crypto';
import { CreateConnectedAccountResponse } from './stripe/types';
import { StripeConnectService } from './stripe/services/stripe-connect/stripe-connect.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class DonationReceiverServiceService implements OnModuleInit {
  private donationRepositoryService: DonationReceiverRepositoryServiceClient;

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc,
    private s3Service: S3Service,
    private stripeConnectService: StripeConnectService,
    @InjectQueue(SEND_MAIL_QUEUE_NAME) private sendMailQueue: Queue
  ) { }

  onModuleInit() {
    this.donationRepositoryService =
      this.client.getService<DonationReceiverRepositoryServiceClient>(DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME);
  }

  async create(request: CreateDonationReceiverRequest): Promise<DonationReceiver> {
    const findOneResult = await lastValueFrom(this.donationRepositoryService.findOneByUser(request))

    if (findOneResult.found) {
      return findOneResult.donationReceiver
    }

    const donationReceiver = await lastValueFrom(this.donationRepositoryService.create(request))

    return donationReceiver
  }

  async updateProfile(request: UpdateProfileRequest): Promise<DonationReceiver> {
    const findOneResult = await lastValueFrom(this.donationRepositoryService.findOneByUid({ uid: request.uid }))

    const donationReceiver = findOneResult.donationReceiver

    const avatar = request.avatar

    if (avatar) {
      const oldAvatarUrl = donationReceiver.avatarUrl;

      if (oldAvatarUrl) {
        const oldAvatarFileName = oldAvatarUrl.split('/')[3]
        const uploadedFileUrl = await this.s3Service.replaceObject(avatar, oldAvatarFileName)
        request.avatarUrl = uploadedFileUrl
      } else {
        const uploadedFileUrl = await this.s3Service.createObject(avatar)
        request.avatarUrl = uploadedFileUrl
      }
    }

    return await lastValueFrom(this.donationRepositoryService.updateProfile(request))
  }

  async verify(request: VerifyRequest): Promise<VerifyResponse> {
    const findOneResult = await lastValueFrom(this.donationRepositoryService.findOneNotVerified({ uid: request.donationReceiverUid }))

    const donationReceiver = findOneResult.donationReceiver

    const onboardingCompleteToken = randomBytes(20).toString('hex')
    const returnUrl = `http://localhost:8080/users/completed-dr-registration/${onboardingCompleteToken}`

    const connectedAccountResult: CreateConnectedAccountResponse = await this.stripeConnectService.createConnectedAccount(donationReceiver, { returnUrl })

    if (connectedAccountResult.success) {
      const onboardingLink = connectedAccountResult.onboardingLink

      await lastValueFrom(this.donationRepositoryService.updateConnectedAccountInfor({
        onboardingCompleteToken: onboardingCompleteToken,
        stripeConnectedAccountId: connectedAccountResult.connectedAccountId,
        uid: donationReceiver.uid
      }))

      this.sendMailQueue.add(SEND_ONBOARDING_LINK_JOB_NAME, { donationReceiver, onboardingLink })

      return {
        onboardingLink
      };
    } else {
      return {
        onboardingLink: null
      }
    }
  }

  async completeOnboarding(request: CompleteOnboardingRequest): Promise<CompleteOnboardingResponse> {
    const findOneResult = await lastValueFrom(this.donationRepositoryService.findOneByOnboardingToken({ token: request.token }))

    const donationReceiver = findOneResult.donationReceiver

    if (donationReceiver) {
      await lastValueFrom(this.donationRepositoryService.updateVerifyInfor({ verified: true, onboardingCompleteToken: '', uid: donationReceiver.uid }))
      return {
        success: true
      }
    }

    return {
      success: false
    }
  }
}
