import { Module } from '@nestjs/common';
import { DonationReceiversController } from './donation-receivers.controller';
import { DonationReceiversService } from './donation-receivers.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { DONATION_RECEIVER_SERVICE_CLIENT_NAME, REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { DONATION_RECEIVER_SERVICE_PACKAGE_NAME } from '@app/common/types/donationReceiverService';

@Module({
  controllers: [DonationReceiversController],
  providers: [DonationReceiversService],
  imports: [
    ClientsModule.register([
      {
        name: REPOSITORY_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: REPOSITORY_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/repositoryService.proto')
        },
      },
      {
        name: DONATION_RECEIVER_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: DONATION_RECEIVER_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/donationReceiverService.proto'),
          url: 'localhost:3005'
        },
      },
    ])
  ]
})

export class DonationReceiversModule { }
