import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentIntentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  async createPaymentIntent(
    amount: number,
    customerId: string,
    stripeAccount: string,
    metadata: any = {},
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const res = await this.stripeClient.paymentIntents.create(
      {
        amount,
        currency: 'usd',
        confirm: true,
        metadata,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        }
      },
      {
        stripeAccount,
      },
    );

    return res;
  }
}
