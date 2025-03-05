
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Frequently Asked Questions</Heading>
        <Text className="mb-6">
          Find answers to common questions about the Replenish Reminder app.
        </Text>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="general-1">
            <AccordionTrigger>What is Replenish Reminder?</AccordionTrigger>
            <AccordionContent>
              <p>
                Replenish Reminder is a Shopify app that helps merchants increase repeat purchases and subscription rates by automatically reminding customers when they're about to run out of products. The app tracks purchase history, calculates when products will be depleted based on estimated lifespans, and sends timely reminder emails so customers can easily reorder.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general-2">
            <AccordionTrigger>Is Replenish Reminder compatible with my Shopify store?</AccordionTrigger>
            <AccordionContent>
              <p>
                Replenish Reminder is designed for Shopify Plus merchants selling products that are consumed or depleted over time, such as beauty products, supplements, food items, household supplies, and other consumables. The app requires a Shopify Plus subscription and is optimized for stores with customer accounts enabled.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="product-lifespan-1">
            <AccordionTrigger>How are product lifespans determined?</AccordionTrigger>
            <AccordionContent>
              <p>
                Product lifespans are initially set based on product category averages and research data. The app comes with pre-configured lifespan estimates for common product categories. Merchants can review and adjust these estimates for each product through the admin dashboard. Over time, the system can refine these estimates based on actual customer usage patterns and feedback.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="product-lifespan-2">
            <AccordionTrigger>Can different customers have different product usage rates?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes! In the advanced settings, you can enable personalized usage rates that adapt over time based on individual customer purchase patterns. For example, if a customer consistently repurchases a product every 45 days when the average is 30 days, the system will learn and adjust reminder timing specifically for that customer.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reminders-1">
            <AccordionTrigger>How do the reminder emails work?</AccordionTrigger>
            <AccordionContent>
              <p>
                Reminder emails are automatically sent to customers when they're predicted to be running low on products they've purchased. The timing is based on the product's estimated lifespan and the customer's purchase date. The emails are fully customizable and include product details, personalized messaging, and easy reorder options. Email sending is handled through Klaviyo for reliable delivery and tracking.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="reminders-2">
            <AccordionTrigger>Can customers opt out of reminder emails?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes, customers can opt out of reminder emails through a preference center in their account or via an unsubscribe link in the emails. The app is fully GDPR and CCPA compliant, ensuring customers have control over their communication preferences.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="technical-1">
            <AccordionTrigger>What email marketing platform does Replenish Reminder use?</AccordionTrigger>
            <AccordionContent>
              <p>
                Replenish Reminder integrates with Klaviyo for email sending, customer segmentation, and campaign analytics. You'll need a Klaviyo account to use the email reminder functionality. The app synchronizes customer and product data with Klaviyo to enable personalized reminder campaigns.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="technical-2">
            <AccordionTrigger>Will Replenish Reminder slow down my Shopify store?</AccordionTrigger>
            <AccordionContent>
              <p>
                No, Replenish Reminder is designed to have minimal impact on your store's performance. The app operates primarily through the Gadget.dev backend and communicates with your store via efficient API calls. The customer-facing components are lightweight and load asynchronously to ensure they don't affect your store's page load times.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="integration-1">
            <AccordionTrigger>Can Replenish Reminder integrate with my existing subscription app?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes, Replenish Reminder is designed to work with Shopify's native Subscription API, making it compatible with most subscription apps that leverage this API. The app can detect subscription orders and adjust reminder schedules accordingly. For customers on subscriptions, the app can be configured to either skip reminders or send subscription management reminders instead.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="integration-2">
            <AccordionTrigger>Does Replenish Reminder work with all Shopify themes?</AccordionTrigger>
            <AccordionContent>
              <p>
                The Replenish Reminder admin dashboard works with any Shopify store regardless of theme. For the customer-facing "My Replenishments" portal, the app provides a JavaScript widget and Liquid snippet that should work with most modern Shopify themes. If you encounter any theme compatibility issues, our support team can help with custom integration.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="analytics-1">
            <AccordionTrigger>What analytics and reporting features are available?</AccordionTrigger>
            <AccordionContent>
              <p>
                Replenish Reminder provides comprehensive analytics including:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Reminder email open and click-through rates</li>
                  <li>Conversion rates from reminders to purchases</li>
                  <li>Subscription conversion metrics</li>
                  <li>Product replenishment trends</li>
                  <li>Customer replenishment behavior patterns</li>
                  <li>Revenue attribution from reminder campaigns</li>
                </ul>
                All analytics are accessible through the app dashboard and can be exported for further analysis.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="billing-1">
            <AccordionTrigger>How much does Replenish Reminder cost?</AccordionTrigger>
            <AccordionContent>
              <p>
                Replenish Reminder offers tiered pricing based on the number of customers you have and the volume of reminders sent. The base plan starts at $49/month and includes up to 5,000 customers and 10,000 reminder emails per month. Please contact our sales team for a custom quote for larger stores or enterprise requirements. All plans come with a 14-day free trial.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="support-1">
            <AccordionTrigger>What kind of support is available?</AccordionTrigger>
            <AccordionContent>
              <p>
                We offer multiple support channels:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Email support: support@replenishreminder.com</li>
                  <li>Live chat during business hours</li>
                  <li>Comprehensive documentation and guides</li>
                  <li>Video tutorials for common setup tasks</li>
                  <li>Premium onboarding and setup assistance (included with higher-tier plans)</li>
                </ul>
                Our support team is available Monday-Friday, 9am-5pm EST.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="customization-1">
            <AccordionTrigger>Can I customize the reminder email templates?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes, all reminder email templates are fully customizable. You can:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Edit the email content, layout, and design in Klaviyo</li>
                  <li>Use dynamic variables to personalize content for each customer</li>
                  <li>Include product-specific information and imagery</li>
                  <li>Add custom product recommendations or cross-selling sections</li>
                  <li>Brand the emails to match your store's visual identity</li>
                </ul>
                The app also provides several pre-designed templates to get you started quickly.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQDocs;
