import {
  CONNECT_CUSTOMER_REPOSITORY_SERVICE_NAME,
  DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME,
  DONATION_REPOSITORY_SERVICE_NAME,
  REPOSITORY_SERVICE_CLIENT_NAME,
  USERS_REPOSITORY_SERVICE_NAME,
} from '@app/common/constants';
import { DonationReceiverRepositoryServiceClient, DonationRepositoryServiceClient, StripeConnectCustomerRepositoryServiceClient, UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { StripeCustomerService } from './stripe/services/customers/customer.service';
import { lastValueFrom } from 'rxjs';
import { PaymentIntentService } from './stripe/services/payments/payment-intent.service';
import { CreateDonationRequest, CreateDonationResponse, GetDonationCountByDrIdRequest, GetDonationCountByDrIdResponse } from '@app/common/types/donation';

@Injectable()
export class DonationService implements OnModuleInit {
  private userRepositoryService: UserRepositoryServiceClient
  private donationReceiverRepositoryService: DonationReceiverRepositoryServiceClient
  private connectCustomerRepositoryService: StripeConnectCustomerRepositoryServiceClient
  private donationRepositoryService: DonationRepositoryServiceClient

  constructor(
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc,
    private stripeCustomerService: StripeCustomerService,
    private paymentIntentService: PaymentIntentService,
  ) {}

  onModuleInit() {
    this.donationReceiverRepositoryService =
      this.client.getService<DonationReceiverRepositoryServiceClient>(
        DONATION_RECEIVERS_REPOSITORY_SERVICE_NAME,
      );

    this.userRepositoryService =
      this.client.getService<UserRepositoryServiceClient>(USERS_REPOSITORY_SERVICE_NAME)

    this.connectCustomerRepositoryService =
      this.client.getService<StripeConnectCustomerRepositoryServiceClient>(CONNECT_CUSTOMER_REPOSITORY_SERVICE_NAME)

    this.donationRepositoryService =
      this.client.getService<DonationRepositoryServiceClient>(DONATION_REPOSITORY_SERVICE_NAME)
  }

  async getDonationCount(request: GetDonationCountByDrIdRequest): Promise<GetDonationCountByDrIdResponse> {
    return await lastValueFrom(this.donationRepositoryService.getDonationCountByDrId(request))
  }

  async createDonation(request: CreateDonationRequest): Promise<CreateDonationResponse> {
    const donateUser = request.user

    let stripeCustomerId = donateUser.stripeCustomerId

    if (!stripeCustomerId) {
      const newCustomerId = await this.stripeCustomerService.createCustomer(
        donateUser,
      );

      stripeCustomerId = newCustomerId;
      await lastValueFrom(this.userRepositoryService.updateUserStripeCustomerId({ uid: donateUser.uid, stripeCustomerId }))
    }

    const donationReceiverFindResult = await lastValueFrom(this.donationReceiverRepositoryService.findOneByUid({uid: request.donationReceiverUid}))
    const donationReceiver = donationReceiverFindResult.donationReceiver

    const stripeConnectCustomerFindResult = await lastValueFrom(this.connectCustomerRepositoryService.findByUserAndDr({user: donateUser, donationReceiver}))
    
    let stripeConnectCustomer = undefined

    if (!stripeConnectCustomerFindResult.found) {
      const customerForConnectedAccount =
        await this.stripeCustomerService.cloneCustomerForConnectedAccount(
          stripeCustomerId,
          donationReceiver.stripeConnectedAccountId,
        )

      stripeConnectCustomer = await lastValueFrom(this.connectCustomerRepositoryService.create({
        user: donateUser,
        donationReceiver,
        customerId: customerForConnectedAccount.id
      }))
      
    } else {
      stripeConnectCustomer = stripeConnectCustomerFindResult.stripeConnectCustomer
    }

    await this.paymentIntentService.createPaymentIntent(
      request.value,
      stripeConnectCustomer.customerId,
      donationReceiver.stripeConnectedAccountId,
    )

    const donationCreateResult = await lastValueFrom(this.donationRepositoryService.createDonation({
      donationReceiverUid: donationReceiver.uid,
      message: request.message,
      user: donateUser,
      value: request.value
    }))

    if(donationCreateResult.success) {
      return {
        success: true,
        donation: donationCreateResult.donation
      }
    } else {
      return {
        success: false,
        donation: null
      }
    }
  }
}
