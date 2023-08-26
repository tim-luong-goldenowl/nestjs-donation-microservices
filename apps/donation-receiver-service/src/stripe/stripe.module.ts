import { Module } from '@nestjs/common';
import { StripeConnectService } from './services/stripe-connect/stripe-connect.service';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaymentIntentService } from './services/payments/payment-intent.service';
import { StripeCustomerService } from './services/customers/customer.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [StripeConnectService, PaymentIntentService, StripeCustomerService, ConfigService],
  controllers: [StripeController],
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: "123123213",
        apiVersion: '2023-08-16'
      })
    })
  ],
   exports: [PaymentIntentService, StripeCustomerService]
})
export class StripeUltilsModule {}
