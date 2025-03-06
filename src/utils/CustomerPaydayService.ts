
import { toast } from "@/hooks/use-toast";

/**
 * Service for managing customer payday data
 */
export class CustomerPaydayService {
  private static readonly API_ENDPOINT = '/api/shopify/customer/payday';
  
  /**
   * Synchronizes a customer's payday date with Shopify customer metafields
   * @param customerId The Shopify customer ID
   * @param paydayDate Day of month (1-31)
   * @param paydayFrequency Payment frequency (monthly, biweekly, weekly)
   * @returns Promise resolving to success status
   */
  public static async syncCustomerPaydayData(
    customerId: string,
    paydayDate: number, // Day of month (1-31)
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
  ): Promise<boolean> {
    try {
      console.log(`Syncing customer payday data for customer ${customerId}`);
      
      // In a production implementation, this would call the Shopify Admin API
      // to update the customer's metafields with payday information
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Success notification
      toast({
        title: "Payday data updated",
        description: `Updated payday details (day: ${paydayDate}, frequency: ${paydayFrequency}) for customer`
      });
      
      return true;
    } catch (error) {
      console.error("Error syncing customer payday data:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Calculates the next payday date for a customer
   * @param currentPaydayDate Day of month (1-31)
   * @param paydayFrequency Payment frequency
   * @returns Date object representing the next payday
   */
  public static calculateNextPayday(
    currentPaydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
  ): Date {
    const today = new Date();
    let nextPayday = new Date();
    
    switch (paydayFrequency) {
      case 'monthly':
        // Set to this month's payday
        nextPayday.setDate(currentPaydayDate);
        // If today is past this month's payday, move to next month
        if (today.getDate() >= currentPaydayDate) {
          nextPayday.setMonth(nextPayday.getMonth() + 1);
        }
        break;
        
      case 'biweekly':
        // Biweekly logic - assume paydayDate is last payday
        const lastPayday = new Date();
        lastPayday.setDate(currentPaydayDate);
        // Add 14 days for next payday
        nextPayday = new Date(lastPayday.getTime() + 14 * 24 * 60 * 60 * 1000);
        break;
        
      case 'weekly':
        // Weekly logic - add 7 days from the payday date
        const weeklyLastPayday = new Date();
        weeklyLastPayday.setDate(currentPaydayDate);
        // Add 7 days for next payday
        nextPayday = new Date(weeklyLastPayday.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
    }
    
    return nextPayday;
  }
  
  /**
   * Calculates the optimal reminder date based on payday and product lifespan
   * @param paydayDate Customer's payday date
   * @param paydayFrequency Payment frequency
   * @param productRunOutDate Predicted date when product will run out
   * @returns Date when reminder should be sent
   */
  public static calculateOptimalReminderDate(
    paydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly',
    productRunOutDate: Date
  ): Date {
    // Get the next payday
    const nextPayday = this.calculateNextPayday(paydayDate, paydayFrequency);
    
    // Determine if next payday is before or after run-out date
    if (nextPayday < productRunOutDate) {
      // If next payday is before run-out, send reminder slightly after payday
      // (2 days after payday when they have money)
      return new Date(nextPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
    } else {
      // If next payday is after run-out, we need the previous payday
      // Calculate backwards based on frequency
      let daysBefore = 0;
      switch (paydayFrequency) {
        case 'monthly':
          // Go back approximately one month
          const prevMonthPayday = new Date(nextPayday);
          prevMonthPayday.setMonth(prevMonthPayday.getMonth() - 1);
          return new Date(prevMonthPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
        case 'biweekly':
          daysBefore = 14;
          break;
        case 'weekly':
          daysBefore = 7;
          break;
      }
      
      // Calculate previous payday + 2 days
      const previousPayday = new Date(nextPayday.getTime() - daysBefore * 24 * 60 * 60 * 1000);
      return new Date(previousPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
    }
  }
  
  /**
   * Identifies customer payday patterns from purchase history
   * @param purchaseDates Array of past purchase dates
   * @returns Detected payday information or null if pattern unclear
   */
  public static detectPaydayPattern(
    purchaseDates: Date[]
  ): { 
    paydayDate: number; 
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly';
    confidenceScore: number;
  } | null {
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
