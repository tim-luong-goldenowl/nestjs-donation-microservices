import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import StripeConnectCustomerEntity from '../entities/stripe-connect-customer.entity';
import { Repository } from 'typeorm';
import { CreateConnectCustomerRequest, FindByUserAndDrRequest, FindByUserAndDrResponse, StripeConnectCustomer } from '@app/common/types/repositoryService';

@Injectable()
export class StripeConnectCustomersService {
  constructor(
    @InjectRepository(StripeConnectCustomerEntity)
    private stripeConnectCustomerRepository: Repository<StripeConnectCustomerEntity>,
  ) {}

  async findByUserAndDonationReceiver(
    request: FindByUserAndDrRequest
  ): Promise<FindByUserAndDrResponse> {
    const result = await this.stripeConnectCustomerRepository.findOne({
      where: {
        user: { uid: request.user.uid },
        donationReceiver: { uid: request.donationReceiver.uid },
      },
    });

    if(result) {
      return {
        found: true,
        stripeConnectCustomer: result
      }
    } else {
      return {
        found: false,
        stripeConnectCustomer: null
      }
    }
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
