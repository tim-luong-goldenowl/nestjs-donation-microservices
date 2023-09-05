import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserServiceModule } from './user.module';
import { USER_SERVICE_PACKAGE_NAME } from '@app/common/types/userService';
import { USER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/userService.proto'),
        package: USER_SERVICE_PACKAGE_NAME,
        url: getServiceUrlByServiceName(USER_SERVICE_CLIENT_NAME)
      },
    },
  );
  await app.listen();
}
bootstrap();
