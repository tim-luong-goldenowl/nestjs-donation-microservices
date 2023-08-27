/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { GetUserProfilesRequest, GetUserProfilesResponse, UpdateUserProfileRequest, User } from "./user";

export const protobufPackage = "userService";

export interface GetPaymentMethodRequest {
  stripeCustomerId: string;
}

export interface GetPaymentMethodResponse {
  success: boolean;
  last4: string;
  brand: string;
  country: string;
  expMonth: string;
  expYear: string;
}

export interface CreateCustomerAndCardRequest {
  user: User | undefined;
  cardToken: string;
}

export interface CreateCustomerAndCardResponse {
  success: boolean;
}

export const USER_SERVICE_PACKAGE_NAME = "userService";

export interface UsersServiceClient {
  getProfiles(request: GetUserProfilesRequest): Observable<GetUserProfilesResponse>;

  updateUserProfile(request: UpdateUserProfileRequest): Observable<User>;

  getPaymentMethod(request: GetPaymentMethodRequest): Observable<GetPaymentMethodResponse>;

  createCustomerAndCard(request: CreateCustomerAndCardRequest): Observable<CreateCustomerAndCardResponse>;
}

export interface UsersServiceController {
  getProfiles(
    request: GetUserProfilesRequest,
  ): Promise<GetUserProfilesResponse> | Observable<GetUserProfilesResponse> | GetUserProfilesResponse;

  updateUserProfile(request: UpdateUserProfileRequest): Promise<User> | Observable<User> | User;

  getPaymentMethod(
    request: GetPaymentMethodRequest,
  ): Promise<GetPaymentMethodResponse> | Observable<GetPaymentMethodResponse> | GetPaymentMethodResponse;

  createCustomerAndCard(
    request: CreateCustomerAndCardRequest,
  ): Promise<CreateCustomerAndCardResponse> | Observable<CreateCustomerAndCardResponse> | CreateCustomerAndCardResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getProfiles", "updateUserProfile", "getPaymentMethod", "createCustomerAndCard"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
