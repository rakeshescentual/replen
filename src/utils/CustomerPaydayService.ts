
import { PaydayAPIService } from "./payday/PaydayAPIService";
import { PaydayCalculationService } from "./payday/PaydayCalculationService";
import { PaydayPatternService } from "./payday/PaydayPatternService";

/**
 * Service for managing customer payday data
 * Acts as a facade to coordinate between the specialized payday services
 */
export class CustomerPaydayService {
  /**
   * Synchronizes a customer's payday date with Shopify customer metafields
   * @param customerId The Shopify customer ID
   * @param paydayDate Day of month (1-31)
   * @param paydayFrequency Payment frequency (monthly, biweekly, weekly)
   * @returns Promise resolving to success status
   */
  public static async syncCustomerPaydayData(
    customerId: string,
    paydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
  ): Promise<boolean> {
    return PaydayAPIService.syncCustomerPaydayData(customerId, paydayDate, paydayFrequency);
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
    return PaydayCalculationService.calculateNextPayday(currentPaydayDate, paydayFrequency);
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
    return PaydayCalculationService.calculateOptimalReminderDate(paydayDate, paydayFrequency, productRunOutDate);
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
    return PaydayPatternService.detectPaydayPattern(purchaseDates);
  }
}
