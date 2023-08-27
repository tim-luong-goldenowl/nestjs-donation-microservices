import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserProfileDto {
    @IsNotEmpty()
    @IsString()
    @Expose()
    firstName: string

    @IsNotEmpty()
    @Expose()
    @IsString()
    lastName: string
    
    @Expose()
    dob: any

    @Expose()
    @IsNotEmpty()
    uid: string
    
    @IsString()
    @Expose()
    @IsNotEmpty()
    email: string

    @IsString()
    address: string
    @IsString()
    stripeCustomerId: string
    
    avatarUrl: string
}