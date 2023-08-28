import { Body, Controller, Post, Req } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationDto } from './donation.dto';

@Controller('donation')
export class DonationController {
    constructor(
        private donationService: DonationService,
    ) { }

    @Post()
    async createDonation(@Body() params: DonationDto, @Req() req) {
        const donationCreateResult = await this.donationService.createDonation({...params, user: req.user})
        const donationCount = await this.donationService.getDonationCount({donationReceiverUid: params.donationReceiverUid})

        if (donationCreateResult.success) {
            return {
                success: true,
                data: {
                    donation: donationCreateResult.donation,
                    donationCount: donationCount.count
                }
            };
        } else {
            return {
                success: false
            };
        }
    }
}
