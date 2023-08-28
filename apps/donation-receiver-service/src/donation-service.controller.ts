import { Controller } from '@nestjs/common';
import { DonationsServiceController, DonationsServiceControllerMethods } from '@app/common/types/donationReceiverService';
import { Observable } from 'rxjs';
import { DonationService } from './donation-service.service';
import { CreateDonationRequest, CreateDonationResponse, GetDonationCountByDrIdRequest, GetDonationCountByDrIdResponse } from '@app/common/types/donation';

@Controller()
@DonationsServiceControllerMethods()
export class DonationServiceController implements DonationsServiceController {
  constructor(private readonly donationService: DonationService) { }

  createDonation(request: CreateDonationRequest): CreateDonationResponse | Promise<CreateDonationResponse> | Observable<CreateDonationResponse> {
    return this.donationService.createDonation(request)
  }
  
  getDonationCountByDrId(request: GetDonationCountByDrIdRequest): GetDonationCountByDrIdResponse | Promise<GetDonationCountByDrIdResponse> | Observable<GetDonationCountByDrIdResponse> {
    return this.donationService.getDonationCount(request)
  }
}
