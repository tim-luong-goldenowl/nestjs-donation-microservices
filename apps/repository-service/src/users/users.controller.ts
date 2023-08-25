import { Controller } from '@nestjs/common';
import { CreateUserDto, Email, Empty, Id, User, Users, UsersServiceController, UsersServiceControllerMethods } from '@app/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(
    private userService: UsersService,
) { }

  findAllUsers(request: Empty): Users | Promise<Users> | Observable<Users> {
    return {
      users: [

      ]
    }
  }

  createUser(request: CreateUserDto): User | Promise<User> | Observable<User> {
    return this.userService.createUser(request)
  }

  findOneByEmail(request: Email): User | Promise<User> | Observable<User> {
    return this.userService.findByEmail(request.email)
  }

  findOneById(request: Id): User | Promise<User> | Observable<User> {
    return this.userService.findById(request.id)
  }
}
