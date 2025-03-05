
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProductGuideDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Product Guide</Heading>
        <Text className="mb-6">
          The Replenish Reminder app helps Shopify Plus merchants increase repeat purchases and subscription
          rates by automatically reminding customers when they're about to run out of products.
        </Text>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-3">Key Features</Heading>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-semibold">Intelligent Product Lifespan Management</span>
                <p className="text-gray-600 mt-1">
                  Configure and customize estimated lifespans for each product to determine when customers
                  receive reminders.
                </p>
              </li>
              <li>
                <span className="font-semibold">Automatic Email Reminders</span>
                <p className="text-gray-600 mt-1">
                  Send timely, personalized email reminders to customers when their products are about to run out.
                </p>
              </li>
              <li>
                <span className="font-semibold">Subscription Recommendations</span>
                <p className="text-gray-600 mt-1">
                  Suggest optimal subscription frequencies based on product lifespan data.
                </p>
              </li>
              <li>
                <span className="font-semibold">Customer Replenishment Portal</span>
                <p className="text-gray-600 mt-1">
                  Customers can view and manage all their replenishment dates in one place.
                </p>
              </li>
              <li>
                <span className="font-semibold">Performance Analytics</span>
                <p className="text-gray-600 mt-1">
                  Track reminder email performance, subscription conversion rates, and replenishment metrics.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-3">Getting Started</Heading>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="installation">
                <AccordionTrigger>Installation Guide</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Follow these steps to install the Replenish Reminder app:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Go to the Shopify App Store and search for "Replenish Reminder"</li>
                    <li>Click "Add app" to install it to your Shopify store</li>
                    <li>Complete the onboarding process and configure your API keys</li>
                    <li>Set up your first product lifespans and reminder templates</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="configuration">
                <AccordionTrigger>Initial Configuration</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">After installation, configure these essential settings:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Connect your Klaviyo account for email automation</li>
                    <li>Review and adjust default product lifespan estimates</li>
                    <li>Customize email templates for your brand</li>
                    <li>Set up reminder scheduling preferences</li>
                    <li>Configure your customer-facing "My Replenishments" portal</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="firstcampaign">
                <AccordionTrigger>Setting Up Your First Reminder Campaign</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-3">To set up your first reminder campaign:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Select products you want to include in reminder emails</li>
                    <li>Verify product lifespan settings are accurate</li>
                    <li>Customize the email template with your brand messaging</li>
                    <li>Configure the timing for when reminders should be sent</li>
                    <li>Test the campaign by sending yourself a sample reminder</li>
                    <li>Activate the campaign to start sending automatic reminders</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-3">Best Practices</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 h-full">
                <Heading className="text-lg font-medium mb-2">Accurate Product Lifespans</Heading>
                <Text className="text-sm text-gray-600">
                  Regularly review and refine product lifespan estimates based on customer feedback and usage data.
                  More accurate estimates lead to better-timed reminders and higher conversion rates.
                </Text>
              </Card>
              <Card className="p-4 h-full">
                <Heading className="text-lg font-medium mb-2">Personalized Email Content</Heading>
                <Text className="text-sm text-gray-600">
                  Customize reminder emails with product-specific tips, complementary product recommendations,
                  and personalized messaging to increase engagement and conversion.
                </Text>
              </Card>
              <Card className="p-4 h-full">
                <Heading className="text-lg font-medium mb-2">Strategic Timing</Heading>
                <Text className="text-sm text-gray-600">
                  Send reminders 5-7 days before the estimated depletion date to give customers enough time
                  to reorder without creating urgency that drives them to competitors.
                </Text>
              </Card>
              <Card className="p-4 h-full">
                <Heading className="text-lg font-medium mb-2">Subscription Incentives</Heading>
                <Text className="text-sm text-gray-600">
                  Offer special discounts or perks for customers who convert from one-time purchases to
                  subscriptions through reminder emails.
                </Text>
              </Card>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ProductGuideDocs;
