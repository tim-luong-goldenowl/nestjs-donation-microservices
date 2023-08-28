import { CreateConnectCustomerRequest, FindByUserAndDrRequest, FindByUserAndDrResponse, StripeConnectCustomer, StripeConnectCustomerRepositoryServiceController, StripeConnectCustomerRepositoryServiceControllerMethods } from '@app/common/types/repositoryService';
import { Body, Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StripeConnectCustomersService } from './stripe-connect-customers.service';

@Controller()
@StripeConnectCustomerRepositoryServiceControllerMethods()
export class StripeConnectCustomerController implements StripeConnectCustomerRepositoryServiceController {
  constructor(
    private stripeConnectCustomersService: StripeConnectCustomersService,
  ) { }

  create(request: CreateConnectCustomerRequest): StripeConnectCustomer | Promise<StripeConnectCustomer> | Observable<StripeConnectCustomer> {
    return this.stripeConnectCustomersService.create(request)
  }

  findByUserAndDr(request: FindByUserAndDrRequest): FindByUserAndDrResponse | Promise<FindByUserAndDrResponse> | Observable<FindByUserAndDrResponse> {
    return this.stripeConnectCustomersService.findByUserAndDonationReceiver(request)
  }
}
