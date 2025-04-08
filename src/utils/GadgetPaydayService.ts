
/**
 * Enhanced service for managing customer payday information via Gadget.dev
 * 
 * This service implements the latest Gadget.dev features including:
 * - Type-Safe Route Parameters
 * - Environment Variable Groups
 * - Enhanced Shopify Connection
 */
import { toast } from "@/hooks/use-toast";
import { gadgetEnvironment } from "@/utils/GadgetEnvironmentService";

export interface PaydayData {
  customerId: string;
  paydayDate: number; // 1-31 for day of month
  paydayFrequency: 'weekly' | 'biweekly' | 'monthly';
  confidenceScore?: number;
  lastUpdated?: string;
}

export interface PaydayRouteParams {
  customerId: string;
  includeHistory?: boolean;
  includeConfidence?: boolean;
}

/**
 * Service for managing customer payday information via Gadget.dev
 */
export class GadgetPaydayService {
  /**
   * Get payday information for a specific customer
   */
  public static async getCustomerPaydayInfo(params: PaydayRouteParams): Promise<PaydayData | null> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.includeHistory !== undefined) {
        queryParams.append('includeHistory', params.includeHistory.toString());
      }
      
      if (params.includeConfidence !== undefined) {
        queryParams.append('includeConfidence', params.includeConfidence.toString());
      }
      
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const endpoint = `${gadgetEnvironment.getApiBaseUrl()}/customers/${params.customerId}/payday${queryString}`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch payday information');
      }
      
      const data = await response.json();
      return data.paydayInfo;
    } catch (error) {
      console.error("Error fetching customer payday information:", error);
      
      if (gadgetEnvironment.isLoggingEnabled()) {
        console.error("API error details:", error);
      }
      
      return null;
    }
  }
  
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
