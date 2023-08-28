import { User } from '@app/common/types';
import { DonationReceiver } from '@app/common/types/donationReceiver';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StripeConnectCustomerEntity from '../entities/stripe-connect-customer.entity';
import { Repository } from 'typeorm';
import { CreateConnectCustomerRequest, StripeConnectCustomer } from '@app/common/types/repositoryService';

@Injectable()
export class StripeConnectCustomersService {
  constructor(
    @InjectRepository(StripeConnectCustomerEntity)
    private stripeConnectCustomerRepository: Repository<StripeConnectCustomerEntity>,
  ) {}

  async findByUserAndDonationReceiver(
    user: User,
    donationReceiver: DonationReceiver,
  ) {
    return await this.stripeConnectCustomerRepository.findOne({
      where: {
        user: { uid: user.uid },
        donationReceiver: { uid: donationReceiver.uid },
      },
    });
  }

  async create(request: CreateConnectCustomerRequest): Promise<StripeConnectCustomer> {
    const customer = this.stripeConnectCustomerRepository.create({
      user: request.user,
      donationReceiver: request.donationReceiver,
      customerId: request.customerId,
    });

    return await this.stripeConnectCustomerRepository.save(customer);
  }
}
