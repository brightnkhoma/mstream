export enum AccountType {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
  FAMILY = "FAMILY",
}

export enum ContentType {
  MOVIE = "MOVIE",
  MUSIC_TRACK = "MUSIC_TRACK",
  MUSIC_ALBUM = "MUSIC_ALBUM",
}

export enum LicenseType {
  STREAM_ONLY = "STREAM_ONLY",
  DOWNLOADABLE = "DOWNLOADABLE",
  PURCHASABLE = "PURCHASABLE",
}

export enum TransactionType {
  STREAMING_ACCESS = "STREAMING_ACCESS",
  DOWNLOAD_PURCHASE = "DOWNLOAD_PURCHASE",
  OWNERSHIP_PURCHASE = "OWNERSHIP_PURCHASE",
  SUBSCRIPTION_FEE = "SUBSCRIPTION_FEE",
}

export interface User {
  userId: string;
  name: string;
  email: string;
  joinDate: Date;
  accountType: AccountType;
  paymentMethods: PaymentMethod[];
  library: Library;
}

export interface Content {
  contentId: string;
  title: string;
  description: string;
  releaseDate: Date;
  genres: string[];
  type: ContentType;
  license: License;
  pricing: Pricing;
}

export interface Movie extends Content {
  director: string;
  cast: string[];
  duration: number; // in seconds
  rating: string; // "PG-13", "R", etc.
}

export interface Music extends Content {
  artists: string[];
  album: string;
  duration: number; // in seconds
  trackNumber?: number; // optional for single tracks
}

export interface License {
  licenseId: string;
  type: LicenseType;
  terms: string;
  allowsStreaming: boolean;
  allowsDownload: boolean;
  allowsPurchase: boolean;
}

export interface Transaction {
  transactionId: string;
  user: User | string; // Can be a reference (ID) or populated object
  content: Content | string;
  transactionDate: Date;
  type: TransactionType;
  amount: number;
  paymentMethod: string;
}

export interface Library {
  libraryId: string;
  owner: User | string;
  purchasedContent: Content[] | string[]; 
  downloadedContent: Content[] | string[];
}

export interface Pricing {
  basePrice: number;
  rentalPrice?: number;
  subscriptionDiscount?: number;
  currency: string; 
}

export interface PaymentMethod {
  methodId: string;
  type: "credit_card" | "paypal" | "crypto";
  details: Record<string, unknown>; 
}


export interface ContentFile{
  uri : string,
  size : number;
  duration : string,
  id : string,
  ownerId : string
}


export interface LikedContent{
  id : string,
  date : Date,
  type : ContentType;
  name : string;
  thumbNail ? : string
}

export interface PurchasedContent extends LikedContent{
  txnId : string
}