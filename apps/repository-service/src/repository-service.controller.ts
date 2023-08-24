import { Controller, Get } from '@nestjs/common';
import { RepositoryServiceService } from './repository-service.service';

@Controller()
export class RepositoryServiceController {
  constructor(private readonly repositoryServiceService: RepositoryServiceService) {}

  @Get()
  getHello(): string {
    return this.repositoryServiceService.getHello();
  }
}
