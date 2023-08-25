/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface UserId {
  userId: number;
}

export interface DonationReceivers {
  donationReceivers: DonationReceiver[];
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
  findOneByUser(request: UserId): Observable<DonationReceiver>;
}

export interface UsersServiceController {
  findOneByUser(request: UserId): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOneByUser"];
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
