import { Controller } from '@nestjs/common';
import { DonationReceiverServiceService } from './donation-receiver-service.service';
import { DonationReceiversServiceController, DonationReceiversServiceControllerMethods } from '@app/common/types/donationReceiverService';
import { CompleteOnboardingRequest, CompleteOnboardingResponse, CreateDonationReceiverRequest, DonationReceiver, UpdateProfileRequest, VerifyRequest, VerifyResponse } from '@app/common/types/donationReceiver';
import { Observable } from 'rxjs';

@Controller()
@DonationReceiversServiceControllerMethods()
export class DonationReceiverServiceController implements DonationReceiversServiceController {
  constructor(private readonly donationReceiverServiceService: DonationReceiverServiceService) { }

  completeOnboarding(request: CompleteOnboardingRequest): CompleteOnboardingResponse | Observable<CompleteOnboardingResponse> | Promise<CompleteOnboardingResponse> {
    return this.donationReceiverServiceService.completeOnboarding(request)
  }

  create(request: CreateDonationReceiverRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
    return this.donationReceiverServiceService.create(request)
  }

  updateProfile(request: UpdateProfileRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
    return this.donationReceiverServiceService.updateProfile(request)
  }

  verify(request: VerifyRequest): VerifyResponse | Promise<VerifyResponse> | Observable<VerifyResponse> {
    return this.donationReceiverServiceService.verify(request)
  }
}
