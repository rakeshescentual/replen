
export interface ProductMetafields {
  average_lifespan: number;
  cost_per_day: number;
  value_score?: number;
  cost_efficiency?: number;
  customer_satisfaction?: number;
  sentiment_score?: number;
  repurchase_rate?: number;
  predicted_usage_rate?: number;
  internet_data_score?: number;
  payday_alignment_score?: number;
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

  /**
   * Sync AI-predicted product lifespans to Shopify
   */
  public static async syncAIPredictedLifespan(
    productId: string,
    predictedLifespan: number,
    confidenceScore: number,
    dataSources: string[]
  ): Promise<void> {
    try {
      const metafields = {
        ai_predicted_lifespan: predictedLifespan,
        prediction_confidence: confidenceScore,
        prediction_data_sources: JSON.stringify(dataSources),
        last_prediction_date: new Date().toISOString()
      };

      await this.syncProductMetafields({
        productId,
        namespace: 'ai_predictions',
        metafields
      });

      toast({
        title: "AI Prediction Synced",
        description: `Updated AI-predicted lifespan (${predictedLifespan} days) for product ${productId}`,
      });
    } catch (error) {
      console.error("Error syncing AI prediction:", error);
      toast({
        title: "AI Prediction Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  }
}

// Update the following function to handle value subscription data
export const syncProductSubscriptionData = async (
  productId: string, 
  optimalInterval: number,
  estimatedLifespan: number,
  internetDataScore?: number
): Promise<boolean> => {
  try {
    console.log(`Syncing product subscription data for product ${productId}`);
    
    // In a real implementation, this would call the Shopify Admin API
    // to update the product's metafields with subscription data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Prepare additional data if available
    const additionalInfo = internetDataScore 
      ? ` with internet data score: ${internetDataScore}` 
      : '';
    
    // Simulate success response
    toast({
      title: "Subscription data updated",
      description: `Updated optimal interval (${optimalInterval} days) and lifespan (${estimatedLifespan} days)${additionalInfo}`
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

/**
 * Synchronizes a customer's payday date with Shopify customer metafields
 */
export const syncCustomerPaydayData = async (
  customerId: string,
  paydayDate: number, // Day of month (1-31)
  paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
): Promise<boolean> => {
  try {
    console.log(`Syncing customer payday data for customer ${customerId}`);
    
    // In a real implementation, this would call the Shopify Admin API
    // to update the customer's metafields with payday information
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Simulate success response
    toast({
      title: "Payday data updated",
      description: `Updated payday details (day: ${paydayDate}, frequency: ${paydayFrequency}) for customer`
    });
    
    return true;
  } catch (error) {
    console.error("Error syncing customer payday data:", error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return false;
  }
};
