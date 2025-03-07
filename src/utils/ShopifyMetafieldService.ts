
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

/**
 * Service for managing Shopify metafields via Gadget.dev API
 * 
 * This service follows Gadget.dev best practices for API integration
 * and is compatible with Shopify's API standards for Built for Shopify certification.
 */
export class ShopifyMetafieldService {
  private static readonly API_ENDPOINT = '/api/shopify/metafields';

  /**
   * Sync product metafields to Shopify via Gadget.dev
   * 
   * @param params Object containing productId, namespace, and metafields to sync
   * @returns Promise resolving when sync is complete
   */
  public static async syncProductMetafields(params: {
    productId: string;
    namespace: string;
    metafields: Record<string, string | number | boolean>;
  }): Promise<void> {
    try {
      // Using Gadget.dev API format for Shopify metafield operations
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
        },
        body: JSON.stringify({
          data: {
            type: 'shopify_product_metafield',
            attributes: {
              product_id: params.productId,
              namespace: params.namespace,
              metafields: params.metafields
            }
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to sync metafields: ${errorData.errors?.[0]?.message || 'Unknown error'}`);
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
   * 
   * Implementation follows Gadget.dev standards for Shopify API integration
   * and conforms to Built for Shopify reliability requirements
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
  
  /**
   * Sync value metrics data to Shopify
   * 
   * Value metrics are calculated according to Escentual's value intelligence algorithm
   * and stored as Shopify metafields via Gadget.dev
   */
  public static async syncValueMetricsData(
    productId: string,
    valueScore: number,
    costEfficiency: number,
    internetDataScore?: number
  ): Promise<void> {
    try {
      const metafields = {
        value_score: valueScore,
        cost_efficiency: costEfficiency,
        internet_data_score: internetDataScore || 0,
        last_updated: new Date().toISOString()
      };

      await this.syncProductMetafields({
        productId,
        namespace: 'value_metrics',
        metafields
      });

      toast({
        title: "Value Metrics Synced",
        description: `Updated value metrics (score: ${valueScore}) for product ${productId}`,
      });
    } catch (error) {
      console.error("Error syncing value metrics:", error);
      toast({
        title: "Value Metrics Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  }
  
  /**
   * Sync usage data from internet sources to Shopify
   * 
   * Implementation follows Gadget.dev best practices for API design
   * and adheres to Shopify's data management standards
   */
  public static async syncInternetDataInsights(
    productId: string,
    dataSource: string,
    sentimentScore: number,
    averageLifespan: number,
    confidenceScore: number
  ): Promise<void> {
    try {
      const metafields = {
        data_source: dataSource,
        sentiment_score: sentimentScore,
        internet_predicted_lifespan: averageLifespan,
        internet_data_confidence: confidenceScore,
        crawl_date: new Date().toISOString()
      };

      await this.syncProductMetafields({
        productId,
        namespace: 'internet_data',
        metafields
      });

      toast({
        title: "Internet Data Synced",
        description: `Updated internet data insights for product ${productId}`,
      });
    } catch (error) {
      console.error("Error syncing internet data:", error);
      toast({
        title: "Internet Data Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  }
  
  /**
   * GDPR compliant data deletion function (required for Built for Shopify)
   * 
   * Removes customer-specific data from metafields when a customer requests data deletion
   * This is a requirement for GDPR compliance in the Built for Shopify program
   */
  public static async removeCustomerData(customerId: string): Promise<void> {
    try {
      const response = await fetch(`/api/shopify/customers/${customerId}/gdpr-delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to process customer data deletion: ${errorData.errors?.[0]?.message || 'Unknown error'}`);
      }

      console.log(`Successfully removed data for customer ${customerId} in compliance with GDPR requirements`);
    } catch (error) {
      console.error("Error processing GDPR data deletion request:", error);
      throw error;
    }
  }
}

// Create specialized utility functions for different types of metafield sync operations
import { ProductSubscriptionService } from "./ProductSubscriptionService";
import { CustomerPaydayService } from "./CustomerPaydayService";

export { ProductSubscriptionService, CustomerPaydayService };
