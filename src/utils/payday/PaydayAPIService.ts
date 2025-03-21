
import { toast } from "@/hooks/use-toast";
import { GadgetEnvironmentService } from "../GadgetEnvironmentService";

/**
 * Service for interacting with payday-related APIs via Gadget.dev
 */
export class PaydayAPIService {
  private static readonly BASE_API_ENDPOINT = '/api/shopify/customer/payday';
  
  /**
   * Gets the environment-specific API endpoint
   * @returns The full API endpoint URL for the current environment
   */
  private static getApiEndpoint(): string {
    const environmentService = GadgetEnvironmentService.getInstance();
    return `${environmentService.getApiBaseUrl()}${this.BASE_API_ENDPOINT}`;
  }
  
  /**
   * Synchronizes a customer's payday date with Shopify customer metafields via Gadget.dev
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
      
      const environmentService = GadgetEnvironmentService.getInstance();
      const endpoint = this.getApiEndpoint();
      
      // Support environment-specific behavior for debugging
      if (environmentService.isFeatureEnabled('mockPaydayData') && 
          environmentService.getEnvironment() !== 'production') {
        console.log('Using mock payday data in non-production environment');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        toast({
          title: "Payday data updated (test mode)",
          description: `Updated payday details (day: ${paydayDate}, frequency: ${paydayFrequency}) for customer`
        });
        
        return true;
      }
      
      // In a production implementation using Gadget.dev, we would use fetch or a Gadget client
      // to make the API call to update the customer's metafields with payday information
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GADGET_API_KEY}`
        },
        body: JSON.stringify({
          customerId,
          paydayDate,
          paydayFrequency
        })
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Success notification
      toast({
        title: "Payday data updated",
        description: `Updated payday details (day: ${paydayDate}, frequency: ${paydayFrequency}) for customer`
      });
      
      return result.success;
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
   * Retrieves a customer's payday information from Gadget.dev
   * @param customerId The Shopify customer ID
   * @returns Promise resolving to customer payday information
   */
  public static async getCustomerPaydayData(
    customerId: string
  ): Promise<{ paydayDate: number; paydayFrequency: 'monthly' | 'biweekly' | 'weekly' } | null> {
    try {
      const environmentService = GadgetEnvironmentService.getInstance();
      const endpoint = `${this.getApiEndpoint()}/${customerId}`;
      
      // Support environment-specific behavior for debugging
      if (environmentService.isFeatureEnabled('mockPaydayData') && 
          environmentService.getEnvironment() !== 'production') {
        console.log('Using mock payday data in non-production environment');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        return {
          paydayDate: 15,
          paydayFrequency: 'monthly'
        };
      }
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.GADGET_API_KEY}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Customer payday data not found
        }
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error retrieving customer payday data:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return null;
    }
  }
}
