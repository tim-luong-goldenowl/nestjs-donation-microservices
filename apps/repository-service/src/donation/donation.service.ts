import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DonationEntity from '../entities/donation.entity';
import { Repository } from 'typeorm';
import { CreateDonationRequest, CreateDonationResponse, GetDonationCountByDrIdRequest, GetDonationCountByDrIdResponse } from '@app/common/types/donation';

@Injectable()
export class DonationService {
  constructor(
    @InjectRepository(DonationEntity)
    private donationRepository: Repository<DonationEntity>,
  ) {}

  async getDonationCount(
    request: GetDonationCountByDrIdRequest,
  ): Promise<GetDonationCountByDrIdResponse> {
    const result = await this.donationRepository
      .createQueryBuilder('donations')
      .where('donations.donationReceiverUid = :donationReceiverUid', {
        donationReceiverUid: request.donationReceiverUid,
      })
      .getCount();
    return {
      count: result,
    };
  }

  async createDonation(
    request: CreateDonationRequest,
  ): Promise<CreateDonationResponse> {
    try {
      const donation = this.donationRepository.create({
        ...request,
        donationReceiver: { uid: request.donationReceiverUid }
      });
      await this.donationRepository.save(donation);

      return {
        success: true,
        donation,
      };
    } catch (error) {
      return {
        success: false,
        donation: null,
      };
    }
  }
}
