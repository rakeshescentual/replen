
import React from "react";
import { Card, Heading, Text, Page, Layout, Link } from "@/components/ui/shadcn";

// This component would be integrated into the Shopify customer account
// through Liquid templates in a real implementation
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
      nextDeliveryDate: "2023-07-10"
    },
    {
      id: "2",
      productTitle: "Vitamin C Supplements",
      purchaseDate: "2023-05-10",
      estimatedRunOutDate: "2023-08-10",
      daysRemaining: 38,
      image: "https://placehold.co/60x60",
      isSubscription: false,
      nextDeliveryDate: null
    },
    {
      id: "3",
      productTitle: "Anti-Aging Serum",
      purchaseDate: "2023-06-01",
      estimatedRunOutDate: "2023-07-31",
      daysRemaining: 28,
      image: "https://placehold.co/60x60",
      isSubscription: false,
      nextDeliveryDate: null
    }
  ];

  return (
    <Page className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <Heading className="text-2xl font-bold mb-2">My Replenishments</Heading>
          <Text className="text-gray-600">
            Track when your products will run out and manage your replenishment schedule
          </Text>
        </header>

        <Layout>
          <Card className="p-6 mb-6">
            <Heading className="text-xl font-medium mb-4">Product Replenishment Timeline</Heading>
            <div className="space-y-4">
              {replenishments.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex items-start">
                  <img src={item.image} alt={item.productTitle} className="w-12 h-12 rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.productTitle}</h3>
                    <div className="mt-2 mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Estimated to run out in: <strong>{item.daysRemaining} days</strong></span>
                        <span>{item.estimatedRunOutDate}</span>
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
                      <div className="text-sm bg-blue-50 p-2 rounded">
                        <span className="font-medium text-blue-700">
                          ✓ Subscription Active
                        </span>
                        <span className="ml-2 text-blue-600">
                          Next delivery: {item.nextDeliveryDate}
                        </span>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <Link
                          href="#"
                          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-block"
                        >
                          Reorder Now
                        </Link>
                        <Link
                          href="#"
                          className="text-sm px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition-colors inline-block"
                        >
                          Subscribe
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Heading className="text-xl font-medium mb-4">Reminder Settings</Heading>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Email Reminders</p>
                  <p className="text-sm text-gray-600">Receive email notifications when products are running low</p>
                </div>
                <div className="relative inline-block w-12 h-6 border-2 rounded-full cursor-pointer bg-green-500 border-green-500">
                  <span className="absolute w-5 h-5 bg-white rounded-full right-0.5 top-0.5"></span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reminder Frequency</p>
                  <p className="text-sm text-gray-600">How often you'd like to receive reminder notifications</p>
                </div>
                <select className="border rounded p-2">
                  <option>Only when running low</option>
                  <option>Weekly summary</option>
                  <option>Monthly summary</option>
                </select>
              </div>
            </div>
          </Card>
        </Layout>
      </div>
    </Page>
  );
};

export default CustomerMyReplenishments;
