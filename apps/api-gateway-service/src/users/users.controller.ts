import { Body, Controller, Get, Inject, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) { }

    @Get('/me')
    async me(@Req() req) {
        const user = await this.userService.findOneById(req.user.uid);
        return user;
    }

    @Get('/profiles')
    async profiles(@Req() req) {
        const profiles = await this.userService.getProfiles(req.user.uid)

        return profiles
    }

    @Put('/update-profile')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateProfile(@Body() params, @UploadedFile() avatar, @Req() req) {
        const DtoParams = plainToInstance(UpdateUserProfileDto, params, { excludeExtraneousValues: true, enableImplicitConversion: true })
        DtoParams.uid = req.user.uid
        const user = await this.userService.updateUser(DtoParams, avatar);

        return user;
    }

    // @Get('/get-payment-method')
    // async getPaymentMethod(@Req() req) {
    //     const paymentMethod = await lastValueFrom(this.stripeMicroserviceClient.send(STRIPE_MICROSERVICE_GET_CUSTOMER_CARD_MESSAGE, { user: req.user }))
    //     return paymentMethod
    // }

    // @Post('/create-customer-card')
    // async createCustomerCard(@Body() params, @Req() req) {
    //     const result = await this.userStripeCustomerService.createCustomerAndCard(params.cardToken, req.user)

    //     if (result) {
    //         return {
    //             success: true
    //         }
    //     } else {
    //         return {
    //             success: false
    //         }
    //     }
    // }
}
