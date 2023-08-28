import { Module } from '@nestjs/common';
import { StripeConnectCustomersService } from './stripe-connect-customers.service';

@Module({
  providers: [StripeConnectCustomersService],
  imports: [],
  exports: [StripeConnectCustomersService]
})
export class StripeConnectCustomersModule {}
