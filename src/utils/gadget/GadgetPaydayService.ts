
/**
 * Enhanced service for managing customer payday information via Gadget.dev
 * 
 * This service implements the latest Gadget.dev features including:
 * - Type-Safe Route Parameters
 * - Environment Variable Groups
 * - Enhanced Shopify Connection
 */
import { PaydayData, PaydayRouteParams } from "./PaydayTypes";
import { GadgetPaydayFetchService } from "./GadgetPaydayFetchService";
import { GadgetPaydayUpdateService } from "./GadgetPaydayUpdateService";
import { GadgetShopifyService } from "./GadgetShopifyService";
import { GadgetReminderService } from "./GadgetReminderService";

/**
 * Service for managing customer payday information via Gadget.dev
 * Acts as a facade for more specialized services
 */
export class GadgetPaydayService {
  /**
   * Get payday information for a specific customer
   */
  public static async getCustomerPaydayInfo(params: PaydayRouteParams): Promise<PaydayData | null> {
    return GadgetPaydayFetchService.getCustomerPaydayInfo(params);
  }
  
  /**
   * Update payday information for a specific customer
   */
  public static async updateCustomerPaydayInfo(paydayData: PaydayData): Promise<boolean> {
    return GadgetPaydayUpdateService.updateCustomerPaydayInfo(paydayData);
  }
  
  /**
   * Create a Shopify customer segment based on payday date
   */
  public static async createPaydaySegment(paydayDate: number): Promise<string | null> {
    return GadgetShopifyService.createPaydaySegment(paydayDate);
  }
  
  /**
   * Tag a customer with their payday date in Shopify
   */
  public static async tagCustomerWithPayday(customerId: string, paydayDate: number): Promise<boolean> {
    return GadgetShopifyService.tagCustomerWithPayday(customerId, paydayDate);
  }
  
  /**
   * Schedule reminders for a customer based on their payday schedule
   */
  public static async schedulePaydayReminders(
    customerId: string, 
    productIds: string[]
  ): Promise<boolean> {
    return GadgetReminderService.schedulePaydayReminders(customerId, productIds);
  }
}
