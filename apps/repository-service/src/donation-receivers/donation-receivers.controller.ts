import { DonationReceiversService } from './donation-receivers.service';
import {
    CreateDonationReceiverRequest,
    DonationReceiver,
    DonationReceivers,
    FindAllVerifiedRequest,
    FindOneByOnboardingTokenRequest,
    FindOneByUidRequest,
    FindOneByUserRequest,
    FindOneDrResponse,
    UpdateConnectedAccountInforRequest,
    UpdateProfileRequest,
    UpdateVerifyInforRequest,
} from '@app/common/types/donationReceiver';
import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import {
    DonationReceiverRepositoryServiceController,
    DonationReceiverRepositoryServiceControllerMethods,
} from '@app/common/types/repositoryService';

@Controller()
@DonationReceiverRepositoryServiceControllerMethods()
export class DonationReceiversController
    implements DonationReceiverRepositoryServiceController {
    constructor(private donationReceiversService: DonationReceiversService) { }

    findAllVerified(request: FindAllVerifiedRequest): DonationReceivers | Promise<DonationReceivers> | Observable<DonationReceivers> {
        return this.donationReceiversService.findAllVerified(
            request.currentUserUid,
        );
    }

    create(request: CreateDonationReceiverRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.create(request);
    }

    findOneByUser(request: FindOneByUserRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneByUser(request.uid);

    }

    findOneByUid(request: FindOneByUidRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneByUid(request.uid);
    }

    updateProfile(request: UpdateProfileRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.updateProfile(request);
    }

    findOneNotVerified(request: FindOneByUidRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneNotVerified(request.uid);
    }

    updateConnectedAccountInfor(request: UpdateConnectedAccountInforRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.updateConnectedAccountInfor(request);
    }

    findOneByOnboardingToken(request: FindOneByOnboardingTokenRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneByOnboardingTokken(request.token);
    }

    updateVerifyInfor(request: UpdateVerifyInforRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.updateVerifyInfor(request);
    }
}
