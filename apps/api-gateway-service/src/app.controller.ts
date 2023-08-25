import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { USERS_SERVICE_CLIENT_NAME } from './constants';
import { ClientGrpc } from '@nestjs/microservices';
import { UsersServiceClient } from '@app/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(USERS_SERVICE_CLIENT_NAME) private client: ClientGrpc
    ) {}

  @Get()
  findAllUsers() {
    return this.client.getService<UsersServiceClient>('UsersService').findAllUsers({})
  }
}
