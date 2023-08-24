import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
