import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UsersService } from '../users/users.service';
import { REPOSITORY_SERVICE_PACKAGE_NAME } from '@app/common/types/repositoryService';
import { REPOSITORY_SERVICE_CLIENT_NAME, USER_SERVICE_CLIENT_NAME } from '@app/common/constants';
import { USER_SERVICE_PACKAGE_NAME } from '@app/common/types/userService';
import { getServiceUrlByServiceName } from '@app/common/serviceUrlUltils';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService, LocalStrategy, JwtStrategy, UsersService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('AT_SECRECT'),
          signOptions: { expiresIn: 3600 * 7 },
        }
      },
    }),
    ClientsModule.register([
      {
        name: REPOSITORY_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: REPOSITORY_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/repositoryService.proto'),
          url: getServiceUrlByServiceName(REPOSITORY_SERVICE_CLIENT_NAME)
        },
      },
      {
        name: USER_SERVICE_CLIENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: USER_SERVICE_PACKAGE_NAME,
          protoPath: join(process.cwd(), './proto/userService.proto'),
          url: getServiceUrlByServiceName(USER_SERVICE_CLIENT_NAME)
        },
      }
    ])
  ],
})

export class AuthModule {}