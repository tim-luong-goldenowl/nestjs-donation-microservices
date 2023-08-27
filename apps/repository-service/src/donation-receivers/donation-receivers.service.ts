import { Injectable } from '@nestjs/common';
import DonationReceiverEntity from '../entities/donation-receiver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateDonationReceiverRequest, DonationReceiver, DonationReceivers, FindOneDrResponse, UpdateConnectedAccountInforRequest, UpdateProfileRequest, UpdateVerifyInforRequest } from '@app/common/types/donationReceiver';
import { User } from '@app/common/types/user';

@Injectable()
export class DonationReceiversService {
    constructor(
        @InjectRepository(DonationReceiverEntity)
        private donationReceiverRepository: Repository<DonationReceiverEntity>,
    ) { }

    async findOneByUser(userUid: string): Promise<FindOneDrResponse> {
        const donationReceiver = await this.donationReceiverRepository.findOne({
            where: {
                user: { uid: userUid }
            }
        })

        if (donationReceiver) {
            return {
                found: true,
                donationReceiver
            }

        } else {
            return {
                found: false,
                donationReceiver: null
            }
        }
    }

    async findOneByUid(uid: string): Promise<FindOneDrResponse> {
        const donationReceiver = await this.donationReceiverRepository.findOne({
            where: {
                uid
            }
        })

        if (donationReceiver) {
            return {
                found: true,
                donationReceiver
            }

        } else {
            return {
                found: false,
                donationReceiver: null
            }
        }
    }

    async findOneNotVerified(uid: string): Promise<FindOneDrResponse> {
        const donationReceiver = await this.donationReceiverRepository.findOne({
            where: {
                uid,
                verified: false
            }
        })

        if (donationReceiver) {
            return {
                found: true,
                donationReceiver
            }

        } else {
            return {
                found: false,
                donationReceiver: null
            }
        }
    }

    async findOneByOnboardingTokken(token: string): Promise<FindOneDrResponse> {
        const donationReceiver = await this.donationReceiverRepository.findOne({
            where: {
                onboardingCompleteToken: token
            }
        })

        if (donationReceiver) {
            return {
                found: true,
                donationReceiver
            }

        } else {
            return {
                found: false,
                donationReceiver: null
            }
        }
    }

    async findAllVerified(currentUserUid: string): Promise<DonationReceivers> {
        const result = await this.donationReceiverRepository.find({
            where: {
                verified: true,
                user: Not(currentUserUid)
            }
        })

        return {
            donationReceivers: result
        }
    }

    async create(params: CreateDonationReceiverRequest): Promise<DonationReceiver> {
        const donationReceiver = this.donationReceiverRepository.create({
            user: { uid: params.uid }
        })

        return await this.donationReceiverRepository.save(donationReceiver)
    }

    async updateProfile(params: UpdateProfileRequest): Promise<DonationReceiver> {
        return await this.donationReceiverRepository.save({
            uid: params.uid,
            ...params
        })
    }

    async updateConnectedAccountInfor(params: UpdateConnectedAccountInforRequest): Promise<DonationReceiver> {
        return await this.donationReceiverRepository.save({
            uid: params.uid,
            ...params
        })
    }

    async updateVerifyInfor(params: UpdateVerifyInforRequest): Promise<DonationReceiver> {
        return await this.donationReceiverRepository.save({
            uid: params.uid,
            ...params
        })
    }
}