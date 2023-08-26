import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { iUserJwtPayload } from '../interfaces/user-jwt-payload.interfact';
import { ConfigService } from '@nestjs/config';
import { Request as RequestType } from 'express';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_REPOSITORY_SERVICE_NAME, UserRepositoryServiceClient } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME } from '@app/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(REPOSITORY_SERVICE_CLIENT_NAME) private client: ClientGrpc
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
    const user = await lastValueFrom(this.client.getService<UserRepositoryServiceClient>(USER_REPOSITORY_SERVICE_NAME).findOneById({uid: payload.uid}))
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