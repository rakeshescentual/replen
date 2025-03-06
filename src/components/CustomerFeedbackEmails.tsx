
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/shadcn";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useGadgetAPI } from "@/hooks/useGadgetAPI";
import { CustomerDataCollectionService } from "@/utils/CustomerDataCollectionService";
import { FeedbackResponseType, FeedbackSchedule } from '@/types/customer-feedback';
import FeedbackTable from './feedback/FeedbackTable';
import FeedbackInfoBox from './feedback/FeedbackInfoBox';
import { initialFeedbackSchedules } from '@/data/feedbackSchedulesData';

const CustomerFeedbackEmails: React.FC = () => {
  const { toast } = useToast();
  const { sendTestEmail } = useGadgetAPI();
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSchedules, setFeedbackSchedules] = useState<FeedbackSchedule[]>(initialFeedbackSchedules);

  const handleSendNow = async (scheduleId: string) => {
    setIsLoading(true);
    const schedule = feedbackSchedules.find(s => s.id === scheduleId);
    
    if (!schedule) {
      toast({
        title: "Error",
        description: "Schedule not found",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // In a real implementation, this would send the email through Klaviyo
      await sendTestEmail(schedule.customerEmail);
      
      // Update the schedule status
      const updatedSchedules = feedbackSchedules.map(s => 
        s.id === scheduleId ? { ...s, status: 'sent' as const } : s
      );
      
      setFeedbackSchedules(updatedSchedules);
      
      toast({
        title: "Feedback Email Sent",
        description: `Email sent to ${schedule.customerName}`,
      });
    } catch (error) {
      console.error("Error sending feedback email:", error);
      toast({
        title: "Error",
        description: "Failed to send feedback email",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAutomation = (enabled: boolean) => {
    setIsAutomationEnabled(enabled);
    
    toast({
      title: enabled ? "Automation Enabled" : "Automation Disabled",
      description: enabled 
        ? "Feedback emails will be sent automatically" 
        : "Feedback emails will need to be sent manually",
    });
  };

  const handleSimulateResponse = (scheduleId: string, response: FeedbackResponseType) => {
    // In a real implementation, this would be triggered by the customer clicking a link in the email
    const schedule = feedbackSchedules.find(s => s.id === scheduleId);
    
    if (!schedule || schedule.status !== 'sent') {
      return;
    }

    // Update the schedule status and response
    const updatedSchedules = feedbackSchedules.map(s => 
      s.id === scheduleId ? { ...s, status: 'responded' as const, response } : s
    );
    
    setFeedbackSchedules(updatedSchedules);

    // If the customer responded that the product is close to depletion, record this data
    if (response === 'yes') {
      // This would update our predictive model with actual usage data
      try {
        CustomerDataCollectionService.recordProductDepletion(
          schedule.customerEmail, 
          schedule.productId,
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Assuming purchased 30 days ago
        );
        
        toast({
          title: "Usage Data Recorded",
          description: "Customer feedback has been added to the predictive model",
        });
      } catch (error) {
        console.error("Error recording product depletion:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Heading className="text-xl font-medium">Post-Purchase Feedback Emails</Heading>
          <Text className="text-gray-500 mb-4">
            Send emails to customers asking if products are close to running out. Responses help improve prediction accuracy.
          </Text>
        </div>
        
        <div className="flex items-center space-x-3">
          <Text className="text-sm text-gray-700">Automatic sending</Text>
          <Switch 
            checked={isAutomationEnabled} 
            onCheckedChange={handleToggleAutomation} 
          />
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <FeedbackTable
            feedbackSchedules={feedbackSchedules}
            isLoading={isLoading}
            onSendNow={handleSendNow}
            onSimulateResponse={handleSimulateResponse}
          />
        </div>
      </Card>
      
      <FeedbackInfoBox />
    </div>
  );
};

export default CustomerFeedbackEmails;
