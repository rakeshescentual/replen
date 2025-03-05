
import React, { useState } from "react";
import { Card, Heading, Text, Page, Layout } from "@/components/ui/shadcn";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useGadgetAPI } from "@/hooks/useGadgetAPI";

const Settings = () => {
  const { sendTestEmail, isLoading } = useGadgetAPI();
  const [klaviyoAPIKey, setKlaviyoAPIKey] = useState("");
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [reminderDaysBefore, setReminderDaysBefore] = useState("7");

  const handleSaveKlaviyoSettings = () => {
    // In a real implementation, this would save to Gadget.dev backend
    toast({
      title: "Klaviyo settings saved",
      description: "Your Klaviyo API key has been updated",
    });
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address for testing",
        variant: "destructive"
      });
      return;
    }
    
    await sendTestEmail(testEmailAddress);
  };

  return (
    <Page className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <Heading className="text-3xl font-bold mb-2">App Settings</Heading>
          <Text className="text-gray-600">
            Configure your Replenish Reminder app settings and integrations
          </Text>
        </header>

        <Layout>
          <Tabs defaultValue="integrations" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="reminder">Reminder Settings</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="integrations">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Klaviyo Integration</Heading>
                <Text className="mb-6">
                  Connect your Klaviyo account to send automated replenishment reminder emails to your customers.
                </Text>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Klaviyo Private API Key</label>
                    <Input 
                      type="password" 
                      value={klaviyoAPIKey} 
                      onChange={(e) => setKlaviyoAPIKey(e.target.value)}
                      placeholder="pk_xxxxx" 
                      className="max-w-md"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Find this in your Klaviyo account settings
                    </p>
                  </div>
                  
                  <div className="max-w-md border-t pt-4">
                    <label className="block mb-2 text-sm font-medium">Send Test Email</label>
                    <div className="flex gap-2">
                      <Input 
                        type="email" 
                        value={testEmailAddress} 
                        onChange={(e) => setTestEmailAddress(e.target.value)}
                        placeholder="your@email.com" 
                      />
                      <button
                        onClick={handleTestEmail}
                        disabled={isLoading}
                        className="whitespace-nowrap px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                      >
                        {isLoading ? "Sending..." : "Send Test"}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Test the Klaviyo email integration
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={handleSaveKlaviyoSettings}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Save Klaviyo Settings
                    </button>
                  </div>
                </div>
              </Card>
              
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Shopify Integration</Heading>
                <Text className="mb-6">
                  Your app is connected to your Shopify store. These settings are managed automatically.
                </Text>
                <div className="p-4 border rounded bg-green-50 border-green-200">
                  <p className="text-green-800">
                    <span className="font-medium">✓ Connected to Shopify</span>
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    App has access to required data: products, customers, and orders
                  </p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reminder">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Reminder Settings</Heading>
                <Text className="mb-6">
                  Configure how and when replenishment reminders are sent to customers.
                </Text>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Send Reminder Days Before Run-Out</label>
                    <Input 
                      type="number" 
                      min="1"
                      max="30"
                      value={reminderDaysBefore} 
                      onChange={(e) => setReminderDaysBefore(e.target.value)}
                      className="w-20"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      How many days before estimated run-out to send reminders
                    </p>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Reminder Frequency</label>
                    <select className="w-full border rounded p-2">
                      <option value="once">Send once per product</option>
                      <option value="follow-up">Send once with one follow-up</option>
                      <option value="until-purchase">Send until repurchase (max 3)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">Only send reminders for non-subscription products</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 ml-5">
                      Skip reminders for products customers already receive via subscription
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your reminder settings have been updated",
                        });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Save Reminder Settings
                    </button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="advanced">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Advanced Settings</Heading>
                <Text className="mb-6">
                  Configure advanced options for product lifespan calculation and app behavior.
                </Text>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Default Product Lifespan (days)</label>
                    <Input type="number" defaultValue={30} min="1" className="w-20" />
                    <p className="text-sm text-gray-500 mt-1">
                      Applied to new products when specific data is unavailable
                    </p>
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Product Data Sync Frequency</label>
                    <select className="w-full border rounded p-2">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="manual">Manual only</option>
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      How often to sync product data from Shopify
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        toast({
                          title: "Settings saved",
                          description: "Your advanced settings have been updated",
                        });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Save Advanced Settings
                    </button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Layout>
      </div>
    </Page>
  );
};

export default Settings;
