import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Get, Query, Post, Req, Put, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { plainToInstance } from 'class-transformer';
// import { MailService } from 'src/mail/mail.service';
import Stripe from 'stripe';
import { DonationReceiversService } from './donation-receivers.service';
import DonationReceiverEntity from 'apps/repository-service/src/entities/donation-receiver.entity';

@Controller('donation-receivers')
export class DonationReceiversController {
    constructor(

    ) {}

    // @Get()
    // async getDonationReceivers(@Req() req) {
    //     const data = await this.donationRecieverService.getVerified(req.user)

    //     return {
    //         data
    //     }
    // }

    // @Get('/:id')
    // async getById(@Param() query, @Req() req) {
    //     const data = await this.donationRecieverService.getById(query.id)
    //     const donationCount = 3//await this.donationService.getDonationCount(query.id)

    //     return {
    //         data: {
    //             ...data,
    //             donationCount,
    //         },
    //         canMakeDonate: req.user.stripeCustomerId.length
    //     }
    // }

    // @Post('register')
    // async registration(@Req() req): Promise<DonationReceiverEntity> {
    //     const donationReceiver = await this.donationRecieverService.create(req.user)
    //     return donationReceiver;
    // }

    // @Post('verify')
    // async verify(@Body() body, @Req() req): Promise<any> {
    //     const onboardingLink = await this.donationRecieverService.processVerifyForDonationReceiver(body.id)

    //     if (onboardingLink) {
    //         return {
    //             success: true
    //         }
    //     } else {
    //         return {
    //             success: false
    //         }
    //     }
    // }

    // @Public()
    // @Get('register-completed/:token')
    // async registerCompleted(@Param() query: any) {
    //     const token = query.token;
    //     const success: boolean = await this.donationRecieverService.complete(token)

    //     return {
    //         success
    //     }
    // }

    // @Put('/update-profile')
    // @UseInterceptors(FileInterceptor('avatar'))
    // async updateProfile(@Body() params: DonationReceiverRegistrationDto, @UploadedFile() avatar) {
    //     const DtoParams = plainToInstance(DonationReceiverRegistrationDto, params, { excludeExtraneousValues: true, enableImplicitConversion: true })

    //     const donationReceiver = await this.donationRecieverService.update(DtoParams, avatar);
    //     return donationReceiver;
    // }
}


