import {
  DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME,
  REPOSITORY_SERVICE_CLIENT_NAME,
  USERS_REPOSITORY_SERVICE_NAME,
} from '@app/common/constants';
import { DonationReceiverRepositoryServiceClient, UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateDonationRequest,
  Donation,
} from '@app/common/types/donationReceiverService';
import { StripeCustomerService } from './stripe/services/customers/customer.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DonationReceiverServiceService implements OnModuleInit {
  private userRepositoryService: UserRepositoryServiceClient
  private donationRepositoryService: DonationReceiverRepositoryServiceClient;

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc,
    private stripeCustomerService: StripeCustomerService,
  ) {}

  onModuleInit() {
    this.donationRepositoryService =
      this.client.getService<DonationReceiverRepositoryServiceClient>(
        DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME,
      );

    this.userRepositoryService =
      this.client.getService<UserRepositoryServiceClient>(USERS_REPOSITORY_SERVICE_NAME);
  }

  async createDonation(request: CreateDonationRequest): Promise<Donation> {
    const donateUser = request.user

    let stripeCustomerId = donateUser.stripeCustomerId

    if (!stripeCustomerId) {
      const newCustomerId = await this.stripeCustomerService.createCustomer(
        donateUser,
      );

      stripeCustomerId = newCustomerId;
      await lastValueFrom(this.userRepositoryService.updateUserStripeCustomerId({ uid: donateUser.uid, stripeCustomerId }))
    }

    const donationReceiver = await lastValueFrom(this.donationRepositoryService.findOneByUid({uid: request.donationReceiverUid}))

    let stripeConnectCustomer =
      await this.stripeConnectCustomersService.findByUserAndDonationReceiver(
        donateUser,
        donationReceiver,
      );

    if (!stripeConnectCustomer) {
      const customerForConnectedAccount =
        await this.stripeCustomerService.cloneCustomerForConnectedAccount(
          stripeCustomerId,
          donationReceiver.stripeConnectedAccountId,
        );
      stripeConnectCustomer = await this.stripeConnectCustomersService.create(
        donateUser,
        donationReceiver,
        customerForConnectedAccount.id,
      );
      await this.donationReceiverRepository.save(donationReceiver);
    }

    const intentRes = await this.paymentIntentService.createPaymentIntent(
      params.value,
      stripeConnectCustomer.customerId,
      donationReceiver.stripeConnectedAccountId,
    );

    if (!intentRes) {
      throw new BadRequestException('Cannot create Payment');
    }

    const donation = this.donationRepository.create({
      ...params,
      user: donateUser,
      donationReceiver,
    });
    await this.donationRepository.save(donation);

    return donation;
  }
}
