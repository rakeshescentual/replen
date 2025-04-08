
/**
 * Service for Shopify-related operations via Gadget.dev
 */
import { toast } from "@/hooks/use-toast";
import { gadgetEnvironment } from "../GadgetEnvironmentService";

export class GadgetShopifyService {
  /**
   * Create a Shopify customer segment based on payday date
   */
  public static async createPaydaySegment(paydayDate: number): Promise<string | null> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/shopify/customer-segments`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          name: `Payday ${paydayDate} Customers`,
          query: `tag:payday-${paydayDate}`,
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create customer segment');
      }
      
      const data = await response.json();
      
      toast({
        title: "Success",
        description: `Created customer segment for payday ${paydayDate}`,
      });
      
      return data.customerSegment.id;
    } catch (error) {
      console.error("Error creating payday segment:", error);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create customer segment",
        variant: "destructive"
      });
      
      return null;
    }
  }
  
  /**
   * Tag a customer with their payday date in Shopify
   */
  public static async tagCustomerWithPayday(customerId: string, paydayDate: number): Promise<boolean> {
    try {
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/shopify/customers/${customerId}/tags`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        body: JSON.stringify({
          tags: [`payday-${paydayDate}`]
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to tag customer');
      }
      
      return true;
    } catch (error) {
      console.error("Error tagging customer with payday:", error);
      
      if (gadgetEnvironment.isLoggingEnabled()) {
        console.error("API error details:", error);
      }
      
      return false;
    }
  }
}
