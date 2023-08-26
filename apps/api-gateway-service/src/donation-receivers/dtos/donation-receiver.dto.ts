import { User } from '@app/common/types/user';
import { IsEmail, IsNotEmpty, IsNumber, IsString, isNumber } from 'class-validator';

export class DonationReceiverDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    businessName: string

    @IsNotEmpty()
    companyName: string

    @IsNotEmpty()
    country: string

    @IsNumber()
    @IsNotEmpty()
    id: number

    onboardingCompleteToken: string
    user: User
}