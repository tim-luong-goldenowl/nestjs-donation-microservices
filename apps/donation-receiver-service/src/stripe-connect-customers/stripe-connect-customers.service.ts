import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StripeConnectCustomersService {
    // constructor(
    //     @InjectRepository(StripeConnectCustomer)
    //     private stripeConnectCustomerRepository: Repository<StripeConnectCustomer>,
    // ) { }

    // async findByUserAndDonationReceiver(user: UserEntity, donationReceiver: DonationReceiver) {
    //     return await this.stripeConnectCustomerRepository.findOne({
    //         where: {
    //             user,
    //             donationReceiver
    //         }
    //     })
    // }

    // async create(user: User, donationReceiver: DonationReceiver, customerId: string) {
    //      const customer = this.stripeConnectCustomerRepository.create({
    //         user,
    //         donationReceiver,
    //         customerId
    //      })

    //      return await this.stripeConnectCustomerRepository.save(customer)
    // }
}
