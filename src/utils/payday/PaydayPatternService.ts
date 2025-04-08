
/**
 * Service for detecting payday patterns from customer data
 */
import { PaydayPattern } from './PaydayTypes';

export class PaydayPatternService {
  /**
   * Identifies customer payday patterns from purchase history
   * @param purchaseDates Array of past purchase dates
   * @returns Detected payday information or null if pattern unclear
   */
  public static detectPaydayPattern(
    purchaseDates: Date[]
  ): PaydayPattern | null {
    if (purchaseDates.length < 3) {
      return null; // Not enough data
    }
    
    // Sort dates chronologically
    const sortedDates = [...purchaseDates].sort((a, b) => a.getTime() - b.getTime());
    
    // Count occurrences of each day of month
    const dayFrequency: Record<number, number> = {};
    sortedDates.forEach(date => {
      const day = date.getDate();
      dayFrequency[day] = (dayFrequency[day] || 0) + 1;
    });
    
    // Find most common day of month
    let mostCommonDay = 1;
    let maxFrequency = 0;
    
    for (const [day, frequency] of Object.entries(dayFrequency)) {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mostCommonDay = parseInt(day);
      }
    }
    
    // Calculate intervals between purchases
    const intervals: number[] = [];
    for (let i = 1; i < sortedDates.length; i++) {
      const daysDiff = Math.round(
        (sortedDates[i].getTime() - sortedDates[i-1].getTime()) / (24 * 60 * 60 * 1000)
      );
      intervals.push(daysDiff);
    }
    
    // Determine frequency based on average interval
    const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    
    let frequency: 'monthly' | 'biweekly' | 'weekly';
    if (avgInterval > 21) {
      frequency = 'monthly';
    } else if (avgInterval > 10) {
      frequency = 'biweekly';
    } else {
      frequency = 'weekly';
    }
    
    // Calculate confidence score (0-100)
    // Higher score for more consistent patterns
    const consistencyScore = maxFrequency / sortedDates.length * 100;
    
    // Adjust for interval consistency
    const intervalDeviation = intervals.map(i => Math.abs(i - avgInterval)).reduce((sum, val) => sum + val, 0) / intervals.length;
    const intervalConsistency = Math.max(0, 100 - intervalDeviation * 5);
    
    const confidenceScore = Math.round((consistencyScore + intervalConsistency) / 2);
    
    return {
      paydayDate: mostCommonDay,
      paydayFrequency: frequency,
      confidenceScore
    };
  }
}
