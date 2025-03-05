
import React, { useState } from "react";
import { Card, Heading, Text, Page, Layout, Link } from "@/components/ui/shadcn";
import AppNavigation from "@/components/AppNavigation";
import { toast } from "@/hooks/use-toast";
import SmartNotificationCard from "@/components/SmartNotificationCard";
import ProductTimeline from "@/components/ProductTimeline";

const CustomerMyReplenishments = () => {
  // Mock data - in a real app this would come from the Shopify Customer API
  const replenishments = [
    {
      id: "1",
      productTitle: "Daily Face Moisturizer",
      purchaseDate: "2023-06-15",
      estimatedRunOutDate: "2023-07-15",
      daysRemaining: 12,
      image: "https://placehold.co/60x60",
      isSubscription: true,
      nextDeliveryDate: "2023-07-10",
      usagePattern: "Consistent",
      purchaseHistory: [
        { date: "2023-01-15", quantity: 1 },
        { date: "2023-03-15", quantity: 1 },
        { date: "2023-06-15", quantity: 1 }
      ]
    },
    {
      id: "2",
      productTitle: "Vitamin C Supplements",
      purchaseDate: "2023-05-10",
      estimatedRunOutDate: "2023-08-10",
      daysRemaining: 38,
      image: "https://placehold.co/60x60",
      isSubscription: false,
      nextDeliveryDate: null,
      usagePattern: "Variable",
      purchaseHistory: [
        { date: "2023-02-10", quantity: 1 },
        { date: "2023-05-10", quantity: 2 }
      ]
    },
    {
      id: "3",
      productTitle: "Anti-Aging Serum",
      purchaseDate: "2023-06-01",
      estimatedRunOutDate: "2023-07-31",
      daysRemaining: 28,
      image: "https://placehold.co/60x60",
      isSubscription: false,
      nextDeliveryDate: null,
      usagePattern: "Decreasing",
      purchaseHistory: [
        { date: "2022-12-01", quantity: 1 },
        { date: "2023-03-01", quantity: 1 },
        { date: "2023-06-01", quantity: 1 }
      ]
    }
  ];

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    reminderFrequency: "running-low",
    reminderThreshold: "1-week"
  });

  const handleSettingsChange = (setting: string, value: string | boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved"
    });
  };

  const handleSubscribe = (productId: string) => {
    toast({
      title: "Subscription Added",
      description: "You've successfully subscribed to this product",
    });
  };

  const handleReorder = (productId: string) => {
    toast({
      title: "Reorder Placed",
      description: "Your order has been added to cart",
    });
  };

  // Get products that need attention (running out soon)
  const productsNeedingAttention = replenishments.filter(item => item.daysRemaining < 15 && !item.isSubscription);

  return (
    <Page className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <Heading className="text-2xl font-bold mb-2">My Replenishments</Heading>
          <Text className="text-gray-600">
            Track when your products will run out and manage your replenishment schedule
          </Text>
        </header>

        {productsNeedingAttention.length > 0 && (
          <SmartNotificationCard 
            products={productsNeedingAttention} 
            onReorder={handleReorder}
            onSubscribe={handleSubscribe}
          />
        )}

        <Layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="p-6 mb-6">
              <Heading className="text-xl font-medium mb-4">Product Replenishment Timeline</Heading>
              
              <ProductTimeline replenishments={replenishments} />
              
              <div className="space-y-4 mt-6">
                {replenishments.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 flex items-start hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.productTitle} className="w-16 h-16 rounded object-cover mr-4" />
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg">{item.productTitle}</h3>
                      <div className="mt-2 mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">
                            {item.daysRemaining < 15 ? (
                              <span className="text-red-600">Running low! {item.daysRemaining} days left</span>
                            ) : (
                              <span>Estimated to run out in: <strong>{item.daysRemaining} days</strong></span>
                            )}
                          </span>
                          <span className="text-gray-500">{item.estimatedRunOutDate}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              item.daysRemaining < 15
                                ? "bg-red-500"
                                : item.daysRemaining < 30
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${Math.min(100, (1 - item.daysRemaining / 90) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      {item.isSubscription ? (
                        <div className="text-sm bg-blue-50 p-3 rounded flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                          <div>
                            <span className="font-medium text-blue-700">
                              Subscription Active
                            </span>
                            <span className="ml-2 text-blue-600">
                              Next delivery: {item.nextDeliveryDate}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-3 mt-2">
                          <button
                            onClick={() => handleReorder(item.id)}
                            className="text-sm px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            Reorder Now
                          </button>
                          <button
                            onClick={() => handleSubscribe(item.id)}
                            className="text-sm px-3 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors inline-flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path></svg>
                            Subscribe
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-6">
              <Heading className="text-xl font-medium mb-4">Reminder Settings</Heading>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Email Reminders</p>
                    <p className="text-sm text-gray-600">Receive email notifications when products are running low</p>
                  </div>
                  <div 
                    className={`relative inline-block w-12 h-6 border-2 rounded-full cursor-pointer ${
                      notificationSettings.emailNotifications ? "bg-green-500 border-green-500" : "bg-gray-300 border-gray-300"
                    }`}
                    onClick={() => handleSettingsChange('emailNotifications', !notificationSettings.emailNotifications)}
                  >
                    <span 
                      className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all ${
                        notificationSettings.emailNotifications ? "right-0.5" : "left-0.5"
                      }`}
                    ></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-medium">Reminder Frequency</p>
                  <p className="text-sm text-gray-600">How often you'd like to receive reminder notifications</p>
                  <select 
                    className="w-full border rounded p-2"
                    value={notificationSettings.reminderFrequency}
                    onChange={(e) => handleSettingsChange('reminderFrequency', e.target.value)}
                  >
                    <option value="running-low">Only when running low</option>
                    <option value="weekly">Weekly summary</option>
                    <option value="monthly">Monthly summary</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <p className="font-medium">Reminder Threshold</p>
                  <p className="text-sm text-gray-600">When should we notify you that a product is running low?</p>
                  <select 
                    className="w-full border rounded p-2"
                    value={notificationSettings.reminderThreshold}
                    onChange={(e) => handleSettingsChange('reminderThreshold', e.target.value)}
                  >
                    <option value="1-week">When less than 1 week remains</option>
                    <option value="2-weeks">When less than 2 weeks remain</option>
                    <option value="3-weeks">When less than 3 weeks remain</option>
                  </select>
                </div>

                <button 
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  onClick={() => toast({
                    title: "Settings Saved",
                    description: "Your reminder preferences have been updated"
                  })}
                >
                  Save Preferences
                </button>
              </div>
            </Card>
          </div>
        </Layout>
      </div>
    </Page>
  );
};

export default CustomerMyReplenishments;
