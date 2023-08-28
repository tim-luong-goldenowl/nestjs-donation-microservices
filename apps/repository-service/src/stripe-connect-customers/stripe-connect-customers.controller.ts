import { CreateConnectCustomerRequest, FindByUserAndDrRequest, StripeConnectCustomer, StripeConnectCustomerRepositoryServiceController, StripeConnectCustomerRepositoryServiceControllerMethods } from '@app/common/types/repositoryService';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StripeConnectCustomersService } from './stripe-connect-customers.service';

@Controller()
@StripeConnectCustomerRepositoryServiceControllerMethods()
export class DonationController implements StripeConnectCustomerRepositoryServiceController {
    constructor(
        private stripeConnectCustomersService: StripeConnectCustomersService,
    ) { }

    create(request: CreateConnectCustomerRequest): StripeConnectCustomer | Promise<StripeConnectCustomer> | Observable<StripeConnectCustomer> {
      return this.stripeConnectCustomersService.create(request)
    }

    findByUserAndDr(request: FindByUserAndDrRequest): StripeConnectCustomer | Promise<StripeConnectCustomer> | Observable<StripeConnectCustomer> {
      return
    }
}
