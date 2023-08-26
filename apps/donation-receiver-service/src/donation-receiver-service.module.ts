import { Module } from '@nestjs/common';
import { DonationReceiverServiceController } from './donation-receiver-service.controller';
import { DonationReceiverServiceService } from './donation-receiver-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeConnectService } from './stripe/services/stripe-connect/stripe-connect.service';
import { StripeUltilsModule } from './stripe/stripe.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: REPOSITORY_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: REPOSITORY_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/repositoryService.proto'),
        },
      },
    ]),
    S3Module,
    ConfigModule.forRoot(),
    StripeUltilsModule
  ],
  controllers: [DonationReceiverServiceController],
  providers: [DonationReceiverServiceService, S3Service, ConfigService, StripeConnectService],
})
export class DonationReceiverServiceModule {}
