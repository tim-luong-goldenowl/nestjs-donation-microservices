import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appDatasourceOptions } from './typeorm.config';
import { UsersModule } from './users/users.module';
import { DonationReceiversModule } from './donation-receivers/donation-receivers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDatasourceOptions),
    UsersModule,
    DonationReceiversModule
  ],
  controllers: [],
  providers: [],
})

export class RepositoryServiceModule {}
