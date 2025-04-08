
/**
 * Service for updating payday information via Gadget.dev
 */
import { toast } from "@/hooks/use-toast";
import { gadgetEnvironment } from "../GadgetEnvironmentService";
import { PaydayData } from "./PaydayTypes";

export class GadgetPaydayUpdateService {
  /**
   * Update payday information for a specific customer
   */
  public static async updateCustomerPaydayInfo(paydayData: PaydayData): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/customers/${paydayData.customerId}/payday`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          paydayDate: paydayData.paydayDate,
          paydayFrequency: paydayData.paydayFrequency
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update payday information');
      }
      
      toast({
        title: "Success",
        description: "Payday information updated successfully",
      });
      
      return true;
    } catch (error) {
      console.error("Error updating customer payday information:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update payday information",
        variant: "destructive"
      });
      
      return false;
    }
  }
}
