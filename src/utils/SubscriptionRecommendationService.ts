
import { PredictiveAnalysisService, ProductPrediction } from './PredictiveAnalysisService';

export interface SubscriptionRecommendation {
  productId: string;
  optimalInterval: number; // in days
  intervalOptions: number[]; // alternative intervals in days
  savingsPercentage: number;
  confidenceScore: number;
  explanation: string;
}

export interface ValuePerDay {
  productId: string;
  productName: string;
  valuePerDay: number;
  comparisonToAverage: number; // percentage compared to category average
}

export class SubscriptionRecommendationService {
  private static recommendations = new Map<string, SubscriptionRecommendation>();
  
  /**
   * Generate subscription recommendations based on product lifespan data
   */
  public static async generateRecommendation(productId: string): Promise<SubscriptionRecommendation> {
    // Check if we already have a recommendation
    if (this.recommendations.has(productId)) {
      return this.recommendations.get(productId)!;
    }
    
    try {
      console.log(`Generating subscription recommendation for product ${productId}...`);
      
      // Get product prediction from PredictiveAnalysisService
      const prediction = await PredictiveAnalysisService.getPredictionForProduct(productId);
      
      // Calculate optimal interval (ship a bit before product runs out)
      const buffer = Math.max(3, Math.round(prediction.predictedLifespan * 0.1)); // Buffer of 10% or at least 3 days
      const optimalInterval = prediction.predictedLifespan - buffer;
      
      // Generate alternative interval options
      const intervalOptions = this.generateIntervalOptions(optimalInterval, prediction.predictedLifespan);
      
      // Calculate potential savings (more savings for longer subscriptions)
      const baseSavings = 0.10; // 10% base savings
      const savingsBoost = Math.min(0.05, (optimalInterval / 180) * 0.05); // Up to additional 5% for longer intervals
      const savingsPercentage = baseSavings + savingsBoost;
      
      // Generate explanation
      const explanation = this.generateExplanation(prediction, optimalInterval, savingsPercentage);
      
      // Create recommendation
      const recommendation: SubscriptionRecommendation = {
        productId,
        optimalInterval,
        intervalOptions,
        savingsPercentage,
        confidenceScore: prediction.confidenceScore,
        explanation
      };
      
      // Store recommendation
      this.recommendations.set(productId, recommendation);
      
      return recommendation;
    } catch (error) {
      console.error("Error generating subscription recommendation:", error);
      
      // Return default recommendation
      const defaultRecommendation: SubscriptionRecommendation = {
        productId,
        optimalInterval: 30,
        intervalOptions: [15, 30, 45, 60],
        savingsPercentage: 0.10,
        confidenceScore: 0.5,
        explanation: "Based on average usage patterns, we recommend a 30-day subscription interval."
      };
      
      return defaultRecommendation;
    }
  }
  
  /**
   * Generate well-spaced interval options around the optimal interval
   */
  private static generateIntervalOptions(optimalInterval: number, predictedLifespan: number): number[] {
    const options: number[] = [];
    
    // Add options based on the optimal interval
    if (optimalInterval <= 15) {
      // For very short intervals
      options.push(7, 14, 21, 28);
    } else if (optimalInterval <= 30) {
      // For monthly-ish intervals
      options.push(14, optimalInterval, 30, 45);
    } else if (optimalInterval <= 60) {
      // For bi-monthly intervals
      options.push(30, optimalInterval, 60, 90);
    } else if (optimalInterval <= 90) {
      // For quarterly intervals
      options.push(60, optimalInterval, 90, 120);
    } else {
      // For long intervals
      const shorter = Math.max(30, Math.round(optimalInterval * 0.7));
      const longer = Math.round(optimalInterval * 1.3);
      options.push(shorter, optimalInterval, longer, longer + 30);
    }
    
    // Ensure options are unique and sorted
    return [...new Set(options)].sort((a, b) => a - b);
  }
  
  /**
   * Generate a personalized explanation for the recommendation
   */
  private static generateExplanation(
    prediction: ProductPrediction,
    optimalInterval: number,
    savingsPercentage: number
  ): string {
    const savingsPercent = Math.round(savingsPercentage * 100);
    
    if (prediction.confidenceScore > 0.8) {
      return `Based on highly accurate usage data from ${prediction.dataPointsAnalyzed} customers, we're confident this ${optimalInterval}-day subscription interval will ensure you never run out. Subscribe to save ${savingsPercent}%!`;
    } else if (prediction.confidenceScore > 0.6) {
      return `Based on usage patterns from ${prediction.dataPointsAnalyzed} customers, a ${optimalInterval}-day subscription interval should work well for most people. Subscribe to save ${savingsPercent}%!`;
    } else {
      return `We recommend a ${optimalInterval}-day subscription interval based on initial estimates. You can always adjust this later. Subscribe to save ${savingsPercent}%!`;
    }
  }
  
  /**
   * Calculate value per day for product comparison
   */
  public static async calculateValuePerDay(
    productId: string,
    productName: string,
    price: number,
    category: string
  ): Promise<ValuePerDay> {
    try {
      // Get product prediction
      const prediction = await PredictiveAnalysisService.getPredictionForProduct(productId);
      
      // Calculate value per day
      const valuePerDay = price / prediction.predictedLifespan;
      
      // Get category data
      const categoryData = await PredictiveAnalysisService.enrichPredictionsWithExternalData(category);
      
      // Calculate average value per day for this category (simulated)
      const avgValuePerDay = (price * 1.2) / categoryData.averageLifespan; // Assume 20% higher price for competitors
      
      // Calculate comparison percentage (lower is better)
      const comparisonToAverage = (valuePerDay / avgValuePerDay) * 100;
      
      return {
        productId,
        productName,
        valuePerDay,
        comparisonToAverage
      };
    } catch (error) {
      console.error("Error calculating value per day:", error);
      
      // Return default
      return {
        productId,
        productName,
        valuePerDay: price / 30, // Assume 30 days as default
        comparisonToAverage: 100 // Assume average
      };
    }
  }
  
  /**
   * Get alternative products with better value per day (simulated)
   */
  public static async getBetterValueAlternatives(
    category: string,
    currentValuePerDay: number
  ): Promise<{productId: string, productName: string, valuePerDay: number, improvement: number}[]> {
    try {
      // In a real implementation, this would query the Shopify catalog via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate 0-3 alternatives with slightly better value
      const count = Math.floor(Math.random() * 4);
      const alternatives = [];
      
      for (let i = 0; i < count; i++) {
        const improvement = 0.05 + (Math.random() * 0.20); // 5% to 25% better value
        const valuePerDay = currentValuePerDay * (1 - improvement);
        
        alternatives.push({
          productId: `alt_${i}`,
          productName: `Premium ${category} ${i+1}`,
          valuePerDay,
          improvement: improvement * 100 // as percentage
        });
      }
      
      // Sort by best value first
      return alternatives.sort((a, b) => a.valuePerDay - b.valuePerDay);
    } catch (error) {
      console.error("Error getting better value alternatives:", error);
      return [];
    }
  }
  
  /**
   * Get subscription adoption rate for a product (simulated)
   */
  public static async getSubscriptionAdoptionRate(productId: string): Promise<{
    adoptionRate: number;
    industryAverage: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  }> {
    try {
      // In a real implementation, this would query actual subscription data from Shopify via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate realistic adoption rate
      const adoptionRate = 0.15 + (Math.random() * 0.30); // 15% to 45%
      const industryAverage = 0.20 + (Math.random() * 0.10); // 20% to 30%
      
      // Determine trend
      let trend: 'increasing' | 'stable' | 'decreasing';
      const trendRandom = Math.random();
      if (trendRandom > 0.6) {
        trend = 'increasing';
      } else if (trendRandom > 0.3) {
        trend = 'stable';
      } else {
        trend = 'decreasing';
      }
      
      return {
        adoptionRate,
        industryAverage,
        trend
      };
    } catch (error) {
      console.error("Error getting subscription adoption rate:", error);
      return {
        adoptionRate: 0.25,
        industryAverage: 0.25,
        trend: 'stable'
      };
    }
  }
}
