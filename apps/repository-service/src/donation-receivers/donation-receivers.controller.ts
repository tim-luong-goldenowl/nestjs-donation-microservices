import { DonationReceiversService } from './donation-receivers.service';
import {
    CreateDonationReceiverRequest,
    DonationReceiver,
    DonationReceivers,
    FindAllVerifiedRequest,
    FindOneByUidRequest,
    FindOneByUserRequest,
    FindOneDrResponse,
    UpdateConnectedAccountInforRequest,
    UpdateProfileRequest,
} from '@app/common/types/donationReceiver';
import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';
import {
    DonationReceiverRepositoryServiceController,
    DonationReceiverRepositoryServiceControllerMethods,
} from '@app/common/types/repositoryService';

@Controller()
@DonationReceiverRepositoryServiceControllerMethods()
export class DonationReceiversController
    implements DonationReceiverRepositoryServiceController {
    constructor(private donationReceiversService: DonationReceiversService) { }

    findAllVerified(request: FindAllVerifiedRequest): DonationReceivers | Promise<DonationReceivers> | Observable<DonationReceivers> {
        return this.donationReceiversService.findAllVerified(
            request.currentUserUid,
        );
    }

    create(request: CreateDonationReceiverRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.create(request);
    }

    findOneByUser(request: FindOneByUserRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneByUser(request.uid);

    }

    findOneByUid(request: FindOneByUidRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneByUid(request.uid);
    }

    updateProfile(request: UpdateProfileRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.updateProfile(request);
    }

    findOneNotVerified(request: FindOneByUidRequest): FindOneDrResponse | Promise<FindOneDrResponse> | Observable<FindOneDrResponse> {
        return this.donationReceiversService.findOneNotVerified(request.uid);
    }

    updateConnectedAccountInfor(request: UpdateConnectedAccountInforRequest): DonationReceiver | Promise<DonationReceiver> | Observable<DonationReceiver> {
        return this.donationReceiversService.updateConnectedAccountInfor(request);
    }

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
