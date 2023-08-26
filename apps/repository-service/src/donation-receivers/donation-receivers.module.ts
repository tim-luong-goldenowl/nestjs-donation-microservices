import { Module } from '@nestjs/common';
import { DonationReceiversController } from './donation-receivers.controller';
import { DonationReceiversService } from './donation-receivers.service';
import DonationReceiverEntity from '../entities/donation-receiver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DonationReceiversController],
  providers: [DonationReceiversService],
  imports: [TypeOrmModule.forFeature([DonationReceiverEntity])]
})

export class DonationReceiversModule {}
