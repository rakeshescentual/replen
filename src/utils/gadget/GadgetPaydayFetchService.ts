
/**
 * Service for fetching payday information via Gadget.dev
 */
import { gadgetEnvironment } from "../GadgetEnvironmentService";
import { PaydayData, PaydayRouteParams } from "./PaydayTypes";

export class GadgetPaydayFetchService {
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
}
