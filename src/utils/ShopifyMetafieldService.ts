
import { PredictiveAnalysisService, ProductPrediction } from './PredictiveAnalysisService';
import { toast } from "@/hooks/use-toast";

interface ShopifyCredentials {
  shopName: string;
  accessToken: string;
}

export class ShopifyMetafieldService {
  private static credentials: ShopifyCredentials | null = null;
  private static metafieldNamespace = 'escentual';
  
  /**
   * Set the Shopify credentials for API access
   */
  public static setCredentials(shopName: string, accessToken: string): void {
    this.credentials = { shopName, accessToken };
    localStorage.setItem('shopify_credentials', JSON.stringify(this.credentials));
  }
  
  /**
   * Set the metafield namespace for the app
   */
  public static setMetafieldNamespace(namespace: string): void {
    this.metafieldNamespace = namespace;
    localStorage.setItem('metafield_namespace', namespace);
  }
  
  /**
   * Load credentials from localStorage if available
   */
  public static loadCredentials(): ShopifyCredentials | null {
    const savedCredentials = localStorage.getItem('shopify_credentials');
    const savedNamespace = localStorage.getItem('metafield_namespace');
    
    if (savedCredentials) {
      this.credentials = JSON.parse(savedCredentials);
    }
    
    if (savedNamespace) {
      this.metafieldNamespace = savedNamespace;
    }
    
    return this.credentials;
  }
  
  /**
   * Sync product predictions to Shopify metafields
   */
  public static async syncPredictionsToMetafields(
    productId: string, 
    shopifyProductId: string
  ): Promise<boolean> {
    try {
      if (!this.credentials) {
        this.loadCredentials();
        if (!this.credentials) {
          throw new Error('Shopify credentials not configured');
        }
      }
      
      // Get the latest prediction for this product
      const prediction = await PredictiveAnalysisService.getPredictionForProduct(productId);
      
      // Format the values correctly for metafields
      const metafieldValues = {
        [`${this.metafieldNamespace}.average_lifespan`]: prediction.predictedLifespan.toString(),
        [`${this.metafieldNamespace}.confidence_score`]: prediction.confidenceScore.toFixed(2),
        [`${this.metafieldNamespace}.data_points`]: prediction.dataPoints.toString()
      };
      
      // Calculate cost per day from our productAnalytics data (in a real app, this would be from a database)
      // For this example, we're using a hardcoded price, but in a real app this would be queried from Shopify
      const mockProductPrices: {[key: string]: number} = {
        "1": 24.99,
        "2": 49.99,
        "3": 29.99,
        "4": 18.99,
        "5": 5.99
      };
      
      const price = mockProductPrices[productId] || 20.00;
      const costPerDay = price / prediction.predictedLifespan;
      
      // Add cost per day to metafields
      metafieldValues[`${this.metafieldNamespace}.cost_per_day`] = costPerDay.toFixed(2);
      
      console.log(`Syncing metafields for product ${shopifyProductId} with values:`, metafieldValues);
      
      // In a real implementation, this would call the Shopify Admin API to update metafields
      // For this example, we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Metafields synced successfully');
      return true;
    } catch (error) {
      console.error('Error syncing metafields:', error);
      toast({
        title: "Error",
        description: "Failed to sync product data to Shopify metafields",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Sync all product predictions to Shopify metafields
   */
  public static async syncAllProductsToMetafields(
    productMapping: {[key: string]: string}
  ): Promise<{success: number, failed: number}> {
    const results = {
      success: 0,
      failed: 0
    };
    
    for (const [internalId, shopifyId] of Object.entries(productMapping)) {
      const success = await this.syncPredictionsToMetafields(internalId, shopifyId);
      if (success) {
        results.success++;
      } else {
        results.failed++;
      }
    }
    
    if (results.failed === 0 && results.success > 0) {
      toast({
        title: "Success",
        description: `Synced ${results.success} products to Shopify metafields`,
      });
    } else if (results.failed > 0) {
      toast({
        title: "Partially Complete",
        description: `Synced ${results.success} products, ${results.failed} failed`,
        variant: "destructive"
      });
    }
    
    return results;
  }
  
  /**
   * Create the required metafield definitions in Shopify
   */
  public static async createMetafieldDefinitions(): Promise<boolean> {
    try {
      if (!this.credentials) {
        this.loadCredentials();
        if (!this.credentials) {
          throw new Error('Shopify credentials not configured');
        }
      }
      
      // In a real implementation, this would call the Shopify Admin API
      // For this example, we'll simulate a successful API call
      console.log('Creating metafield definitions with namespace:', this.metafieldNamespace);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success",
        description: "Metafield definitions created successfully",
      });
      
      return true;
    } catch (error) {
      console.error('Error creating metafield definitions:', error);
      toast({
        title: "Error",
        description: "Failed to create metafield definitions",
        variant: "destructive"
      });
      return false;
    }
  }
}
