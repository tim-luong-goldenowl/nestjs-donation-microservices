import { Controller } from '@nestjs/common';
import { UserRepositoryServiceControllerMethods } from '@app/common/types/repositoryService';
import { CreateCustomerAndCardRequest, CreateCustomerAndCardResponse, GetPaymentMethodRequest, GetPaymentMethodResponse, UsersServiceController, UsersServiceControllerMethods } from '@app/common/types/userService';
import { Observable } from 'rxjs';
import { GetUserProfilesRequest, GetUserProfilesResponse, UpdateUserProfileRequest, User } from '@app/common/types/user';
import { UserService } from './user.service';

@Controller()
@UsersServiceControllerMethods()
export class UserController implements UsersServiceController {
  constructor(private readonly userService: UserService) { }

  createCustomerAndCard(request: CreateCustomerAndCardRequest): CreateCustomerAndCardResponse | Promise<CreateCustomerAndCardResponse> | Observable<CreateCustomerAndCardResponse> {
    return
  }

  getPaymentMethod(request: GetPaymentMethodRequest): GetPaymentMethodResponse | Promise<GetPaymentMethodResponse> | Observable<GetPaymentMethodResponse> {
    return
  }

  getProfiles(request: GetUserProfilesRequest): GetUserProfilesResponse | Promise<GetUserProfilesResponse> | Observable<GetUserProfilesResponse> {
    return this.userService.getProfiles(request)
  }

  updateUserProfile(request: UpdateUserProfileRequest): User | Promise<User> | Observable<User> {
    console.log("request", request)
    return this.userService.updateUserProfile(request)
  }
}
