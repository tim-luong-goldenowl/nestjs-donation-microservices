/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateDonationReceiverRequest,
  DonationReceiver,
  DonationReceivers,
  FindAllVerifiedRequest,
  FindOneByOnboardingTokenRequest,
  FindOneByUidRequest,
  FindOneByUserRequest,
  FindOneDrResponse,
  UpdateConnectedAccountInforRequest,
  UpdateProfileRequest,
  UpdateVerifyInforRequest,
} from "./donationReceiver";
import { CreateUserDto, Email, Empty, Id, UpdateUserProfileRequest, User, UserProfiles, Users } from "./user";

export const protobufPackage = "repositoryService";

export interface CreateConnectCustomerRequest {
  user: User | undefined;
  donationReceiver: DonationReceiver | undefined;
  customerId: string;
}

export interface FindByUserAndDrRequest {
  user: User | undefined;
  donationReceiver: DonationReceiver | undefined;
}

export interface StripeConnectCustomer {
  uid: string;
  customerId: string;
  userUid: string;
  donationReceiverUid: string;
}

export interface UpdateUserStripeCustomerIdRequest {
  uid: string;
  stripeCustomerId: string;
}

export interface GetDonationCountByDrIdRequest {
  donationReceiverUid: string;
}

export interface GetDonationCountByDrIdResponse {
  count: number;
}

export const REPOSITORY_SERVICE_PACKAGE_NAME = "repositoryService";

export interface UserRepositoryServiceClient {
  findAllUsers(request: Empty): Observable<Users>;

  createUser(request: CreateUserDto): Observable<User>;

  findOneByEmail(request: Email): Observable<User>;

  findOneById(request: Id): Observable<User>;

  getProfiles(request: Id): Observable<UserProfiles>;

  updateUserProfile(request: UpdateUserProfileRequest): Observable<User>;

  updateUserStripeCustomerId(request: UpdateUserStripeCustomerIdRequest): Observable<User>;
}

export interface UserRepositoryServiceController {
  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findOneByEmail(request: Email): Promise<User> | Observable<User> | User;

  findOneById(request: Id): Promise<User> | Observable<User> | User;

  getProfiles(request: Id): Promise<UserProfiles> | Observable<UserProfiles> | UserProfiles;

  updateUserProfile(request: UpdateUserProfileRequest): Promise<User> | Observable<User> | User;

  updateUserStripeCustomerId(request: UpdateUserStripeCustomerIdRequest): Promise<User> | Observable<User> | User;
}

export function UserRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findAllUsers",
      "createUser",
      "findOneByEmail",
      "findOneById",
      "getProfiles",
      "updateUserProfile",
      "updateUserStripeCustomerId",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_REPOSITORY_SERVICE_NAME = "UserRepositoryService";

export interface DonationReceiverRepositoryServiceClient {
  findOneByUser(request: FindOneByUserRequest): Observable<FindOneDrResponse>;

  findOneByUid(request: FindOneByUidRequest): Observable<FindOneDrResponse>;

  findOneNotVerified(request: FindOneByUidRequest): Observable<FindOneDrResponse>;

  findOneByOnboardingToken(request: FindOneByOnboardingTokenRequest): Observable<FindOneDrResponse>;

  findAllVerified(request: FindAllVerifiedRequest): Observable<DonationReceivers>;

  create(request: CreateDonationReceiverRequest): Observable<DonationReceiver>;

  updateProfile(request: UpdateProfileRequest): Observable<DonationReceiver>;

  updateConnectedAccountInfor(request: UpdateConnectedAccountInforRequest): Observable<DonationReceiver>;

  updateVerifyInfor(request: UpdateVerifyInforRequest): Observable<DonationReceiver>;
}

export interface DonationReceiverRepositoryServiceController {
  findOneByUser(
    request: FindOneByUserRequest,
  ): Promise<FindOneDrResponse> | Observable<FindOneDrResponse> | FindOneDrResponse;

  findOneByUid(
    request: FindOneByUidRequest,
  ): Promise<FindOneDrResponse> | Observable<FindOneDrResponse> | FindOneDrResponse;

  findOneNotVerified(
    request: FindOneByUidRequest,
  ): Promise<FindOneDrResponse> | Observable<FindOneDrResponse> | FindOneDrResponse;

  findOneByOnboardingToken(
    request: FindOneByOnboardingTokenRequest,
  ): Promise<FindOneDrResponse> | Observable<FindOneDrResponse> | FindOneDrResponse;

  findAllVerified(
    request: FindAllVerifiedRequest,
  ): Promise<DonationReceivers> | Observable<DonationReceivers> | DonationReceivers;

  create(
    request: CreateDonationReceiverRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;

  updateProfile(
    request: UpdateProfileRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;

  updateConnectedAccountInfor(
    request: UpdateConnectedAccountInforRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;

  updateVerifyInfor(
    request: UpdateVerifyInforRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;
}

export function DonationReceiverRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findOneByUser",
      "findOneByUid",
      "findOneNotVerified",
      "findOneByOnboardingToken",
      "findAllVerified",
      "create",
      "updateProfile",
      "updateConnectedAccountInfor",
      "updateVerifyInfor",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DonationReceiverRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DonationReceiverRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DONATION_RECEIVER_REPOSITORY_SERVICE_NAME = "DonationReceiverRepositoryService";

export interface DonationRepositoryServiceClient {
  getDonationCountByDrId(request: GetDonationCountByDrIdRequest): Observable<GetDonationCountByDrIdResponse>;
}

export interface DonationRepositoryServiceController {
  getDonationCountByDrId(
    request: GetDonationCountByDrIdRequest,
  ):
    | Promise<GetDonationCountByDrIdResponse>
    | Observable<GetDonationCountByDrIdResponse>
    | GetDonationCountByDrIdResponse;
}

export function DonationRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getDonationCountByDrId"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DonationRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DonationRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DONATION_REPOSITORY_SERVICE_NAME = "DonationRepositoryService";

export interface StripeConnectCustomerRepositoryServiceClient {
  create(request: CreateConnectCustomerRequest): Observable<StripeConnectCustomer>;

  findByUserAndDr(request: FindByUserAndDrRequest): Observable<StripeConnectCustomer>;
}

export interface StripeConnectCustomerRepositoryServiceController {
  create(
    request: CreateConnectCustomerRequest,
  ): Promise<StripeConnectCustomer> | Observable<StripeConnectCustomer> | StripeConnectCustomer;

  findByUserAndDr(
    request: FindByUserAndDrRequest,
  ): Promise<StripeConnectCustomer> | Observable<StripeConnectCustomer> | StripeConnectCustomer;
}

export function StripeConnectCustomerRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findByUserAndDr"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("StripeConnectCustomerRepositoryService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("StripeConnectCustomerRepositoryService", method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const STRIPE_CONNECT_CUSTOMER_REPOSITORY_SERVICE_NAME = "StripeConnectCustomerRepositoryService";
