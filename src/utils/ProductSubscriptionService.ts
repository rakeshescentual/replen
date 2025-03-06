
import { toast } from "@/hooks/use-toast";

/**
 * Service for managing product subscription data
 */
export class ProductSubscriptionService {
  private static readonly API_ENDPOINT = '/api/shopify/subscription';
  
  /**
   * Synchronizes product subscription data with Shopify
   * @param productId The Shopify product ID
   * @param optimalInterval Recommended subscription interval in days
   * @param estimatedLifespan Estimated product lifespan in days
   * @param internetDataScore Optional score from internet data mining (0-100)
   * @returns Promise resolving to success status
   */
  public static async syncProductSubscriptionData(
    productId: string, 
    optimalInterval: number,
    estimatedLifespan: number,
    internetDataScore?: number
  ): Promise<boolean> {
    try {
      console.log(`Syncing product subscription data for product ${productId}`);
      
      // In a production implementation, this would call the Shopify Admin API
      // to update the product's metafields with subscription data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Prepare additional data if available
      const additionalInfo = internetDataScore 
        ? ` with internet data score: ${internetDataScore}` 
        : '';
      
      // Success notification
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
  }
  
  /**
   * Calculates the optimal subscription interval based on product lifespan
   * @param estimatedLifespan Product lifespan in days
   * @param usageRate Optional usage rate modifier (0.5-1.5)
   * @returns Optimal subscription interval in days
   */
  public static calculateOptimalInterval(
    estimatedLifespan: number,
    usageRate: number = 1.0
  ): number {
    // Apply a small buffer to prevent running out (10% buffer)
    const buffer = 0.9;
    // Apply usage rate modifier
    const adjustedLifespan = estimatedLifespan * buffer * usageRate;
    
    // Round to the nearest week for user-friendly intervals
    const daysPerWeek = 7;
    return Math.round(adjustedLifespan / daysPerWeek) * daysPerWeek;
  }
  
  /**
   * Analyzes value metrics to determine subscription recommendations
   * @param productId The Shopify product ID
   * @param productPrice Product price
   * @param estimatedLifespan Estimated lifespan in days
   * @returns Recommendation object with savings and interval
   */
  public static analyzeSubscriptionValue(
    productId: string,
    productPrice: number,
    estimatedLifespan: number
  ): { 
    recommendSubscription: boolean; 
    optimalInterval: number;
    annualSavings: number;
    valueScore: number;
  } {
    // Calculate optimal interval
    const optimalInterval = this.calculateOptimalInterval(estimatedLifespan);
    
    // Assume 10% discount for subscription
    const subscriptionDiscount = 0.1;
    const annualUsage = 365 / estimatedLifespan;
    const standardAnnualCost = productPrice * annualUsage;
    const subscriptionAnnualCost = standardAnnualCost * (1 - subscriptionDiscount);
    const annualSavings = standardAnnualCost - subscriptionAnnualCost;
    
    // Calculate a value score (0-100)
    // Higher savings and shorter intervals get higher scores
    const maxSavingsScore = 50; // 50% of the score based on savings
    const maxIntervalScore = 50; // 50% of the score based on convenience
    
    // Savings score: $100+ annual savings gets max score
    const savingsScore = Math.min(annualSavings / 100 * maxSavingsScore, maxSavingsScore);
    
    // Interval score: shorter intervals (more convenient) get lower scores
    // 30 days or less gets minimum score, 90+ days gets maximum score
    const intervalScore = Math.min(
      Math.max((optimalInterval - 30) / 60, 0) * maxIntervalScore, 
      maxIntervalScore
    );
    
    const valueScore = savingsScore + intervalScore;
    
    // Recommend subscription if value score exceeds threshold
    const recommendSubscription = valueScore > 40;
    
    return {
      recommendSubscription,
      optimalInterval,
      annualSavings,
      valueScore
    };
  }
}
