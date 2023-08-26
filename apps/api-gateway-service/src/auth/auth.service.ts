import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserSigninParamsDto } from './dtos/user-signin-params.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { iUserJwtPayload } from './interfaces/user-jwt-payload.interfact';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import UserEntity from 'apps/repository-service/src/entities/user.entity';
import { USER_REPOSITORY_SERVICE_NAME, UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';

@Injectable()
export class AuthService implements OnModuleInit {
    private usersService: UserRepositoryServiceClient;

    constructor(
        private jwtService: JwtService,
        @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc
    ) { }

    onModuleInit() {
        this.usersService =
            this.client.getService<UserRepositoryServiceClient>(USER_REPOSITORY_SERVICE_NAME);
    }

    async validateUser(params: UserSigninParamsDto): Promise<any> {
        const user = await lastValueFrom(this.usersService.findOneByEmail({ email: params.email }))

        if (!user) {
            throw new HttpException('User does not exist!', HttpStatus.BAD_REQUEST)
        }

        const passwordMatchs = await bcrypt.compareSync(params.password, user.password)

        if (user && passwordMatchs) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: UserEntity): Promise<string> {
        const payload: iUserJwtPayload = {
            uid: user.uid
        }

        const accessToken = await this.jwtService.signAsync(payload)

        return accessToken;
    }
}
