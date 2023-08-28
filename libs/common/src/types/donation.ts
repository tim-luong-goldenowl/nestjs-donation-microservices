/* eslint-disable */
import { User } from "./user";

export const protobufPackage = "donation";

export interface GetDonationCountByDrIdRequest {
  donationReceiverUid: string;
}

export interface GetDonationCountByDrIdResponse {
  count: number;
}

export interface CreateDonationRequest {
  message: string;
  value: number;
  donationReceiverUid: string;
  /** donationReceiver.DonationReceiver donationReceiver = 3; */
  user: User | undefined;
}

export interface CreateDonationResponse {
  success: boolean;
  donation: Donation | undefined;
}

export interface Donation {
  message: string;
  value: number;
  uid: string;
  userUid: string;
  donationReceiverUid: string;
}

export const DONATION_PACKAGE_NAME = "donation";
