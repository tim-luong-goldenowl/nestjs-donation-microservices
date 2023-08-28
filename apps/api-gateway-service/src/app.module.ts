import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { DonationReceiversModule } from './donation-receivers/donation-receivers.module';
import { UsersModule } from './users/users.module';
import { DonationModule } from './donation/donation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DonationReceiversModule,
    UsersModule,
    DonationModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule { }
