import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSigninParamsDto } from './dtos/user-signin-params.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { iUserJwtPayload } from './interfaces/user-jwt-payload.interfact';
import { USERS_SERVICE_CLIENT_NAME, USERS_SERVICE_NAME } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClient } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
      private usersService: UsersServiceClient;

    constructor(
        private jwtService: JwtService,
        @Inject(USERS_SERVICE_CLIENT_NAME) private client: ClientGrpc
    ) { }

    onModuleInit() {
        this.usersService =
          this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
      }

    async validateUser(params: UserSigninParamsDto): Promise<any> {
        const user = await lastValueFrom(this.usersService.findOneByEmail({email: params.email}))

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

    async login(user): Promise<string> {
        const payload: iUserJwtPayload = {
            id: user.id
        }

        const accessToken = await this.jwtService.signAsync(payload)

        return accessToken;
    }
}
