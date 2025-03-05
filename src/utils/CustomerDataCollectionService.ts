
import { PredictiveAnalysisService, UsageDataPoint } from './PredictiveAnalysisService';
import { toast } from "@/hooks/use-toast";

// Mock customer and purchase data types
interface ShopifyCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  orderCount: number;
}

interface ShopifyOrder {
  id: string;
  customerId: string;
  createdAt: Date;
  lineItems: {
    productId: string;
    quantity: number;
    title: string;
  }[];
}

export class CustomerDataCollectionService {
  private static isInitialized = false;
  
  // Initialize data collection
  public static async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    console.log("Initializing customer data collection service...");
    
    try {
      // In a real implementation, this would set up listeners or batch processes
      // For demonstration, we'll load some initial data
      await this.loadHistoricalData();
      this.isInitialized = true;
      
      console.log("Customer data collection service initialized");
    } catch (error) {
      console.error("Failed to initialize data collection:", error);
      toast({
        title: "Warning",
        description: "Could not initialize data collection system",
        variant: "destructive"
      });
    }
  }
  
  // Load historical customer usage data (simulated)
  private static async loadHistoricalData(): Promise<void> {
    // In a real implementation, this would fetch data from Shopify API
    console.log("Loading historical customer data...");
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate some realistic looking historical data
    const mockCustomers = this.generateMockCustomers(50);
    const mockOrders = this.generateMockOrders(mockCustomers, 200);
    
    // Process mock orders to create usage data points
    const usageDataPoints: UsageDataPoint[] = [];
    
    for (const order of mockOrders) {
      for (const item of order.lineItems) {
        // Find previous purchase of the same product by this customer
        const previousPurchase = mockOrders.find(o => 
          o.customerId === order.customerId && 
          o.createdAt < order.createdAt &&
          o.lineItems.some(li => li.productId === item.productId)
        );
        
        if (previousPurchase) {
          const previousItem = previousPurchase.lineItems.find(li => li.productId === item.productId);
          if (previousItem) {
            // Calculate actual lifespan between purchases
            const purchaseDate = previousPurchase.createdAt;
            const repurchaseDate = order.createdAt;
            const actualLifespan = Math.floor((repurchaseDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
            
            // Create data point for the completed usage cycle
            usageDataPoints.push({
              productId: item.productId,
              customerId: order.customerId,
              purchaseDate: purchaseDate,
              repurchaseDate: repurchaseDate,
              actualLifespan: actualLifespan
            });
          }
        }
        
        // Always add the current purchase as a new data point
        usageDataPoints.push({
          productId: item.productId,
          customerId: order.customerId,
          purchaseDate: order.createdAt
        });
      }
    }
    
    // Feed data points to the prediction service
    console.log(`Feeding ${usageDataPoints.length} historical data points to prediction service...`);
    
    for (const dataPoint of usageDataPoints) {
      PredictiveAnalysisService.addUsageDataPoint(dataPoint);
    }
    
    console.log("Historical data loading complete");
  }
  
  // Helper function to generate mock customers (for simulation only)
  private static generateMockCustomers(count: number): ShopifyCustomer[] {
    const customers: ShopifyCustomer[] = [];
    
    for (let i = 1; i <= count; i++) {
      customers.push({
        id: `cust_${i}`,
        email: `customer${i}@example.com`,
        firstName: `User`,
        lastName: `${i}`,
        orderCount: Math.floor(Math.random() * 10) + 1
      });
    }
    
    return customers;
  }
  
  // Helper function to generate mock orders (for simulation only)
  private static generateMockOrders(customers: ShopifyCustomer[], count: number): ShopifyOrder[] {
    const orders: ShopifyOrder[] = [];
    const productIds = ["1", "2", "3", "4", "5"];
    const productTitles = [
      "Daily Face Moisturizer",
      "Anti-Aging Serum",
      "Vitamin C Supplements",
      "Shampoo",
      "Toothpaste"
    ];
    
    // Create random past date within the last year
    const randomPastDate = () => {
      const now = new Date();
      const daysAgo = Math.floor(Math.random() * 365);
      const result = new Date(now);
      result.setDate(now.getDate() - daysAgo);
      return result;
    };
    
    for (let i = 1; i <= count; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const productIndex = Math.floor(Math.random() * productIds.length);
      
      orders.push({
        id: `order_${i}`,
        customerId: customer.id,
        createdAt: randomPastDate(),
        lineItems: [
          {
            productId: productIds[productIndex],
            quantity: Math.floor(Math.random() * 2) + 1,
            title: productTitles[productIndex]
          }
        ]
      });
    }
    
    // Sort orders by date
    return orders.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
  
  // Method to track a new customer purchase
  public static trackPurchase(customerId: string, productId: string, quantity: number): void {
    // In a real implementation, this would be called when an order is placed
    console.log(`Tracking purchase: Customer ${customerId} bought ${quantity} of product ${productId}`);
    
    const dataPoint: UsageDataPoint = {
      customerId,
      productId,
      purchaseDate: new Date()
    };
    
    PredictiveAnalysisService.addUsageDataPoint(dataPoint);
  }
  
  // Method to record when a customer indicates they've finished a product
  public static recordProductDepletion(customerId: string, productId: string, purchaseDate: Date): void {
    // Find the relevant usage data point
    const now = new Date();
    const actualLifespan = Math.floor((now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Create updated data point
    const dataPoint: UsageDataPoint = {
      customerId,
      productId,
      purchaseDate,
      repurchaseDate: now,
      actualLifespan
    };
    
    PredictiveAnalysisService.addUsageDataPoint(dataPoint);
    
    console.log(`Recorded product depletion: Customer ${customerId}'s product ${productId} lasted ${actualLifespan} days`);
  }
}
