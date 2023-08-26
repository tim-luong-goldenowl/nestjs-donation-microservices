/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CreateDonationReceiverRequest,
  DonationReceiver,
  DonationReceivers,
  FindAllVerifiedRequest,
  FindOneByUidRequest,
  FindOneByUserRequest,
  FindOneDrResponse,
  UpdateConnectedAccountInforRequest,
  UpdateProfileRequest,
} from "./donationReceiver";
import { CreateUserDto, Email, Empty, Id, User, UserProfiles, Users } from "./user";

export const protobufPackage = "repositoryService";

export const REPOSITORY_SERVICE_PACKAGE_NAME = "repositoryService";

export interface UserRepositoryServiceClient {
  findAllUsers(request: Empty): Observable<Users>;

  createUser(request: CreateUserDto): Observable<User>;

  findOneByEmail(request: Email): Observable<User>;

  findOneById(request: Id): Observable<User>;

  getProfiles(request: Id): Observable<UserProfiles>;
}

export interface UserRepositoryServiceController {
  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findOneByEmail(request: Email): Promise<User> | Observable<User> | User;

  findOneById(request: Id): Promise<User> | Observable<User> | User;

  getProfiles(request: Id): Promise<UserProfiles> | Observable<UserProfiles> | UserProfiles;
}

export function UserRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllUsers", "createUser", "findOneByEmail", "findOneById", "getProfiles"];
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

  findAllVerified(request: FindAllVerifiedRequest): Observable<DonationReceivers>;

  create(request: CreateDonationReceiverRequest): Observable<DonationReceiver>;

  updateProfile(request: UpdateProfileRequest): Observable<DonationReceiver>;

  updateConnectedAccountInfor(request: UpdateConnectedAccountInforRequest): Observable<DonationReceiver>;
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
}

export function DonationReceiverRepositoryServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findOneByUser",
      "findOneByUid",
      "findOneNotVerified",
      "findAllVerified",
      "create",
      "updateProfile",
      "updateConnectedAccountInfor",
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
