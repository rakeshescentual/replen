
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DeveloperDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Developer Guide</Heading>
        <Text className="mb-6">
          Technical documentation for developers working with the Replenish Reminder app, including API references,
          customization options, and implementation guides.
        </Text>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="api">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">REST API Endpoints</Heading>
                <Text className="mb-4">
                  The Replenish Reminder app exposes the following REST API endpoints for integration:
                </Text>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`# Product Lifespan Management
GET    /api/products                  # List all products with lifespan data
GET    /api/products/:id              # Get lifespan data for specific product
PUT    /api/products/:id              # Update lifespan data for specific product
POST   /api/products/bulk-update      # Bulk update lifespan data

# Customer Replenishments
GET    /api/customers/:id/replenishments     # Get customer's replenishment schedule
PUT    /api/customers/:id/preferences        # Update customer reminder preferences

# Reminder Management
GET    /api/reminders                 # List scheduled reminders
POST   /api/reminders/trigger         # Manually trigger reminders
GET    /api/reminders/stats           # Get reminder performance statistics

# Webhook Receivers
POST   /api/webhooks/order-created    # Process new order data
POST   /api/webhooks/subscription-updated    # Handle subscription changes`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">Sample API Request</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Example: Update product lifespan
curl -X PUT https://api.replenishreminder.app/api/products/123456789 \\
  -H "Content-Type: application/json" \\
  -H "X-Api-Key: your_api_key_here" \\
  -d '{
    "estimatedLifespanDays": 30,
    "suggestedSubscriptionFrequency": "1 month",
    "isActive": true
  }'`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">Sample API Response</Heading>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`{
  "success": true,
  "data": {
    "id": "123456789",
    "title": "Daily Face Moisturizer",
    "estimatedLifespanDays": 30,
    "suggestedSubscriptionFrequency": "1 month",
    "category": "Skincare",
    "isActive": true,
    "updatedAt": "2023-10-15T14:32:17Z"
  }
}`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="customization">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Email Template Customization</Heading>
                <Text className="mb-4">
                  The Replenish Reminder app supports customization of email templates using Klaviyo's template editor
                  and our custom variables.
                </Text>

                <Heading className="text-lg font-semibold mb-3">Available Variables</Heading>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-4 text-left">Variable</th>
                        <th className="py-2 px-4 text-left">Description</th>
                        <th className="py-2 px-4 text-left">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{customer.first_name}}'}</td>
                        <td className="py-2 px-4">Customer's first name</td>
                        <td className="py-2 px-4">Sarah</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{product.title}}'}</td>
                        <td className="py-2 px-4">Product name</td>
                        <td className="py-2 px-4">Daily Face Moisturizer</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{product.image_url}}'}</td>
                        <td className="py-2 px-4">Product image URL</td>
                        <td className="py-2 px-4">https://cdn.shopify.com/...</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{depletion_date}}'}</td>
                        <td className="py-2 px-4">Estimated date when product runs out</td>
                        <td className="py-2 px-4">October 20, 2023</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{days_remaining}}'}</td>
                        <td className="py-2 px-4">Days until estimated depletion</td>
                        <td className="py-2 px-4">5</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4 font-mono text-sm">{'{{reorder_url}}'}</td>
                        <td className="py-2 px-4">Direct link to reorder the product</td>
                        <td className="py-2 px-4">https://store.com/cart/add?id=...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <Heading className="text-xl font-semibold mb-4">Customer Portal Customization</Heading>
                <Text className="mb-4">
                  The "My Replenishments" customer portal can be customized using Liquid theme templates.
                </Text>

                <Heading className="text-lg font-semibold mb-3">Installation Instructions</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`{% comment %}
  Add this snippet to your theme's customer account page
{% endcomment %}

{% if customer %}
  <div id="replenish-reminder-portal"></div>
  <script>
    window.replenishReminderConfig = {
      customerId: {{ customer.id | json }},
      shop: {{ shop.permanent_domain | json }},
      apiKey: "YOUR_PUBLIC_API_KEY"
    };
  </script>
  <script src="https://app.replenishreminder.com/portal.js" async></script>
{% endif %}`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">CSS Customization</Heading>
                <Text className="mb-4">
                  You can customize the appearance of the customer portal by adding custom CSS to your theme:
                </Text>

                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`/* Custom styles for Replenish Reminder portal */
#replenish-reminder-portal {
  /* Your custom styles here */
  font-family: inherit;
  color: #333;
}

#replenish-reminder-portal .rr-header {
  color: #000;
  font-weight: bold;
}

#replenish-reminder-portal .rr-product-card {
  border: 1px solid #eee;
  border-radius: 8px;
}

#replenish-reminder-portal .rr-button {
  background-color: #000;
  color: #fff;
}`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="webhooks">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Webhook Integration</Heading>
                <Text className="mb-4">
                  The Replenish Reminder app uses webhooks to stay synchronized with your Shopify store data.
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
  "timestamp": "2023-10-15T10:30:00Z",
  "data": {
    "customer_id": "5678901234",
    "email": "customer@example.com",
    "product_id": "123456789",
    "product_title": "Daily Face Moisturizer",
    "estimated_depletion_date": "2023-10-20T00:00:00Z",
    "reminder_template": "standard_reminder"
  }
}`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DeveloperDocs;
