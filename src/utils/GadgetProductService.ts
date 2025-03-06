
import { toast } from "@/hooks/use-toast";

export interface GadgetProductMetafields {
  average_lifespan: number;
  cost_per_day: number;
  value_score?: number;
  cost_efficiency?: number;
  customer_satisfaction?: number;
  sentiment_score?: number;
  repurchase_rate?: number;
}

export interface GadgetSyncOptions {
  includeAnalytics?: boolean;
  syncWithKlaviyo?: boolean;
}

/**
 * Service class for interacting with Gadget.dev to manage product data
 */
export class GadgetProductService {
  private static readonly API_ENDPOINT = 'https://api.gadget.dev/replenish-reminder';
  private static readonly API_KEY = process.env.GADGET_API_KEY || '';

  /**
   * Sync product data to Gadget.dev
   */
  public static async syncProductData(params: {
    productId: string;
    metafields: GadgetProductMetafields;
    options?: GadgetSyncOptions;
  }): Promise<boolean> {
    try {
      console.log(`Syncing product data to Gadget.dev for product ID: ${params.productId}`);
      
      // In a real implementation, this would call the Gadget.dev API
      // const response = await fetch(`${this.API_ENDPOINT}/products/${params.productId}/sync`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${this.API_KEY}`
      //   },
      //   body: JSON.stringify({
      //     metafields: params.metafields,
      //     ...params.options
      //   }),
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to sync product data');
      // }
      // 
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Gadget Sync Complete",
        description: `Successfully synced product data for ID ${params.productId} to Gadget.dev`,
      });
      
      return true;
    } catch (error) {
      console.error("Error syncing product data to Gadget.dev:", error);
      toast({
        title: "Gadget Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  }

  /**
   * Fetch product data from Gadget.dev
   */
  public static async fetchProductData(productId: string): Promise<GadgetProductMetafields | null> {
    try {
      console.log(`Fetching product data from Gadget.dev for product ID: ${productId}`);
      
      // In a real implementation, this would call the Gadget.dev API
      // const response = await fetch(`${this.API_ENDPOINT}/products/${productId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${this.API_KEY}`
      //   }
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to fetch product data');
      // }
      // 
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock response data
      const mockData: GadgetProductMetafields = {
        average_lifespan: 45,
        cost_per_day: 0.56,
        value_score: 78,
        cost_efficiency: 82,
        customer_satisfaction: 85,
        sentiment_score: 0.72,
        repurchase_rate: 0.64
      };
      
      return mockData;
    } catch (error) {
      console.error("Error fetching product data from Gadget.dev:", error);
      toast({
        title: "Data Fetch Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return null;
    }
  }
}

// Export subscription-specific functionality to maintain compatibility with existing code
export const syncProductSubscriptionData = async (
  productId: string, 
  optimalInterval: number,
  estimatedLifespan: number
): Promise<boolean> => {
  return GadgetProductService.syncProductData({
    productId,
    metafields: {
      average_lifespan: estimatedLifespan,
      cost_per_day: 0, // This would be calculated elsewhere
    },
    options: {
      syncWithKlaviyo: true
    }
  });
};
