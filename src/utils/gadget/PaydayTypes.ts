
/**
 * Type definitions for payday-related operations
 */

export interface PaydayData {
  customerId: string;
  paydayDate: number; // 1-31 for day of month
  paydayFrequency: 'weekly' | 'biweekly' | 'monthly';
  confidenceScore?: number;
  lastUpdated?: string;
}

export interface PaydayRouteParams {
  customerId: string;
  includeHistory?: boolean;
  includeConfidence?: boolean;
}
