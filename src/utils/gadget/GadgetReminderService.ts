
/**
 * Service for scheduling payday reminders via Gadget.dev
 */
import { toast } from "@/hooks/use-toast";
import { gadgetEnvironment } from "../GadgetEnvironmentService";

export class GadgetReminderService {
  /**
   * Schedule reminders for a customer based on their payday schedule
   */
  public static async schedulePaydayReminders(
    customerId: string, 
    productIds: string[]
  ): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/customers/${customerId}/reminders/schedule-batch`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          productIds
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to schedule reminders');
      }
      
      toast({
        title: "Success",
        description: `Scheduled reminders for ${productIds.length} products`,
      });
      
      return true;
    } catch (error) {
      console.error("Error scheduling payday reminders:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule reminders",
        variant: "destructive"
      });
      
      return false;
    }
  }
}
