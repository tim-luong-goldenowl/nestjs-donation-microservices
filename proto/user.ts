/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface Email {
  email: string;
}

export interface Id {
  id: number;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserProfiles {
  user: User | undefined;
  donationReceiver: DonationReceiver | undefined;
}

export interface Empty {
}

export interface Users {
  users: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  stripeCustomerId: string;
  avatarUrl: string;
  email: string;
  password: string;
}

export interface DonationReceiver {
  id: number;
  email: string;
  businessName: string;
  companyName: string;
  country: string;
  bio: string;
  onboardingCompleteToken: string;
  avatarUrl: string;
  verified: boolean;
  stripeConnectedAccountId: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UsersServiceClient {
  findAllUsers(request: Empty): Observable<Users>;

  createUser(request: CreateUserDto): Observable<User>;

  findOneByEmail(request: Email): Observable<User>;

  findOneById(request: Id): Observable<User>;

  getProfiles(request: Id): Observable<UserProfiles>;
}

export interface UsersServiceController {
  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findOneByEmail(request: Email): Promise<User> | Observable<User> | User;

  findOneById(request: Id): Promise<User> | Observable<User> | User;

  getProfiles(request: Id): Promise<UserProfiles> | Observable<UserProfiles> | UserProfiles;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAllUsers", "createUser", "findOneByEmail", "findOneById", "getProfiles"];
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
