export interface ProductMetafields {
  average_lifespan: number;
  cost_per_day: number;
  value_score?: number;
  cost_efficiency?: number;
  customer_satisfaction?: number;
  sentiment_score?: number;
  repurchase_rate?: number;
}

import { toast } from "@/hooks/use-toast";

export class ShopifyMetafieldService {
  private static readonly API_ENDPOINT = '/api/shopify/metafields';

  /**
   * Sync product metafields to Shopify
   */
  public static async syncProductMetafields(params: {
    productId: string;
    namespace: string;
    metafields: Record<string, string | number | boolean>;
  }): Promise<void> {
    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`Failed to sync metafields: ${message}`);
      }

      toast({
        title: "Metafields Synced",
        description: `Successfully synced metafields for product ${params.productId}`,
      });
    } catch (error) {
      console.error("Error syncing product metafields:", error);
      toast({
        title: "Metafields Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      throw error;
    }
  }
}

// Update the following function to handle value subscription data
export const syncProductSubscriptionData = async (
  productId: string, 
  optimalInterval: number,
  estimatedLifespan: number
): Promise<boolean> => {
  try {
    console.log(`Syncing product subscription data for product ${productId}`);
    
    // In a real implementation, this would call the Shopify Admin API
    // to update the product's metafields with subscription data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate success response
    toast({
      title: "Subscription data updated",
      description: `Updated optimal interval (${optimalInterval} days) and lifespan (${estimatedLifespan} days)`
    });
    
    return true;
  } catch (error) {
    console.error("Error syncing product subscription data:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return false;
  }
};
