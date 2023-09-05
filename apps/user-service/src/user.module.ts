import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { S3Module } from './s3/s3.module';
import { StripeUltilsModule } from './stripe/stripe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
    StripeUltilsModule,
    ConfigModule.forRoot()
  ],
  controllers: [UserController],
  providers: [UserService, ConfigService],
})
export class UserServiceModule {}
