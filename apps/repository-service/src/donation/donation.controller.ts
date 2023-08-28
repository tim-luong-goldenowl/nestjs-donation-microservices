import { Controller } from '@nestjs/common';
import { DonationService } from './donation.service';
import { Observable } from 'rxjs';
import { DonationRepositoryServiceController, DonationRepositoryServiceControllerMethods } from '@app/common/types/repositoryService';
import { CreateDonationRequest, CreateDonationResponse, GetDonationCountByDrIdRequest, GetDonationCountByDrIdResponse } from '@app/common/types/donation';

@Controller()
@DonationRepositoryServiceControllerMethods()
export class DonationController implements DonationRepositoryServiceController {
  constructor(
    private donationService: DonationService,
  ) {}

  createDonation(
    request: CreateDonationRequest,
  ):
    | CreateDonationResponse
    | Promise<CreateDonationResponse>
    | Observable<CreateDonationResponse> {
    return this.donationService.createDonation(request);
  }

  getDonationCountByDrId(
    request: GetDonationCountByDrIdRequest,
  ):
    | GetDonationCountByDrIdResponse
    | Promise<GetDonationCountByDrIdResponse>
    | Observable<GetDonationCountByDrIdResponse> {
    return this.donationService.getDonationCount(request);
  }
}
