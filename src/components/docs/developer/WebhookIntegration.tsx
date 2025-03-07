
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";

const WebhookIntegration = () => {
  return (
    <div className="space-y-6">
      <section>
        <Heading className="text-xl font-semibold mb-4">Webhook Integration</Heading>
        <Text className="mb-4">
          The Escentual Value Optimization Platform uses webhooks to stay synchronized with your Shopify store data.
        </Text>

        <Heading className="text-lg font-semibold mb-3">Registered Webhooks</Heading>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Event</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4">orders/create</td>
                <td className="py-2 px-4">Triggered when a new order is placed</td>
                <td className="py-2 px-4 font-mono text-sm">/api/webhooks/order-created</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">orders/updated</td>
                <td className="py-2 px-4">Triggered when an order is updated</td>
                <td className="py-2 px-4 font-mono text-sm">/api/webhooks/order-updated</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">customers/create</td>
                <td className="py-2 px-4">Triggered when a new customer is created</td>
                <td className="py-2 px-4 font-mono text-sm">/api/webhooks/customer-created</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">customers/update</td>
                <td className="py-2 px-4">Triggered when customer data is updated</td>
                <td className="py-2 px-4 font-mono text-sm">/api/webhooks/customer-updated</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4">products/update</td>
                <td className="py-2 px-4">Triggered when product data is updated</td>
                <td className="py-2 px-4 font-mono text-sm">/api/webhooks/product-updated</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Heading className="text-lg font-semibold mt-6 mb-3">Custom Webhook Setup</Heading>
        <Text className="mb-4">
          You can configure your own systems to receive notifications from Replenish Reminder:
        </Text>

        <div className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// Register a webhook to receive reminder events
POST https://api.replenishreminder.app/api/webhooks/register
{
  "url": "https://your-system.com/webhook-endpoint",
  "events": ["reminder.sent", "reminder.clicked", "subscription.created"],
  "secret": "your_webhook_secret"
}`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">Sample Webhook Payload</Heading>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`{
  "event": "reminder.sent",
  "timestamp": "2024-06-28T10:30:00Z",
  "data": {
    "customer_id": "5678901234",
    "email": "customer@example.com",
    "product_id": "123456789",
    "product_title": "Daily Face Moisturizer",
    "estimated_depletion_date": "2024-07-05T00:00:00Z",
    "reminder_template": "standard_reminder"
  }
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default WebhookIntegration;
