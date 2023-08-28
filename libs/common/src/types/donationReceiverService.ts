/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  CompleteOnboardingRequest,
  CompleteOnboardingResponse,
  CreateDonationReceiverRequest,
  DonationReceiver,
  UpdateProfileRequest,
  VerifyRequest,
  VerifyResponse,
} from "./donationReceiver";

export const protobufPackage = "donationReceiverService";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  dob: string;
  address: string;
  stripeCustomerId: string;
  avatarUrl: string;
  email: string;
  password: string;
}

export interface CreateDonationRequest {
  message: string;
  value: number;
  donationReceiverUid: string;
  user: User | undefined;
}

export interface Donation {
  message: string;
  value: number;
  uid: string;
  userUid: string;
  donationReceiverUid: string;
}

export const DONATION_RECEIVER_SERVICE_PACKAGE_NAME = "donationReceiverService";

export interface DonationReceiversServiceClient {
  create(request: CreateDonationReceiverRequest): Observable<DonationReceiver>;

  verify(request: VerifyRequest): Observable<VerifyResponse>;

  completeOnboarding(request: CompleteOnboardingRequest): Observable<CompleteOnboardingResponse>;

  updateProfile(request: UpdateProfileRequest): Observable<DonationReceiver>;
}

export interface DonationReceiversServiceController {
  create(
    request: CreateDonationReceiverRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;

  verify(request: VerifyRequest): Promise<VerifyResponse> | Observable<VerifyResponse> | VerifyResponse;

  completeOnboarding(
    request: CompleteOnboardingRequest,
  ): Promise<CompleteOnboardingResponse> | Observable<CompleteOnboardingResponse> | CompleteOnboardingResponse;

  updateProfile(
    request: UpdateProfileRequest,
  ): Promise<DonationReceiver> | Observable<DonationReceiver> | DonationReceiver;
}

export function DonationReceiversServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "verify", "completeOnboarding", "updateProfile"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DonationReceiversService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DonationReceiversService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DONATION_RECEIVERS_SERVICE_NAME = "DonationReceiversService";

export interface DonationsServiceClient {
  createDonation(request: CreateDonationRequest): Observable<Donation>;
}

export interface DonationsServiceController {
  createDonation(request: CreateDonationRequest): Promise<Donation> | Observable<Donation> | Donation;
}

export function DonationsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createDonation"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("DonationsService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("DonationsService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const DONATIONS_SERVICE_NAME = "DonationsService";
