import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RepositoryServiceModule } from './repository-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RepositoryServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, './user.proto'),
        package: 'auth',
      },
    },
  );
  await app.listen();
}
bootstrap();