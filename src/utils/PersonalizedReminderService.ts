
import { toast } from "@/hooks/use-toast";
import { PredictiveAnalysisService } from './PredictiveAnalysisService';
import { KlaviyoIntegrationService } from './KlaviyoIntegrationService';

export interface CustomerProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  lastPurchaseDates: Record<string, Date>;
  preferredChannel: 'email' | 'sms' | 'both';
  communicationFrequency: 'high' | 'medium' | 'low';
  productPreferences: string[];
}

export interface ReminderTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  timing: number; // days before predicted depletion
}

export interface ReminderCampaignMetrics {
  campaignId: string;
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  revenue: number;
}

export class PersonalizedReminderService {
  private static customerProfiles = new Map<string, CustomerProfile>();
  private static reminderTemplates = new Map<string, ReminderTemplate>();
  private static campaignMetrics = new Map<string, ReminderCampaignMetrics>();
  
  // Initialize with default templates
  static {
    // Add default templates
    this.reminderTemplates.set('default_early', {
      id: 'default_early',
      name: 'Early Reminder',
      subject: 'Your {{product_name}} will need replacement soon',
      body: 'Hi {{first_name}}, we noticed your {{product_name}} might be running low in about {{days_remaining}} days. Would you like to reorder now with 10% off?',
      timing: 14 // 14 days before depletion
    });
    
    this.reminderTemplates.set('default_urgent', {
      id: 'default_urgent',
      name: 'Urgent Reminder',
      subject: 'Your {{product_name}} is about to run out!',
      body: 'Hi {{first_name}}, your {{product_name}} is estimated to run out in just {{days_remaining}} days! Order now to avoid running out.',
      timing: 3 // 3 days before depletion
    });
    
    this.reminderTemplates.set('subscription_recommendation', {
      id: 'subscription_recommendation',
      name: 'Subscription Recommendation',
      subject: 'Never run out of {{product_name}} again',
      body: 'Hi {{first_name}}, based on your usage patterns, we recommend subscribing to {{product_name}} with delivery every {{optimal_interval}} days. This could save you up to 15% on each order!',
      timing: 7 // 7 days before depletion
    });
  }
  
  /**
   * Get or create a customer profile
   */
  public static async getCustomerProfile(customerId: string): Promise<CustomerProfile | null> {
    if (this.customerProfiles.has(customerId)) {
      return this.customerProfiles.get(customerId)!;
    }
    
    try {
      // In a real implementation, fetch from Shopify via Gadget.dev
      console.log(`Fetching customer profile for ${customerId}...`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, create a mock profile
      const mockProfile: CustomerProfile = {
        id: customerId,
        email: `customer${customerId}@example.com`,
        firstName: `User`,
        lastName: `${customerId}`,
        lastPurchaseDates: {},
        preferredChannel: 'email',
        communicationFrequency: 'medium',
        productPreferences: []
      };
      
      this.customerProfiles.set(customerId, mockProfile);
      return mockProfile;
    } catch (error) {
      console.error("Error fetching customer profile:", error);
      toast({
        title: "Error",
        description: "Could not fetch customer profile",
        variant: "destructive"
      });
      return null;
    }
  }
  
  /**
   * Update a customer's product purchase date
   */
  public static async updateProductPurchase(customerId: string, productId: string): Promise<void> {
    const profile = await this.getCustomerProfile(customerId);
    if (!profile) return;
    
    profile.lastPurchaseDates[productId] = new Date();
    this.customerProfiles.set(customerId, profile);
    
    console.log(`Updated purchase date for customer ${customerId}, product ${productId}`);
  }
  
  /**
   * Schedule personalized reminders for a customer based on purchase history and product lifespan
   */
  public static async schedulePersonalizedReminders(customerId: string): Promise<boolean> {
    try {
      const profile = await this.getCustomerProfile(customerId);
      if (!profile) return false;
      
      console.log(`Scheduling personalized reminders for customer ${customerId}...`);
      
      // For each product the customer has purchased
      for (const [productId, purchaseDate] of Object.entries(profile.lastPurchaseDates)) {
        // Get product prediction
        const prediction = await PredictiveAnalysisService.getPredictionForProduct(productId);
        
        // Calculate estimated depletion date
        const depletionDate = new Date(purchaseDate);
        depletionDate.setDate(depletionDate.getDate() + prediction.predictedLifespan);
        
        // Get current date
        const now = new Date();
        
        // Calculate days remaining
        const daysRemaining = Math.floor((depletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        console.log(`Product ${productId} estimated to deplete in ${daysRemaining} days`);
        
        // Schedule reminders based on the days remaining and template timings
        for (const template of this.reminderTemplates.values()) {
          if (daysRemaining <= template.timing && daysRemaining > 0) {
            await this.sendPersonalizedReminder(profile, productId, template.id, daysRemaining);
            break; // Send only the most relevant reminder
          }
        }
        
        // If product is depleted but no repurchase, send a special reminder
        if (daysRemaining < 0 && daysRemaining > -30) {
          await this.sendPostDepletionReminder(profile, productId, Math.abs(daysRemaining));
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error scheduling reminders:", error);
      return false;
    }
  }
  
  /**
   * Send a personalized reminder email
   */
  private static async sendPersonalizedReminder(
    profile: CustomerProfile,
    productId: string,
    templateId: string,
    daysRemaining: number
  ): Promise<boolean> {
    try {
      const template = this.reminderTemplates.get(templateId);
      if (!template) return false;
      
      console.log(`Sending ${template.name} reminder to ${profile.email} for product ${productId}...`);
      
      // In a real implementation, this would fetch product details from Shopify
      const productName = `Product ${productId}`;
      
      // Get prediction for subscription recommendation
      const prediction = await PredictiveAnalysisService.getPredictionForProduct(productId);
      
      // Prepare template variables
      const templateVars = {
        first_name: profile.firstName,
        product_name: productName,
        days_remaining: daysRemaining.toString(),
        optimal_interval: prediction.recommendedSubscriptionInterval
      };
      
      // Format subject and body with template variables
      let subject = template.subject;
      let body = template.body;
      
      for (const [key, value] of Object.entries(templateVars)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        subject = subject.replace(regex, value);
        body = body.replace(regex, value);
      }
      
      // Create a unique campaign ID for tracking
      const campaignId = `reminder_${templateId}_${productId}_${Date.now()}`;
      
      // Send via Klaviyo
      const sent = await KlaviyoIntegrationService.sendTransactionalEmail(
        templateId,
        profile.email,
        {
          subject,
          product_id: productId,
          product_name: productName,
          days_remaining: daysRemaining,
          first_name: profile.firstName,
          campaign_id: campaignId
        }
      );
      
      if (sent) {
        // Initialize campaign metrics
        this.campaignMetrics.set(campaignId, {
          campaignId,
          sentCount: 1,
          openRate: 0,
          clickRate: 0,
          conversionRate: 0,
          revenue: 0
        });
        
        // Track the reminder in Klaviyo
        await KlaviyoIntegrationService.trackReminderSent(profile.email, productId, daysRemaining);
      }
      
      return sent;
    } catch (error) {
      console.error("Error sending personalized reminder:", error);
      return false;
    }
  }
  
  /**
   * Send a reminder after product is expected to be depleted
   */
  private static async sendPostDepletionReminder(
    profile: CustomerProfile,
    productId: string,
    daysSinceDepletion: number
  ): Promise<boolean> {
    try {
      console.log(`Sending post-depletion reminder to ${profile.email} for product ${productId}...`);
      
      // In a real implementation, this would fetch product details from Shopify
      const productName = `Product ${productId}`;
      
      // Create subject and body for post-depletion reminder
      const subject = `Have you run out of ${productName}?`;
      const body = `Hi ${profile.firstName}, we noticed it's been ${daysSinceDepletion} days since you might have run out of ${productName}. Need a refill?`;
      
      // Create a unique campaign ID for tracking
      const campaignId = `post_depletion_${productId}_${Date.now()}`;
      
      // Send via Klaviyo
      const sent = await KlaviyoIntegrationService.sendTransactionalEmail(
        'post_depletion',
        profile.email,
        {
          subject,
          product_id: productId,
          product_name: productName,
          days_since_depletion: daysSinceDepletion,
          first_name: profile.firstName,
          campaign_id: campaignId
        }
      );
      
      if (sent) {
        // Initialize campaign metrics
        this.campaignMetrics.set(campaignId, {
          campaignId,
          sentCount: 1,
          openRate: 0,
          clickRate: 0,
          conversionRate: 0,
          revenue: 0
        });
      }
      
      return sent;
    } catch (error) {
      console.error("Error sending post-depletion reminder:", error);
      return false;
    }
  }
  
  /**
   * Track a reminder conversion (purchase after reminder)
   */
  public static async trackReminderConversion(
    email: string,
    productId: string,
    orderId: string,
    orderValue: number,
    campaignId?: string
  ): Promise<void> {
    try {
      console.log(`Tracking reminder conversion for ${email}, product ${productId}, order ${orderId}`);
      
      // Track in Klaviyo
      await KlaviyoIntegrationService.trackReminderConversion(email, productId, orderId);
      
      // If we have a specific campaign ID, update its metrics
      if (campaignId && this.campaignMetrics.has(campaignId)) {
        const metrics = this.campaignMetrics.get(campaignId)!;
        metrics.conversionRate = ((metrics.conversionRate * metrics.sentCount) + 1) / metrics.sentCount;
        metrics.revenue += orderValue;
        this.campaignMetrics.set(campaignId, metrics);
      }
    } catch (error) {
      console.error("Error tracking reminder conversion:", error);
    }
  }
  
  /**
   * Get reminder campaign metrics
   */
  public static getCampaignMetrics(): ReminderCampaignMetrics[] {
    return Array.from(this.campaignMetrics.values());
  }
  
  /**
   * Create or update a reminder template
   */
  public static saveReminderTemplate(template: ReminderTemplate): void {
    this.reminderTemplates.set(template.id, template);
    console.log(`Saved reminder template: ${template.name}`);
  }
  
  /**
   * Get all reminder templates
   */
  public static getReminderTemplates(): ReminderTemplate[] {
    return Array.from(this.reminderTemplates.values());
  }
  
  /**
   * Get analytics on reminder effectiveness
   */
  public static async getReminderAnalytics(): Promise<{
    totalReminders: number;
    averageOpenRate: number;
    averageClickRate: number;
    averageConversionRate: number;
    totalRevenue: number;
    topPerformingTemplates: {templateId: string, conversionRate: number}[];
  }> {
    const metrics = this.getCampaignMetrics();
    
    if (metrics.length === 0) {
      return {
        totalReminders: 0,
        averageOpenRate: 0,
        averageClickRate: 0,
        averageConversionRate: 0,
        totalRevenue: 0,
        topPerformingTemplates: []
      };
    }
    
    const totalReminders = metrics.reduce((sum, m) => sum + m.sentCount, 0);
    const totalOpens = metrics.reduce((sum, m) => sum + (m.openRate * m.sentCount), 0);
    const totalClicks = metrics.reduce((sum, m) => sum + (m.clickRate * m.sentCount), 0);
    const totalConversions = metrics.reduce((sum, m) => sum + (m.conversionRate * m.sentCount), 0);
    const totalRevenue = metrics.reduce((sum, m) => sum + m.revenue, 0);
    
    // Calculate averages
    const averageOpenRate = totalOpens / totalReminders;
    const averageClickRate = totalClicks / totalReminders;
    const averageConversionRate = totalConversions / totalReminders;
    
    // Get template performance
    const templatePerformance = new Map<string, {count: number, conversions: number}>();
    
    for (const metric of metrics) {
      const templateId = metric.campaignId.split('_')[1]; // Extract template ID from campaign ID
      
      if (!templatePerformance.has(templateId)) {
        templatePerformance.set(templateId, {count: 0, conversions: 0});
      }
      
      const perf = templatePerformance.get(templateId)!;
      perf.count += metric.sentCount;
      perf.conversions += metric.conversionRate * metric.sentCount;
      templatePerformance.set(templateId, perf);
    }
    
    // Calculate conversion rates for each template
    const topPerformingTemplates = Array.from(templatePerformance.entries())
      .map(([templateId, perf]) => ({
        templateId,
        conversionRate: perf.conversions / perf.count
      }))
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 3); // Get top 3
    
    return {
      totalReminders,
      averageOpenRate,
      averageClickRate,
      averageConversionRate,
      totalRevenue,
      topPerformingTemplates
    };
  }
}
