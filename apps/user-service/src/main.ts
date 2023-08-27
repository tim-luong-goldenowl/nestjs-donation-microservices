import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserServiceModule } from './user.module';
import { USER_SERVICE_PACKAGE_NAME } from '@app/common/types/userService';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/userService.proto'),
        package: USER_SERVICE_PACKAGE_NAME,
        url: 'localhost:3006'
      },
    },
  );
  await app.listen();
}
bootstrap();
