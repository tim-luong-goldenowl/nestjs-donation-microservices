import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { iUserJwtPayload } from '../interfaces/user-jwt-payload.interfact';
import { ConfigService } from '@nestjs/config';
import { Request as RequestType } from 'express';
import { USERS_SERVICE_CLIENT_NAME } from '../../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClient } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(USERS_SERVICE_CLIENT_NAME) private client: ClientGrpc
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(
        [
          JwtStrategy.extractJWT,
          ExtractJwt.fromAuthHeaderAsBearerToken()
        ]
      ),
      ignoreExpiration: false,
      secretOrKey: configService.get('AT_SECRECT'),
    });
  }

  async validate(payload: iUserJwtPayload) {
    const user = await lastValueFrom(this.client.getService<UsersServiceClient>('UsersService').findAllUsers({}))

    console.log("@@@@@@@@@@@@@@@@@@user", user)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private static extractJWT(@Req() request: RequestType): string | null {
    console.log("!!!!!!!!!!!! extractJWT token", request.cookies.token)

    if (
      request.cookies &&
      'token' in request.cookies &&
      request.cookies.token.length > 0
    ) {
      return request.cookies.token;
    }
    return null;
  }
}