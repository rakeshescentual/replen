
import React, { useState } from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useGadgetAPI } from "@/hooks/useGadgetAPI";
import { PredictiveAnalysisService } from "@/utils/PredictiveAnalysisService";
import { CustomerDataCollectionService } from "@/utils/CustomerDataCollectionService";

interface FeedbackSchedule {
  id: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName: string;
  predictedDate: Date;
  status: 'scheduled' | 'sent' | 'responded';
  response?: 'yes' | 'no' | 'not_yet';
  emailTemplate: string;
}

const CustomerFeedbackEmails = () => {
  const { sendTestEmail } = useGadgetAPI();
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSchedules, setFeedbackSchedules] = useState<FeedbackSchedule[]>([
    {
      id: "1",
      productId: "1",
      productName: "Daily Face Moisturizer",
      customerEmail: "sarah@example.com",
      customerName: "Sarah Johnson",
      predictedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      status: 'scheduled',
      emailTemplate: "product_depletion_check"
    },
    {
      id: "2",
      productId: "3",
      productName: "Vitamin C Supplements",
      customerEmail: "michael@example.com",
      customerName: "Michael Brown",
      predictedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      status: 'scheduled',
      emailTemplate: "product_depletion_check"
    },
    {
      id: "3",
      productId: "4",
      productName: "Shampoo",
      customerEmail: "emma@example.com",
      customerName: "Emma Wilson",
      predictedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: 'sent',
      emailTemplate: "product_depletion_check"
    },
    {
      id: "4",
      productId: "2",
      productName: "Anti-Aging Serum",
      customerEmail: "david@example.com",
      customerName: "David Clark",
      predictedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: 'responded',
      response: 'yes',
      emailTemplate: "product_depletion_check"
    },
    {
      id: "5",
      productId: "5",
      productName: "Toothpaste",
      customerEmail: "jessica@example.com",
      customerName: "Jessica Miller",
      predictedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      status: 'responded',
      response: 'not_yet',
      emailTemplate: "product_depletion_check"
    }
  ]);

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

  const handleSimulateResponse = (scheduleId: string, response: 'yes' | 'no' | 'not_yet') => {
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

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get badge color based on status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'sent':
        return 'bg-yellow-100 text-yellow-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get response emoji and text
  const getResponseText = (response?: string) => {
    switch (response) {
      case 'yes':
        return '✅ Yes, running out';
      case 'no':
        return '❌ No, still has plenty';
      case 'not_yet':
        return '⌛ Not yet, but soon';
      default:
        return '—';
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Predicted Depletion</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{schedule.customerName}</div>
                      <div className="text-sm text-gray-500">{schedule.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{schedule.productName}</TableCell>
                  <TableCell>{formatDate(schedule.predictedDate)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(schedule.status)}`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {schedule.status === 'responded' ? (
                      <span>{getResponseText(schedule.response)}</span>
                    ) : (
                      <span className="text-gray-400">No response yet</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {schedule.status === 'scheduled' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendNow(schedule.id)}
                        disabled={isLoading}
                      >
                        Send Now
                      </Button>
                    )}
                    {schedule.status === 'sent' && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSimulateResponse(schedule.id, 'yes')}
                          className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                        >
                          Yes
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSimulateResponse(schedule.id, 'not_yet')}
                          className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
                        >
                          Soon
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSimulateResponse(schedule.id, 'no')}
                          className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                        >
                          No
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <Heading className="text-sm font-medium text-blue-800 mb-2">How Customer Feedback Improves Predictions</Heading>
        <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
          <li>Actual usage data is fed back into our machine learning model</li>
          <li>Customer-specific usage patterns are identified for personalized predictions</li>
          <li>Product category benchmarks are refined based on real-world data</li>
          <li>Predictions become more accurate over time as more customers respond</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerFeedbackEmails;
