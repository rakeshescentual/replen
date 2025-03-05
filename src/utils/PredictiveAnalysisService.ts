import { toast } from "@/hooks/use-toast";

// Types for our prediction models
export interface UsageDataPoint {
  productId: string;
  customerId: string;
  purchaseDate: Date;
  repurchaseDate?: Date;
  actualLifespan?: number; // in days
}

export interface ProductPrediction {
  productId: string;
  predictedLifespan: number;
  confidenceScore: number; // 0-1 scale
  recommendedSubscriptionInterval: string;
  dataPoints: number; // how many data points were used for this prediction
}

export interface CustomerPrediction {
  customerId: string;
  productId: string;
  predictedLifespan: number;
  personalizedFactor: number; // adjustment factor based on individual usage patterns
}

export class PredictiveAnalysisService {
  // This would normally be connected to a real ML model service
  // For now, we'll simulate predictions with a sophisticated algorithm
  
  private static usageDataCache: UsageDataPoint[] = [];
  private static productPredictionsCache: Map<string, ProductPrediction> = new Map();
  private static customerPredictionsCache: Map<string, CustomerPrediction[]> = new Map();

  // Add usage data point to our system
  public static addUsageDataPoint(dataPoint: UsageDataPoint): void {
    this.usageDataCache.push(dataPoint);
    
    // In a real system, this would be persisted to a database
    console.log(`Added usage data point for product ${dataPoint.productId} from customer ${dataPoint.customerId}`);
    
    // Recalculate predictions when new data comes in
    this.recalculatePredictions(dataPoint.productId);
  }

  // Generate prediction for a specific product
  public static async getPredictionForProduct(productId: string): Promise<ProductPrediction> {
    // Check if we have a cached prediction
    if (this.productPredictionsCache.has(productId)) {
      return this.productPredictionsCache.get(productId)!;
    }
    
    // If not, generate a new prediction
    try {
      // In a real implementation, this would call an actual ML service
      // For now, simulate a prediction based on available data
      const relevantDataPoints = this.usageDataCache.filter(dp => dp.productId === productId && dp.actualLifespan);
      
      // Default values if we don't have data
      let predictedLifespan = 30; // Default 30 days
      let confidenceScore = 0.5;
      let recommendedInterval = "1 month";
      
      if (relevantDataPoints.length > 0) {
        // Calculate average lifespan from existing data
        const totalLifespan = relevantDataPoints.reduce((sum, dp) => sum + (dp.actualLifespan || 0), 0);
        predictedLifespan = Math.round(totalLifespan / relevantDataPoints.length);
        
        // Adjust confidence based on sample size
        confidenceScore = Math.min(0.95, 0.5 + (relevantDataPoints.length * 0.05));
        
        // Calculate recommended subscription interval
        recommendedInterval = this.convertDaysToSubscriptionInterval(predictedLifespan);
      }
      
      // Create prediction object
      const prediction: ProductPrediction = {
        productId,
        predictedLifespan,
        confidenceScore,
        recommendedSubscriptionInterval: recommendedInterval,
        dataPoints: relevantDataPoints.length
      };
      
      // Cache the prediction
      this.productPredictionsCache.set(productId, prediction);
      
      return prediction;
    } catch (error) {
      console.error("Error generating prediction:", error);
      toast({
        title: "Error",
        description: "Failed to generate product lifespan prediction",
        variant: "destructive"
      });
      
      // Return a default prediction
      return {
        productId,
        predictedLifespan: 30,
        confidenceScore: 0.1,
        recommendedSubscriptionInterval: "1 month",
        dataPoints: 0
      };
    }
  }

  // Generate personalized prediction for a customer
  public static async getPersonalizedPrediction(customerId: string, productId: string): Promise<CustomerPrediction> {
    try {
      // First get the general product prediction
      const productPrediction = await this.getPredictionForProduct(productId);
      
      // Get customer-specific data points
      const customerDataPoints = this.usageDataCache.filter(
        dp => dp.customerId === customerId && dp.productId === productId && dp.actualLifespan
      );
      
      let personalizedFactor = 1.0; // Default is no adjustment
      let personalizedLifespan = productPrediction.predictedLifespan;
      
      if (customerDataPoints.length > 0) {
        // Calculate customer's average usage
        const totalCustomerLifespan = customerDataPoints.reduce((sum, dp) => sum + (dp.actualLifespan || 0), 0);
        const customerAvgLifespan = totalCustomerLifespan / customerDataPoints.length;
        
        // Calculate personalization factor (how the customer's usage differs from average)
        personalizedFactor = customerAvgLifespan / productPrediction.predictedLifespan;
        personalizedLifespan = Math.round(productPrediction.predictedLifespan * personalizedFactor);
      }
      
      const customerPrediction: CustomerPrediction = {
        customerId,
        productId,
        predictedLifespan: personalizedLifespan,
        personalizedFactor
      };
      
      // Cache this prediction
      if (!this.customerPredictionsCache.has(customerId)) {
        this.customerPredictionsCache.set(customerId, []);
      }
      
      const existingPredictions = this.customerPredictionsCache.get(customerId)!;
      const existingIndex = existingPredictions.findIndex(p => p.productId === productId);
      
      if (existingIndex >= 0) {
        existingPredictions[existingIndex] = customerPrediction;
      } else {
        existingPredictions.push(customerPrediction);
      }
      
      return customerPrediction;
    } catch (error) {
      console.error("Error generating personalized prediction:", error);
      // Return a default prediction based on product average
      const productPrediction = await this.getPredictionForProduct(productId);
      
      return {
        customerId,
        productId,
        predictedLifespan: productPrediction.predictedLifespan,
        personalizedFactor: 1.0
      };
    }
  }

  // Simulate fetching external data about product lifespans
  public static async enrichPredictionsWithExternalData(categoryName: string): Promise<{ [key: string]: number }> {
    // In a real implementation, this would call APIs or services to get external data
    // For now, simulate with some reasonable values by category
    const externalCategoryData: { [key: string]: { avgLifespan: number, stdDev: number } } = {
      "Skincare": { avgLifespan: 45, stdDev: 15 },
      "Hair Care": { avgLifespan: 60, stdDev: 20 },
      "Oral Care": { avgLifespan: 30, stdDev: 5 },
      "Supplements": { avgLifespan: 30, stdDev: 3 },
      "Makeup": { avgLifespan: 90, stdDev: 30 },
      "Bath & Body": { avgLifespan: 45, stdDev: 10 }
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const categoryData = externalCategoryData[categoryName] || { avgLifespan: 30, stdDev: 10 };
    
    // Simulate some variation in the data
    const randomFactor = 0.8 + (Math.random() * 0.4); // Between 0.8 and 1.2
    
    return {
      averageLifespan: Math.round(categoryData.avgLifespan * randomFactor),
      standardDeviation: categoryData.stdDev,
      dataPoints: Math.floor(100 + Math.random() * 900), // Simulate data points
      reliabilityScore: 0.7 + (Math.random() * 0.25) // Between 0.7 and 0.95
    };
  }

  // Helper function to recalculate predictions
  private static recalculatePredictions(productId: string): void {
    // In a real system, this would trigger a batch job to update predictions
    // For our simulation, we'll just clear the cache to force recalculation
    this.productPredictionsCache.delete(productId);
    
    // Also clear customer predictions that involve this product
    for (const [customerId, predictions] of this.customerPredictionsCache.entries()) {
      const updatedPredictions = predictions.filter(p => p.productId !== productId);
      if (updatedPredictions.length !== predictions.length) {
        this.customerPredictionsCache.set(customerId, updatedPredictions);
      }
    }
  }

  // Helper to convert days to a readable subscription interval
  private static convertDaysToSubscriptionInterval(days: number): string {
    if (days <= 7) {
      return `${days} days`;
    } else if (days <= 14) {
      const weeks = Math.round(days / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    } else if (days <= 60) {
      const months = Math.round(days / 30);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      const months = Math.round(days / 30);
      return `${months} months`;
    }
  }

  // Mock internet data fetching function
  public static async fetchInternetTrendsForCategory(category: string): Promise<any> {
    // In a real implementation, this would use web scraping or APIs
    // For now we'll simulate with realistic mock data
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const trendData = {
      "Skincare": {
        topProducts: ["Moisturizer", "Cleanser", "Sunscreen", "Serum"],
        avgRepurchaseRate: 0.65,
        marketTrends: ["Increasing focus on sustainable packaging", "Growing demand for multi-purpose products"]
      },
      "Hair Care": {
        topProducts: ["Shampoo", "Conditioner", "Hair Oil", "Dry Shampoo"],
        avgRepurchaseRate: 0.72,
        marketTrends: ["Rising popularity of sulfate-free formulas", "Increased demand for custom solutions"]
      },
      "Supplements": {
        topProducts: ["Multivitamin", "Protein", "Vitamin D", "Probiotics"],
        avgRepurchaseRate: 0.81,
        marketTrends: ["Growing interest in gummy formats", "Increased focus on immunity boosting"]
      },
      "Oral Care": {
        topProducts: ["Toothpaste", "Mouthwash", "Floss", "Whitening Strips"],
        avgRepurchaseRate: 0.89,
        marketTrends: ["Shift toward natural ingredients", "Increased adoption of subscription models"]
      }
    };
    
    return trendData[category] || {
      topProducts: ["Various"],
      avgRepurchaseRate: 0.7,
      marketTrends: ["Personalization", "Subscription services"]
    };
  }

  /**
   * Get bundle recommendations based on product synergy
   */
  public static async getBundleRecommendations(
    productId: string,
    category: string
  ): Promise<any[]> {
    console.log(`Getting bundle recommendations for product ${productId} in category ${category}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would use ML to find complementary products
    // For now, simulate with mock data
    return [
      {
        bundleId: "b1",
        products: [
          { id: "p1", title: "Product 1", price: 49.99, valueScore: 82 },
          { id: "p2", title: "Product 2", price: 39.99, valueScore: 78 },
          { id: "p3", title: "Product 3", price: 59.99, valueScore: 85 }
        ],
        combinedValue: 89,
        totalPrice: 149.97,
        bundlePrice: 129.99,
        synergisticEffects: ["Enhanced hydration", "Improved absorption", "Complementary ingredients"]
      }
    ];
  }

  /**
   * Calculate repurchase likelihood based on usage patterns
   */
  public static calculateRepurchaseLikelihood(
    customerData: any,
    productId: string
  ): number {
    // In a real implementation, this would use ML to predict likelihood
    // For now, return a random score between 65-95
    return Math.floor(65 + Math.random() * 30);
  }

  /**
   * Get customer segment based on value preferences
   */
  public static getCustomerValueSegment(
    customerPurchaseHistory: any[]
  ): string {
    // In a real implementation, this would analyze purchase patterns
    // For now, return a random segment
    const segments = [
      "Value Conscious Premium",
      "Luxury Experience Seeker",
      "Ingredient Focused",
      "Results Driven"
    ];
    
    return segments[Math.floor(Math.random() * segments.length)];
  }

  /**
   * Calculate value score improvement for a subscription
   */
  public static calculateSubscriptionValueImprovement(
    regularPrice: number,
    subscriptionPrice: number,
    optimalInterval: number,
    selectedInterval: number
  ): number {
    // Base discount value improvement
    const discountImprovement = ((regularPrice - subscriptionPrice) / regularPrice) * 100;
    
    // Interval optimization factor
    // (closer to optimal = better value)
    const intervalDifference = Math.abs(optimalInterval - selectedInterval);
    const intervalFactor = Math.max(0, 10 - (intervalDifference / 5));
    
    // Combined improvement capped at 20%
    return Math.min(20, Math.round(discountImprovement + intervalFactor));
  }
}
