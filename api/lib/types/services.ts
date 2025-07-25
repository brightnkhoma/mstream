import { Content, PaymentMethod, Transaction } from "./types";

export interface StreamingService {
  startStream(userId: string, contentId: string): Promise<StreamResponse>;
  stopStream(sessionId: string): Promise<void>;
  adjustQuality(sessionId: string, quality: "low" | "medium" | "high"): Promise<void>;
  trackWatchTime(sessionId: string, secondsWatched: number): Promise<void>;
}

export interface StreamResponse {
  streamUrl: string;
  sessionId: string;
  expiresAt: Date;
}

export interface DownloadService {
  initiateDownload(userId: string, contentId: string): Promise<DownloadResponse>;
  verifyLicense(userId: string, contentId: string): Promise<boolean>;
  trackDownloadCount(contentId: string): Promise<void>;
}

export interface DownloadResponse {
  downloadUrl: string;
  expiresAt: Date;
  fileSize: number; 
}

export interface PaymentService {
  processPayment(
    userId: string,
    amount: number,
    method: PaymentMethod
  ): Promise<Transaction>;
  issueRefund(transactionId: string): Promise<void>;
  manageSubscriptions(userId: string, plan: "monthly" | "yearly"): Promise<void>;
}

export interface RecommendationEngine {
  suggestContent(userId: string, limit?: number): Promise<Content[]>;
  personalizeFeed(userId: string): Promise<Content[]>;
}