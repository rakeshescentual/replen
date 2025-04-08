
/**
 * Service for managing customer payday reminders
 */
import { toast } from "@/hooks/use-toast";
import { GadgetEnvironmentService } from "../GadgetEnvironmentService";
import { PaydayCalculationService } from "./PaydayCalculationService";

export class PaydayReminderService {
  /**
   * Schedules a reminder for a customer based on their payday and product information
   */
  public static async scheduleReminderForCustomer(
    customerId: string,
    productId: string,
    paydayDate: number,
    paydayFrequency: 'weekly' | 'biweekly' | 'monthly',
    productRunOutDate: Date
  ): Promise<boolean> {
    try {
      // Calculate the optimal time to send the reminder
      const reminderDate = PaydayCalculationService.calculateOptimalReminderDate({
        paydayDate,
        paydayFrequency,
        productRunOutDate
      });
      
      // Format the date for display
      const formattedDate = reminderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // For testing in non-production environments
      const environmentService = GadgetEnvironmentService.getInstance();
      if (environmentService.isFeatureEnabled('mockReminderData') && 
          environmentService.getEnvironment() !== 'production') {
        console.log(`[TEST MODE] Scheduled reminder for ${formattedDate}`);
        
        toast({
          title: "Reminder scheduled (test mode)",
          description: `Reminder scheduled for ${formattedDate}`
        });
        
        return true;
      }
      
      // In production, call the API to schedule the reminder
      const endpoint = `${environmentService.getApiBaseUrl()}/api/reminders/schedule`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GADGET_API_KEY}`
        },
        body: JSON.stringify({
          customerId,
          productId,
          reminderDate: reminderDate.toISOString(),
          paydayDate,
          paydayFrequency
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      toast({
        title: "Reminder scheduled",
        description: `Reminder scheduled for ${formattedDate}`
      });
      
      return true;
    } catch (error) {
      console.error("Error scheduling reminder:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule reminder",
        variant: "destructive"
      });
      
      return false;
    }
  }
  
  /**
   * Schedules multiple reminders for a customer based on product IDs
   */
  public static async scheduleBatchReminders(
    customerId: string,
    productIds: string[],
    paydayDate: number,
    paydayFrequency: 'weekly' | 'biweekly' | 'monthly'
  ): Promise<boolean> {
    try {
      if (!productIds.length) {
        toast({
          title: "No products selected",
          description: "Please select at least one product for reminders",
          variant: "destructive"
        });
        return false;
      }
      
      // In a real implementation, we would fetch product information
      // to determine run-out dates for each product
      
      // For simplicity, we'll use a mock run-out date (30 days from now)
      const mockRunOutDate = new Date();
      mockRunOutDate.setDate(mockRunOutDate.getDate() + 30);
      
      // Call our API to schedule batch reminders
      const environmentService = GadgetEnvironmentService.getInstance();
      const endpoint = `${environmentService.getApiBaseUrl()}/api/reminders/batch`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GADGET_API_KEY}`
        },
        body: JSON.stringify({
          customerId,
          productIds,
          paydayDate,
          paydayFrequency
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      toast({
        title: "Success",
        description: `Scheduled reminders for ${productIds.length} products`,
      });
      
      return true;
    } catch (error) {
      console.error("Error scheduling batch reminders:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule reminders",
        variant: "destructive"
      });
      
      return false;
    }
  }
}
