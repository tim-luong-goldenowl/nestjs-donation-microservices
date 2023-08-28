import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeCustomerService } from './services/customer.service';

@Module({
  providers: [StripeCustomerService, ConfigService],
  controllers: [],
  imports: [
    StripeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_TEST_SECRET_KEY'),
        apiVersion: '2023-08-16'
      })
    })
  ],
   exports: [StripeCustomerService]
})
export class StripeUltilsModule {}
