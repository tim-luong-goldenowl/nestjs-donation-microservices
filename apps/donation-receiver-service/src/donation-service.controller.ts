import { Controller } from '@nestjs/common';
import { DonationReceiverServiceService } from './donation-receiver-service.service';
import { CreateDonationRequest, Donation, DonationReceiversServiceController, DonationReceiversServiceControllerMethods, DonationsServiceController, DonationsServiceControllerMethods } from '@app/common/types/donationReceiverService';
import { CompleteOnboardingRequest, CompleteOnboardingResponse, CreateDonationReceiverRequest, DonationReceiver, UpdateProfileRequest, VerifyRequest, VerifyResponse } from '@app/common/types/donationReceiver';
import { Observable } from 'rxjs';

@Controller()
@DonationsServiceControllerMethods()
export class DonationServiceController implements DonationsServiceController {
  constructor(private readonly donationReceiverServiceService: DonationReceiverServiceService) { }

  createDonation(request: CreateDonationRequest): Donation | Promise<Donation> | Observable<Donation> {
    return
  }
}
