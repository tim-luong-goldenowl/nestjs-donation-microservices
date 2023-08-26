/* eslint-disable */

export const protobufPackage = "donationReceiver";

export interface CreateDonationReceiverRequest {
  uid: string;
}

export interface FindAllVerifiedRequest {
  currentUserUid: string;
}

export interface FindOneByUserRequest {
  uid: string;
}

export interface FindOneByUidRequest {
  uid: string;
}

export interface DonationReceivers {
  donationReceivers: DonationReceiver[];
}

export interface DonationReceiver {
  uid: string;
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

export interface FindOneDrResponse {
  found: boolean;
  donationReceiver: DonationReceiver | undefined;
}

export interface VerifyRequest {
  donationReceiverUid: string;
}

export interface VerifyResponse {
  onboardingLink: string;
}

export interface CompleteOnboardingRequest {
  token: string;
}

export interface CompleteOnboardingResponse {
  success: boolean;
}

export interface UpdateProfileRequest {
  email: string;
  businessName: string;
  companyName: string;
  country: string;
  bio: string;
  avatarUrl: string;
  uid: string;
  avatar: FileObject | undefined;
}

export interface FileObject {
  mimetype: string;
  buffer: Uint8Array;
}

export interface UpdateConnectedAccountInforRequest {
  onboardingCompleteToken: string;
  stripeConnectedAccountId: string;
  uid: string;
}

export const DONATION_RECEIVER_PACKAGE_NAME = "donationReceiver";
