import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { CreateUserDto, Email, Empty, Id, User, UserProfiles, Users } from '@app/common/types/user';
import { UserRepositoryServiceController, UserRepositoryServiceControllerMethods } from '@app/common/types/repositoryService';

@Controller()
@UserRepositoryServiceControllerMethods()
export class UsersController implements UserRepositoryServiceController {
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
    return this.userService.findById(request.uid)
  }

  getProfiles(request: Id): UserProfiles | Promise<UserProfiles> | Observable<UserProfiles> {
    return
  }
}
