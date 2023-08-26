/* eslint-disable */
import { DonationReceiver } from "./donationReceiver";

export const protobufPackage = "user";

export interface Email {
  email: string;
}

export interface Id {
  uid: string;
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

export const USER_PACKAGE_NAME = "user";
