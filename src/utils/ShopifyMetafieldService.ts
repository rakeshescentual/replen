
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
  
  /**
   * Sync value metrics data to Shopify
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
}

// Create specialized utility functions for different types of metafield sync operations
import { ProductSubscriptionService } from "./ProductSubscriptionService";
import { CustomerPaydayService } from "./CustomerPaydayService";

export { ProductSubscriptionService, CustomerPaydayService };
