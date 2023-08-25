import { Injectable } from '@nestjs/common';
import DonationReceiverEntity from '../entities/donation-receiver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DonationReceiver, User } from '@app/common';

@Injectable()
export class DonationReceiversService {
    constructor(
        @InjectRepository(DonationReceiverEntity)
        private donationReceiverRepository: Repository<DonationReceiverEntity>,
    ) { }

    async findOneByUser(user: User): Promise<DonationReceiver> {
        const donationReceiver = await this.donationReceiverRepository.findOneBy({
            userId: user.id
        })

        return donationReceiver
    }
}