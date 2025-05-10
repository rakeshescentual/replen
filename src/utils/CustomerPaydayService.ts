import { PaydayService } from "./payday/PaydayService";
import { PaydayPattern } from "./payday/PaydayTypes";
import { GadgetMCPIntegration } from "./gadget/GadgetMCPIntegration";

/**
 * Service for managing customer payday data
 * Acts as a facade to coordinate between the specialized payday services
 * 
 * Updated to support MCP Server integration for the Shopify Dev Assistant
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
    const result = await PaydayService.updateCustomerPaydayData(customerId, paydayDate, paydayFrequency);
    
    // When successful, also submit this data to the MCP Server for AI training
    if (result) {
      try {
        await GadgetMCPIntegration.submitPaydayPatternData(customerId, {
          paydayDate,
          paydayFrequency,
          confidenceScore: 100 // Direct customer input has 100% confidence
        });
      } catch (err) {
        // Don't fail the operation if MCP integration fails
        console.warn("Failed to submit payday data to MCP Server:", err);
      }
    }
    
    return result;
  }
  
  /**
   * Retrieves a customer's payday information
   * @param customerId The Shopify customer ID
   * @returns Promise resolving to customer payday data or null if not found
   */
  public static async getCustomerPaydayData(
    customerId: string
  ): Promise<{ paydayDate: number; paydayFrequency: 'monthly' | 'biweekly' | 'weekly' } | null> {
    return PaydayService.getCustomerPaydayData(customerId);
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
    return PaydayService.calculateNextPayday(currentPaydayDate, paydayFrequency);
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
    return PaydayService.calculateOptimalReminderDate({
      paydayDate,
      paydayFrequency,
      productRunOutDate
    });
  }
  
  /**
   * Identifies customer payday patterns from purchase history
   * @param purchaseDates Array of past purchase dates
   * @returns Detected payday information or null if pattern unclear
   */
  public static detectPaydayPattern(
    purchaseDates: Date[]
  ): PaydayPattern | null {
    const pattern = PaydayService.detectPaydayPattern(purchaseDates);
    
    // If a pattern was detected successfully, submit to MCP Server for learning
    if (pattern && pattern.confidenceScore > 60) {
      try {
        // We don't await this to keep the function synchronous
        GadgetMCPIntegration.submitPaydayPatternData("anonymous", pattern)
          .catch(err => console.warn("Failed to submit anonymous pattern data to MCP:", err));
      } catch (err) {
        console.warn("Error preparing MCP data submission:", err);
      }
    }
    
    return pattern;
  }
  
  /**
   * Schedules reminders for a customer based on their payday pattern
   * @param customerId The Shopify customer ID
   * @param productIds Array of product IDs to schedule reminders for
   * @param paydayDate Customer's payday date (1-31)
   * @param paydayFrequency Customer's payday frequency
   * @returns Promise resolving to success status
   */
  public static async schedulePaydayReminders(
    customerId: string,
    productIds: string[],
    paydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly'
  ): Promise<boolean> {
    return PaydayService.scheduleBatchReminders(
      customerId,
      productIds,
      paydayDate,
      paydayFrequency
    );
  }
  
  /**
   * Processes a natural language query about payday patterns using MCP Server
   * @param query The query string
   * @param customerId Optional customer ID to provide context
   * @returns Promise resolving to the AI response
   */
  public static async askPaydayQuestion(
    query: string,
    customerId?: string
  ): Promise<{ answer: string; confidence: number }> {
    try {
      // Get customer data if available to provide context
      let context: Record<string, any> = {};
      
      if (customerId) {
        const paydayData = await this.getCustomerPaydayData(customerId);
        if (paydayData) {
          context.paydayInfo = paydayData;
          
          // Calculate next payday for additional context
          const nextPayday = this.calculateNextPayday(
            paydayData.paydayDate,
            paydayData.paydayFrequency
          );
          context.nextPayday = nextPayday.toISOString();
        }
      }
      
      // Send the query to MCP Server
      const response = await GadgetMCPIntegration.processQuery({
        query,
        customerId,
        context
      });
      
      return {
        answer: response.answer,
        confidence: response.confidence
      };
    } catch (error) {
      console.error("Error processing payday query:", error);
      return {
        answer: "I'm sorry, but I encountered an error processing your question about payday patterns.",
        confidence: 0
      };
    }
  }
}
