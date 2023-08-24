import { Module } from '@nestjs/common';
import { RepositoryServiceController } from './repository-service.controller';
import { RepositoryServiceService } from './repository-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDatasourceOptions } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDatasourceOptions)
  ],
  controllers: [RepositoryServiceController],
  providers: [RepositoryServiceService],
})

export class RepositoryServiceModule {}
