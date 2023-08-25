import { Module } from '@nestjs/common';
import { DonationReceiversController } from './donation-receivers.controller';
import { DonationReceiversService } from './donation-receivers.service';

@Module({
  controllers: [DonationReceiversController],
  providers: [DonationReceiversService],
  imports: []
})

export class DonationReceiversModule {}
