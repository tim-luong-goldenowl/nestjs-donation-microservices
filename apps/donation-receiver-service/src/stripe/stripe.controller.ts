import { Body, Controller, Get, Inject, Post, Req } from '@nestjs/common';
import { StripeCustomerService } from './services/customers/customer.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('stripe')
export class StripeController {
    constructor(
        private stripeCustomerService: StripeCustomerService,
        // @Inject(STRIPE_MICROSERVICE_NAME) private readonly stripeMicroserviceClient: ClientProxy,
    ) { }

    // @Post('/create-customer-card')
    // async createCustomerCard(@Body() params, @Req() req) {
    //     const cardInfor = await this.stripeCustomerService.createCustomerCard(params.cardToken, req.user);

    //     if(cardInfor) {
    //         return {
    //             success: true
    //         }
    //     } else {
    //         return {
    //             success: false
    //         }
    //     }
    // }
}
