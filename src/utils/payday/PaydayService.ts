
/**
 * Facade service for coordinating all payday-related functionality
 */
import { PaydayAPIService } from "./PaydayAPIService";
import { PaydayCalculationService } from "./PaydayCalculationService";
import { PaydayPatternService } from "./PaydayPatternService";
import { PaydayReminderService } from "./PaydayReminderService";
import { PaydayInfo, PaydayPattern, OptimalReminderParams } from "./PaydayTypes";

export class PaydayService {
  /**
   * Retrieves a customer's payday information
   */
  public static async getCustomerPaydayData(customerId: string): Promise<PaydayInfo | null> {
    return PaydayAPIService.getCustomerPaydayData(customerId);
  }
  
  /**
   * Updates a customer's payday information
   */
  public static async updateCustomerPaydayData(
    customerId: string,
    paydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly'
  ): Promise<boolean> {
    return PaydayAPIService.syncCustomerPaydayData(customerId, paydayDate, paydayFrequency);
  }
  
  /**
   * Detects a customer's payday pattern from purchase history
   */
  public static detectPaydayPattern(purchaseDates: Date[]): PaydayPattern | null {
    return PaydayPatternService.detectPaydayPattern(purchaseDates);
  }
  
  /**
   * Calculates the next payday date
   */
  public static calculateNextPayday(
    paydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly'
  ): Date {
    return PaydayCalculationService.calculateNextPayday(paydayDate, paydayFrequency);
  }
  
  /**
   * Calculates the optimal reminder date
   */
  public static calculateOptimalReminderDate(params: OptimalReminderParams): Date {
    return PaydayCalculationService.calculateOptimalReminderDate(params);
  }
  
  /**
   * Schedules a reminder for a customer
   */
  public static async scheduleReminder(
    customerId: string,
    productId: string,
    paydayDate: number,
    paydayFrequency: 'weekly' | 'biweekly' | 'monthly',
    productRunOutDate: Date
  ): Promise<boolean> {
    return PaydayReminderService.scheduleReminderForCustomer(
      customerId,
      productId,
      paydayDate,
      paydayFrequency,
      productRunOutDate
    );
  }
  
  /**
   * Schedules multiple reminders for a customer
   */
  public static async scheduleBatchReminders(
    customerId: string,
    productIds: string[],
    paydayDate: number,
    paydayFrequency: 'weekly' | 'biweekly' | 'monthly'
  ): Promise<boolean> {
    return PaydayReminderService.scheduleBatchReminders(
      customerId,
      productIds,
      paydayDate,
      paydayFrequency
    );
  }
}
