import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REPOSITORY_SERVICE_CLIENT_NAME, USER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { join } from 'path';
import { USER_SERVICE_PACKAGE_NAME } from '@app/common/types/userService';
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
      {
        name: USER_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/userService.proto'),
          url: getServiceUrlByServiceName(USER_SERVICE_CLIENT_NAME)
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}
