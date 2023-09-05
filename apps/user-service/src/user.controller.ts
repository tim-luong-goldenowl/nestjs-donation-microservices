import { Controller } from '@nestjs/common';
import { CreateCustomerAndCardRequest, CreateCustomerAndCardResponse, GetPaymentMethodRequest, GetPaymentMethodResponse, UsersServiceController, UsersServiceControllerMethods } from '@app/common/types/userService';
import { Observable } from 'rxjs';
import { GetUserProfilesRequest, GetUserProfilesResponse, UpdateUserProfileRequest, User } from '@app/common/types/user';
import { UserService } from './user.service';

@Controller()
@UsersServiceControllerMethods()
export class UserController implements UsersServiceController {
  constructor(private readonly userService: UserService) { }

  createCustomerAndCard(request: CreateCustomerAndCardRequest): CreateCustomerAndCardResponse | Promise<CreateCustomerAndCardResponse> | Observable<CreateCustomerAndCardResponse> {
    return this.userService.createCustomerAndCard(request)
  }

  getPaymentMethod(request: GetPaymentMethodRequest): GetPaymentMethodResponse | Promise<GetPaymentMethodResponse> | Observable<GetPaymentMethodResponse> {
    return this.userService.getPaymentMethod(request)
  }

  getProfiles(request: GetUserProfilesRequest): GetUserProfilesResponse | Promise<GetUserProfilesResponse> | Observable<GetUserProfilesResponse> {
    return this.userService.getProfiles(request)
  }

  updateUserProfile(request: UpdateUserProfileRequest): User | Promise<User> | Observable<User> {
    return this.userService.updateUserProfile(request)
  }
}
