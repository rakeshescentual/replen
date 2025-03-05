
import React from "react";
import { Card, Heading, Text, Page, Layout, Link } from "@/components/ui/shadcn";
import ProductLifespanTable from "@/components/ProductLifespanTable";
import EmailPreview from "@/components/EmailPreview";
import AIProductLifespanRecommendations from "@/components/AIProductLifespanRecommendations";
import CustomerFeedbackEmails from "@/components/CustomerFeedbackEmails";
import ProductAnalytics from "@/components/ProductAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import AppNavigation from "@/components/AppNavigation";

const Dashboard = () => {
  const handleRefreshData = () => {
    // In a real implementation, this would trigger a data refresh from Shopify
    toast({
      title: "Data refresh initiated",
      description: "Syncing product data from Shopify...",
    });
  };

  return (
    <Page className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <Heading className="text-3xl font-bold mb-2">Replenish Reminder</Heading>
          <Text className="text-gray-600">
            Automate replenishment reminders for your customers' essential products
          </Text>
        </header>

        <Layout>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="ai-recommendations">AI Recommendations</TabsTrigger>
              <TabsTrigger value="emails">Email Templates</TabsTrigger>
              <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="website">Website Integration</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card className="mb-8 p-6">
                <div className="flex justify-between items-center mb-6">
                  <Heading className="text-xl font-medium">Product Lifespan Management</Heading>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={handleRefreshData}
                  >
                    Sync Products
                  </button>
                </div>
                <Text className="mb-6">
                  Review and adjust estimated lifespans for your products. These estimates determine when
                  customers receive replenishment reminders.
                </Text>
                <ProductLifespanTable />
              </Card>
            </TabsContent>

            <TabsContent value="ai-recommendations">
              <Card className="mb-8 p-6">
                <AIProductLifespanRecommendations />
              </Card>
            </TabsContent>

            <TabsContent value="emails">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Email Template Preview</Heading>
                <Text className="mb-6">
                  Preview how your replenishment reminder emails will appear to customers. Emails are sent via
                  Klaviyo when products are predicted to be near depletion.
                </Text>
                <EmailPreview />
              </Card>
            </TabsContent>

            <TabsContent value="feedback">
              <Card className="mb-8 p-6">
                <CustomerFeedbackEmails />
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">Performance Analytics</Heading>
                <Text className="mb-6">
                  Track reminder email performance, subscription conversion rates, and replenishment metrics.
                </Text>
                <div className="p-4 border rounded bg-gray-50 border-gray-200 text-center">
                  <p className="text-gray-500">Analytics dashboard will be available after sending your first reminder campaign</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="website">
              <Card className="mb-8 p-6">
                <ProductAnalytics />
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="mb-8 p-6">
                <Heading className="text-xl font-medium mb-6">App Settings</Heading>
                <Text className="mb-6">
                  Configure integration settings for Klaviyo, reminder scheduling, and general app preferences.
                </Text>
                <div className="space-y-4">
                  <div className="p-4 border rounded bg-yellow-50 border-yellow-200">
                    <p className="text-yellow-800">
                      Klaviyo API integration status: <span className="font-medium">Pending configuration</span>
                    </p>
                    <Link href="#" className="text-blue-600 hover:underline mt-2 inline-block">
                      Configure Klaviyo
                    </Link>
                  </div>
                  <div className="p-4 border rounded bg-green-50 border-green-200">
                    <p className="text-green-800">
                      Shopify data connection: <span className="font-medium">Connected</span>
                    </p>
                  </div>
                  <div className="p-4 border rounded bg-green-50 border-green-200">
                    <p className="text-green-800">
                      AI prediction system: <span className="font-medium">Active</span>
                    </p>
                    <p className="text-sm text-green-700 mt-1">
                      Using customer purchase history, market trends, and brand data to optimize predictions
                    </p>
                  </div>
                  <div className="p-4 border rounded bg-blue-50 border-blue-200">
                    <p className="text-blue-800">
                      Shopify Plus metafields: <span className="font-medium">Ready to configure</span>
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      Set up Shopify Plus metafields to display product lifespan data on your store
                    </p>
                    <Link href="#" onClick={() => document.querySelector('[value="website"]')?.dispatchEvent(new Event('click'))} className="text-blue-600 hover:underline mt-2 inline-block">
                      Configure metafields
                    </Link>
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

export default Dashboard;
