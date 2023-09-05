import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DonationReceiverServiceModule } from './donation-receiver-service.module';
import { DONATION_RECEIVER_SERVICE_PACKAGE_NAME } from '@app/common/types/donationReceiverService';
import { DONATION_RECEIVER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DonationReceiverServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/donationReceiverService.proto'),
        package: DONATION_RECEIVER_SERVICE_PACKAGE_NAME,
        url: getServiceUrlByServiceName(DONATION_RECEIVER_SERVICE_CLIENT_NAME)
      },
    },
  );
  await app.listen();
}
bootstrap();
