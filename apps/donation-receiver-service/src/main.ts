import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DonationReceiverServiceModule } from './donation-receiver-service.module';
import { DONATION_RECEIVER_SERVICE_PACKAGE_NAME } from '@app/common/types/donationReceiverService';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    DonationReceiverServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/donationReceiverService.proto'),
        package: DONATION_RECEIVER_SERVICE_PACKAGE_NAME,
        url: 'localhost:3005'
      },
    },
  );
  await app.listen();
}
bootstrap();
