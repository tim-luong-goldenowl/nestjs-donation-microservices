import { Module } from '@nestjs/common';
import { DonationReceiverServiceController } from './donation-receiver-service.controller';
import { DonationReceiverServiceService } from './donation-receiver-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_CLIENT_NAME, SEND_MAIL_QUEUE_NAME } from '@app/common/constants';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeConnectService } from './stripe/services/stripe-connect/stripe-connect.service';
import { StripeUltilsModule } from './stripe/stripe.module';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail/mail.service';
import { MailerJobConsumer } from './job-consumers/mailer-job.consumer';
import { MailModule } from './mail/mail.module';
import { DonationService } from './donation-service.service';
import { DonationServiceController } from './donation-service.controller';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

@Module({
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
    ]),
    S3Module,
    ConfigModule.forRoot(),
    StripeUltilsModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        }
      })
    }),
    BullModule.registerQueue({
      name: SEND_MAIL_QUEUE_NAME
    }),
    MailModule
  ],
  controllers: [DonationReceiverServiceController, DonationServiceController],
  providers: [DonationReceiverServiceService, S3Service, ConfigService, StripeConnectService, MailService, MailerJobConsumer, DonationService],
})
export class DonationReceiverServiceModule { }
