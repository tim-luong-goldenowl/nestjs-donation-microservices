import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDatasourceOptions } from './typeorm.config';
import { UsersModule } from './users/users.module';
import { DonationReceiversModule } from './donation-receivers/donation-receivers.module';
import { DonationModule } from './donation/donation.module';
import { StripeConnectCustomersModule } from './stripe-connect-customers/stripe-connect-customers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDatasourceOptions),
    UsersModule,
    DonationReceiversModule,
    DonationModule,
    StripeConnectCustomersModule,
  ],
  controllers: [],
  providers: [],
})

export class RepositoryServiceModule {}
