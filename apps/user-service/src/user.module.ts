import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { S3Module } from './s3/s3.module';
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
    StripeUltilsModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule {}
