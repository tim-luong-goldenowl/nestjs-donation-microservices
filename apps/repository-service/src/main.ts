import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { RepositoryServiceModule } from './repository-service.module';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RepositoryServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(process.cwd(), './proto/repositoryService.proto'),
        package: REPOSITORY_SERVICE_PACKAGE_NAME,
        url: getServiceUrlByServiceName(REPOSITORY_SERVICE_CLIENT_NAME)
      },
    },
  );
  await app.listen();
}
bootstrap();
