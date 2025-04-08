
/**
 * Type definitions for payday-related operations in the payday directory
 */

export interface PaydayPattern {
  paydayDate: number;
  paydayFrequency: 'weekly' | 'biweekly' | 'monthly';
  confidenceScore: number;
}

export interface PaydayInfo {
  paydayDate: number;
  paydayFrequency: 'weekly' | 'biweekly' | 'monthly';
}

export interface OptimalReminderParams {
  paydayDate: number;
  paydayFrequency: 'weekly' | 'biweekly' | 'monthly';
  productRunOutDate: Date;
}
