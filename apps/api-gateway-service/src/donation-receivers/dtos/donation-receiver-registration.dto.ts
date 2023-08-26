import { Expose } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class DonationReceiverRegistrationDto {
    @Expose()
    email: string

    @Expose()
    uid: string

    @Expose()
    businessName: string

    @Expose()
    companyName: string

    @Expose()
    country: string

    @Expose()
    bio: any

    avatarUrl: string
}