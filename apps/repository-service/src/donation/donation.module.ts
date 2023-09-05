import { Module } from '@nestjs/common';
import { DonationController } from './donation.controller';
import { DonationService } from './donation.service';
import { DONATION_RECEIVER_SERVICE_CLIENT_NAME, REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { DONATION_RECEIVER_SERVICE_PACKAGE_NAME } from '@app/common/types/donationReceiverService';
import DonationEntity from '../entities/donation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

@Module({
  controllers: [DonationController],
  providers: [DonationService],
  imports: [
    ClientsModule.register([
      {
        name: REPOSITORY_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: REPOSITORY_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/repositoryService.proto'),
          url: getServiceUrlByServiceName(REPOSITORY_SERVICE_CLIENT_NAME)
        },
      },
      {
        name: DONATION_RECEIVER_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: DONATION_RECEIVER_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/donationReceiverService.proto'),
          url: getServiceUrlByServiceName(DONATION_RECEIVER_SERVICE_CLIENT_NAME)
        },
      },
    ]),
    TypeOrmModule.forFeature([DonationEntity])
  ]
})

export class DonationModule {}
