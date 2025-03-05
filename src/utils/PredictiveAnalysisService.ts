
// This service provides AI-powered predictions for product lifespans and value metrics

export interface UsageDataPoint {
  productId: string;
  customerId: string;
  purchaseDate: Date;
  repurchaseDate?: Date;
  actualLifespan?: number;
}

export interface ProductPrediction {
  productId: string;
  predictedLifespan: number;
  recommendedSubscriptionInterval: string;
  confidenceScore: number;
  dataPointsAnalyzed: number;
}

export class PredictiveAnalysisService {
  private static usageData: UsageDataPoint[] = [];
  private static predictions = new Map<string, ProductPrediction>();
  
  // Add a usage data point to the system
  public static addUsageDataPoint(dataPoint: UsageDataPoint): void {
    this.usageData.push(dataPoint);
    this.recalculatePrediction(dataPoint.productId);
  }
  
  // Get prediction for a specific product
  public static async getPredictionForProduct(productId: string): Promise<ProductPrediction> {
    // Check if we already have a prediction
    if (this.predictions.has(productId)) {
      return this.predictions.get(productId)!;
    }
    
    // Create a new prediction
    await this.recalculatePrediction(productId);
    
    // If still no prediction (no data), create a default one
    if (!this.predictions.has(productId)) {
      const defaultPrediction: ProductPrediction = {
        productId,
        predictedLifespan: 30, // Default 30 days
        recommendedSubscriptionInterval: "1 month",
        confidenceScore: 0.5,
        dataPointsAnalyzed: 0
      };
      this.predictions.set(productId, defaultPrediction);
    }
    
    return this.predictions.get(productId)!;
  }
  
  // Recalculate prediction for a product based on all data points
  private static async recalculatePrediction(productId: string): Promise<void> {
    // Get all completed usage cycles for this product
    const completedCycles = this.usageData.filter(
      dp => dp.productId === productId && dp.actualLifespan !== undefined
    );
    
    if (completedCycles.length === 0) {
      return; // Not enough data
    }
    
    // Calculate average lifespan
    const totalLifespan = completedCycles.reduce(
      (sum, dp) => sum + (dp.actualLifespan || 0), 
      0
    );
    const avgLifespan = Math.round(totalLifespan / completedCycles.length);
    
    // Calculate confidence score based on amount of data
    // More data points = higher confidence
    const confidenceScore = Math.min(0.5 + (completedCycles.length / 20) * 0.5, 0.95);
    
    // Determine recommended subscription interval
    let recommendedInterval: string;
    if (avgLifespan <= 15) {
      recommendedInterval = "2 weeks";
    } else if (avgLifespan <= 35) {
      recommendedInterval = "1 month";
    } else if (avgLifespan <= 60) {
      recommendedInterval = "2 months";
    } else if (avgLifespan <= 90) {
      recommendedInterval = "3 months";
    } else {
      recommendedInterval = "4 months";
    }
    
    // Create prediction
    const prediction: ProductPrediction = {
      productId,
      predictedLifespan: avgLifespan,
      recommendedSubscriptionInterval: recommendedInterval,
      confidenceScore,
      dataPointsAnalyzed: completedCycles.length
    };
    
    // Update prediction
    this.predictions.set(productId, prediction);
  }
  
  // Get internet sentiment data for a product (simulated)
  public static async getInternetSentimentForProduct(productId: string): Promise<{
    sentimentScore: number;
    confidenceScore: number;
    sourceCount: number;
  }> {
    // In a real implementation, this would use an NLP API or service
    // to analyze sentiment from various internet sources
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate realistic looking sentiment data
    const sentimentScore = 0.6 + (Math.random() * 0.4); // 0.6-1.0 range
    const confidenceScore = 0.7 + (Math.random() * 0.25); // 0.7-0.95 range
    const sourceCount = Math.floor(Math.random() * 50) + 20; // 20-70 sources
    
    return {
      sentimentScore,
      confidenceScore,
      sourceCount
    };
  }
  
  // Fetch internet trends for a product category (simulated)
  public static async fetchInternetTrendsForCategory(category: string): Promise<{
    topProducts: string[];
    marketTrends: string[];
    avgRepurchaseRate: number;
    dataPoints: number;
    reliabilityScore: number;
  }> {
    // In a real implementation, this would fetch data from various APIs
    // For now, we'll return simulated data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Category-specific data
    let topProducts: string[] = [];
    let marketTrends: string[] = [];
    
    switch (category.toLowerCase()) {
      case "skincare":
        topProducts = [
          "Estée Lauder Advanced Night Repair",
          "La Mer Crème de la Mer",
          "SK-II Facial Treatment Essence",
          "Drunk Elephant Protini Polypeptide Cream"
        ];
        marketTrends = [
          "Growing interest in clean ingredient formulations",
          "Multi-step routines becoming more popular",
          "Increased demand for clinical evidence in marketing"
        ];
        break;
      case "haircare":
      case "hair care":
        topProducts = [
          "Olaplex No. 3 Hair Perfector",
          "Kérastase Nutritive Masquintense",
          "Living Proof Perfect Hair Day",
          "Moroccanoil Treatment"
        ];
        marketTrends = [
          "Bond-building technology is trending",
          "Sulfate-free formulas continuing to dominate",
          "Growing focus on scalp health products"
        ];
        break;
      case "supplements":
        topProducts = [
          "The Ordinary Marine Hyaluronics",
          "Ritual Essential for Women",
          "Hum Nutrition Daily Cleanse",
          "Care/of Personalized Vitamins"
        ];
        marketTrends = [
          "Beauty-from-within category expanding rapidly",
          "Transparency in sourcing gaining importance",
          "Personalized formulations becoming mainstream"
        ];
        break;
      case "oral care":
        topProducts = [
          "Crest 3D White Strips",
          "Marvis Whitening Mint Toothpaste",
          "Colgate Optic White",
          "Spotlight Oral Care Teeth Whitening Strips"
        ];
        marketTrends = [
          "Premium oral care products growing market share",
          "Natural ingredients becoming more important",
          "Whitening products continuing strong sales"
        ];
        break;
      default:
        topProducts = [
          "Top Premium Brand Product",
          "Highly-Rated Bestseller",
          "Award-Winning Formula",
          "Customer Favorite Item"
        ];
        marketTrends = [
          "Increasing interest in sustainable packaging",
          "Shift toward premium price points with proven efficacy",
          "Social media driving discovery of new products"
        ];
    }
    
    return {
      topProducts,
      marketTrends,
      avgRepurchaseRate: 0.65 + (Math.random() * 0.2), // 65-85% repurchase rate
      dataPoints: Math.floor(Math.random() * 5000) + 1000, // 1000-6000 data points
      reliabilityScore: 0.7 + (Math.random() * 0.25) // 70-95% reliability
    };
  }
  
  // Enhance predictions with external data sources (simulated)
  public static async enrichPredictionsWithExternalData(category: string): Promise<{
    averageLifespan: number;
    standardDeviation: number;
    dataPoints: number;
    reliabilityScore: number;
  }> {
    // In a real implementation, this would fetch data from external APIs
    // For demo purposes, we'll simulate different data for different categories
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let averageLifespan: number;
    let standardDeviation: number;
    
    // Set realistic values based on product category
    switch (category.toLowerCase()) {
      case "skincare":
        averageLifespan = Math.floor(Math.random() * 15) + 45; // 45-60 days
        standardDeviation = Math.floor(Math.random() * 5) + 8; // 8-13 days
        break;
      case "haircare":
      case "hair care":
        averageLifespan = Math.floor(Math.random() * 20) + 50; // 50-70 days
        standardDeviation = Math.floor(Math.random() * 7) + 10; // 10-17 days
        break;
      case "supplements":
        averageLifespan = Math.floor(Math.random() * 10) + 80; // 80-90 days
        standardDeviation = Math.floor(Math.random() * 5) + 5; // 5-10 days
        break;
      case "oral care":
        averageLifespan = Math.floor(Math.random() * 10) + 25; // 25-35 days
        standardDeviation = Math.floor(Math.random() * 3) + 3; // 3-6 days
        break;
      default:
        averageLifespan = Math.floor(Math.random() * 20) + 40; // 40-60 days
        standardDeviation = Math.floor(Math.random() * 10) + 5; // 5-15 days
    }
    
    return {
      averageLifespan,
      standardDeviation,
      dataPoints: Math.floor(Math.random() * 10000) + 5000, // 5000-15000 data points
      reliabilityScore: 0.75 + (Math.random() * 0.2) // 75-95% reliability
    };
  }
}
