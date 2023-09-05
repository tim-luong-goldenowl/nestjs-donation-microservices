import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { DonationReceiversService } from './donation-receivers.service';
import { DonationReceiver } from '@app/common/types/donationReceiver';
import { FileInterceptor } from '@nestjs/platform-express';
import { DonationReceiverRegistrationDto } from './dtos/donation-receiver-registration.dto';
import { plainToInstance } from 'class-transformer';
import { Public } from '../auth/auth.decorator';
import { DonationService } from '../donation/donation.service';

@Controller('donation-receivers')
export class DonationReceiversController {
  constructor(
    private donationRecieverService: DonationReceiversService,
    private donationService: DonationService
  ) { }

  @Get()
  async getDonationReceivers(@Request() req) {
    const data = await this.donationRecieverService.getVerifiedDonationReceivers({ currentUserUid: req.user.uid });

    return {
      data: data.donationReceivers,
    };
  }

  @Post('register')
  async registration(@Req() req): Promise<DonationReceiver> {
    const donationReceiver = await this.donationRecieverService.create(req.user.uid)
    return donationReceiver;
  }

  @Put('/update-profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateProfile(@Body() params: DonationReceiverRegistrationDto, @UploadedFile() avatar) {
    const DtoParams = plainToInstance(DonationReceiverRegistrationDto, params, { excludeExtraneousValues: true, enableImplicitConversion: true })

    const donationReceiver = await this.donationRecieverService.updateProfile(DtoParams, avatar);
    return donationReceiver;
  }

  @Post('verify')
  async verify(@Body() body): Promise<any> {
    const verifyResult = await this.donationRecieverService.verify(body.uid)

    if (verifyResult.onboardingLink) {
      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }
  }

  @Public()
  @Get('register-completed/:token')
  async registerCompleted(@Param() query: any) {
    const token = query.token;
    const result = await this.donationRecieverService.completeOnboarding({token})

    return {
      success: result.success
    }
  }

  @Get('/:id')
  async getById(@Param() query, @Req() req) {
      const data = await this.donationRecieverService.getByUid(query.id)
      const donationCount = await this.donationService.getDonationCount({donationReceiverUid: query.id})

      return {
          data: {
              ...data,
              donationCount: donationCount.count,
          },
          canMakeDonate: (req.user.stripeCustomerId || '').length > 0
      }
  }
}
