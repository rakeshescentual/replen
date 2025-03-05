
import { toast } from "@/hooks/use-toast";

// Types for Klaviyo integration
export interface KlaviyoProfile {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  externalId?: string;
  properties?: Record<string, any>;
}

export interface KlaviyoEvent {
  event: string;
  customerProperties: KlaviyoProfile;
  properties?: Record<string, any>;
}

export interface KlaviyoList {
  id: string;
  name: string;
  created: string;
  updated: string;
}

export interface KlaviyoFlowTrigger {
  flowId: string;
  email: string;
  properties?: Record<string, any>;
}

export interface KlaviyoTemplate {
  id: string;
  name: string;
  html: string;
  subject: string;
}

export class KlaviyoIntegrationService {
  private static readonly API_ENDPOINT = 'https://a.klaviyo.com/api/v2';
  
  /**
   * Create or update a customer profile in Klaviyo
   */
  public static async updateProfile(profile: KlaviyoProfile): Promise<boolean> {
    try {
      console.log(`Updating Klaviyo profile for ${profile.email}...`);
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Profile updated in Klaviyo");
      return true;
    } catch (error) {
      console.error("Error updating Klaviyo profile:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to update profile in Klaviyo",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Track a custom event in Klaviyo
   */
  public static async trackEvent(eventData: KlaviyoEvent): Promise<boolean> {
    try {
      console.log(`Tracking Klaviyo event "${eventData.event}" for ${eventData.customerProperties.email}...`);
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      console.log("Event tracked in Klaviyo");
      return true;
    } catch (error) {
      console.error("Error tracking Klaviyo event:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to track event in Klaviyo",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Add a customer to a Klaviyo list
   */
  public static async addToList(listId: string, profile: KlaviyoProfile): Promise<boolean> {
    try {
      console.log(`Adding ${profile.email} to Klaviyo list ${listId}...`);
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      console.log("Added to Klaviyo list");
      return true;
    } catch (error) {
      console.error("Error adding to Klaviyo list:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to add to list in Klaviyo",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Fetch all lists from Klaviyo
   */
  public static async getLists(): Promise<KlaviyoList[]> {
    try {
      console.log("Fetching Klaviyo lists...");
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 900));
      
      // Mock lists
      return [
        {
          id: "ABC123",
          name: "Replenishment Reminders",
          created: "2023-01-15T12:00:00Z",
          updated: "2023-06-20T15:30:00Z"
        },
        {
          id: "DEF456",
          name: "Product Feedback",
          created: "2023-02-10T10:15:00Z",
          updated: "2023-06-18T09:45:00Z"
        },
        {
          id: "GHI789",
          name: "Subscription Customers",
          created: "2023-03-05T14:30:00Z",
          updated: "2023-06-22T11:20:00Z"
        }
      ];
    } catch (error) {
      console.error("Error fetching Klaviyo lists:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to fetch lists from Klaviyo",
        variant: "destructive"
      });
      return [];
    }
  }
  
  /**
   * Trigger a flow in Klaviyo
   */
  public static async triggerFlow(trigger: KlaviyoFlowTrigger): Promise<boolean> {
    try {
      console.log(`Triggering Klaviyo flow ${trigger.flowId} for ${trigger.email}...`);
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Klaviyo flow triggered");
      return true;
    } catch (error) {
      console.error("Error triggering Klaviyo flow:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to trigger flow in Klaviyo",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Send a transactional email via Klaviyo
   */
  public static async sendTransactionalEmail(
    templateId: string,
    recipient: string,
    context: Record<string, any>
  ): Promise<boolean> {
    try {
      console.log(`Sending transactional email to ${recipient} using template ${templateId}...`);
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Transactional email sent via Klaviyo");
      toast({
        title: "Email Sent",
        description: `Transactional email sent to ${recipient}`,
      });
      return true;
    } catch (error) {
      console.error("Error sending transactional email:", error);
      toast({
        title: "Klaviyo Error",
        description: error instanceof Error ? error.message : "Failed to send email via Klaviyo",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Track when a replenishment reminder is sent
   */
  public static async trackReminderSent(
    email: string,
    productId: string,
    daysRemaining: number
  ): Promise<boolean> {
    try {
      const eventData: KlaviyoEvent = {
        event: "Replenishment Reminder Sent",
        customerProperties: {
          email
        },
        properties: {
          productId,
          daysRemaining,
          sentDate: new Date().toISOString()
        }
      };
      
      return await this.trackEvent(eventData);
    } catch (error) {
      console.error("Error tracking reminder event:", error);
      return false;
    }
  }
  
  /**
   * Track when a customer reorders after receiving a reminder
   */
  public static async trackReminderConversion(
    email: string,
    productId: string,
    orderId: string
  ): Promise<boolean> {
    try {
      const eventData: KlaviyoEvent = {
        event: "Replenishment Reminder Conversion",
        customerProperties: {
          email
        },
        properties: {
          productId,
          orderId,
          conversionDate: new Date().toISOString()
        }
      };
      
      return await this.trackEvent(eventData);
    } catch (error) {
      console.error("Error tracking conversion event:", error);
      return false;
    }
  }
  
  /**
   * Get templates from Klaviyo
   */
  public static async getTemplates(): Promise<KlaviyoTemplate[]> {
    try {
      console.log("Fetching Klaviyo templates...");
      
      // In a real implementation, this would call the Klaviyo API via Gadget.dev
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock templates
      return [
        {
          id: "template1",
          name: "Replenishment Reminder",
          subject: "Your {{product_name}} is running low!",
          html: "<html><body>It's time to reorder...</body></html>"
        },
        {
          id: "template2",
          name: "Product Feedback Request",
          subject: "How are you liking your {{product_name}}?",
          html: "<html><body>We'd love your feedback...</body></html>"
        },
        {
          id: "template3",
          name: "Subscription Offer",
          subject: "Never run out of {{product_name}} again!",
          html: "<html><body>Subscribe and save...</body></html>"
        }
      ];
    } catch (error) {
      console.error("Error fetching Klaviyo templates:", error);
      return [];
    }
  }
}

// React hook for using Klaviyo integration
export function useKlaviyoIntegration() {
  const trackEvent = async (event: string, email: string, properties?: Record<string, any>) => {
    return await KlaviyoIntegrationService.trackEvent({
      event,
      customerProperties: { email },
      properties
    });
  };
  
  const updateProfile = async (profile: KlaviyoProfile) => {
    return await KlaviyoIntegrationService.updateProfile(profile);
  };
  
  const addToList = async (listId: string, email: string) => {
    return await KlaviyoIntegrationService.addToList(listId, { email });
  };
  
  const getLists = async () => {
    return await KlaviyoIntegrationService.getLists();
  };
  
  const triggerReminder = async (email: string, productId: string, daysRemaining: number) => {
    const flowTriggered = await KlaviyoIntegrationService.triggerFlow({
      flowId: "replenishment_reminder",
      email,
      properties: {
        productId,
        daysRemaining
      }
    });
    
    if (flowTriggered) {
      await KlaviyoIntegrationService.trackReminderSent(email, productId, daysRemaining);
    }
    
    return flowTriggered;
  };
  
  const sendTransactionalEmail = async (
    templateId: string,
    email: string,
    context: Record<string, any>
  ) => {
    return await KlaviyoIntegrationService.sendTransactionalEmail(templateId, email, context);
  };
  
  return {
    trackEvent,
    updateProfile,
    addToList,
    getLists,
    triggerReminder,
    sendTransactionalEmail
  };
}
