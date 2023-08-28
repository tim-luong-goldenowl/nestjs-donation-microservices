import { Module } from '@nestjs/common';
import { StripeConnectCustomersService } from './stripe-connect-customers.service';
import StripeConnectCustomerEntity from '../entities/stripe-connect-customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeConnectCustomerController } from './stripe-connect-customers.controller';

@Module({
  providers: [StripeConnectCustomersService],
  imports: [TypeOrmModule.forFeature([StripeConnectCustomerEntity])],
  exports: [StripeConnectCustomersService],
  controllers: [StripeConnectCustomerController]
})
export class StripeConnectCustomersModule {}
