import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const DeveloperDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Developer Guide</Heading>
        <Text className="mb-6">
          Technical documentation for developers working with the Escentual Value Optimization Platform, including API references,
          Gadget.dev integration, and implementation guides for value metrics.
        </Text>

        <Tabs defaultValue="gadget" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="gadget">Gadget.dev Integration</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="value-metrics">Value Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="gadget">
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Heading className="text-xl font-semibold">Gadget.dev Implementation Guide</Heading>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Recommended</Badge>
                </div>
                
                <Text className="mb-4">
                  The Escentual Value Optimization Platform is designed to integrate seamlessly with Gadget.dev for backend processing of value metrics, 
                  data analysis, and integration with Escentual.com's product catalog.
                </Text>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
                  <p className="text-amber-800 text-sm font-medium mb-2">Implementation Prerequisites</p>
                  <ul className="list-disc pl-5 text-sm text-amber-700 space-y-1">
                    <li>Gadget.dev account with appropriate access permissions</li>
                    <li>Escentual.com API credentials and access tokens</li>
                    <li>Product database access for value metric calculations</li>
                    <li>Customer data access (with appropriate GDPR compliance)</li>
                  </ul>
                </div>

                <Heading className="text-lg font-semibold mb-3">1. Setting Up Gadget.dev Backend</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Step 1: Create a new Gadget.dev application
- Log in to Gadget.dev dashboard
- Create a new application named "Escentual Value Metrics"
- Select "Custom Application" template

// Step 2: Define data models for value metrics
- Create "Product" model with fields:
  - id: ID (unique product identifier from Escentual.com)
  - title: String
  - price: Decimal
  - category: String
  - estimatedUses: Integer
  - usageFrequency: Decimal
  - valueScore: Decimal
  - costPerDay: Decimal
  - daysLasting: Integer

// Step 3: Configure authentication
- Set up API key authentication
- Configure CORS to allow requests from Escentual.com domains
- Set up appropriate role-based access controls`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">2. Implementing Value Calculation Functions</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Create a new Gadget.dev action for value calculations
export async function calculateProductValue(product, usageFrequency) {
  // Value Intelligence Algorithm (VIA)
  const estimatedUses = 32 + (product.price * 0.92);
  
  // Calculate days lasting based on frequency and product type
  const daysLasting = Math.floor(estimatedUses / usageFrequency);
  
  // Calculate precise cost per day
  const costPerDay = product.price / daysLasting;
  
  // Enhanced value intelligence score (higher is better)
  const valueScore = Math.min(100, Math.max(0, 
    48 + (daysLasting / 1.75) - (costPerDay * 4.2)
  ));
  
  return {
    costPerDay,
    daysLasting,
    valueScore
  };
}

// Register this action in your Gadget.dev application
export default function(gadget) {
  gadget.actions.register("calculateProductValue", calculateProductValue);
}`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">3. Integration with Escentual.com</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// In your Gadget.dev application, create a sync connection to Escentual.com
// Configure with API credentials

// Example API route implementation
gadget.routes.get("/api/products/:id/value", async (req, res) => {
  try {
    // Get product details from Escentual.com
    const product = await escentualAPI.getProduct(req.params.id);
    
    // Get user preferences (if available)
    const usageFrequency = req.query.usageFrequency || 1;
    
    // Calculate value metrics
    const valueMetrics = await calculateProductValue(product, usageFrequency);
    
    // Return value metrics
    res.json({
      product: {
        id: product.id,
        title: product.title,
        price: product.price
      },
      valueMetrics
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">4. Frontend Integration</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Sample React code for frontend integration
// This would be implemented on Escentual.com

import { useState, useEffect } from 'react';

const ProductValueMetrics = ({ productId = "123" }: { productId?: string }) => {
  const [valueMetrics, setValueMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usageFrequency, setUsageFrequency] = useState(1);

  useEffect(() => {
    const fetchValueMetrics = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          \`https://escentual-value-metrics.gadget.app/api/products/\${productId}/value?usageFrequency=\${usageFrequency}\`
        );
        const data = await response.json();
        setValueMetrics(data.valueMetrics);
      } catch (error) {
        console.error("Error fetching value metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchValueMetrics();
  }, [productId, usageFrequency]);

  if (loading) return <div>Loading value metrics...</div>;

  return (
    <div>
      <h3>Value Analysis</h3>
      <div>Value Score: {valueMetrics.valueScore}</div>
      <div>Cost Per Day: £{valueMetrics.costPerDay.toFixed(2)}</div>
      <div>Days Lasting: {valueMetrics.daysLasting}</div>
    </div>
  );
};`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">5. Deployment Checklist</Heading>
                <div className="rounded-md overflow-hidden border border-gray-200">
                  <table className="min-w-full bg-white">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 px-4 text-sm">Create Gadget.dev app</td>
                        <td className="py-2 px-4 text-sm">Initial setup of application structure</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Configure data models</td>
                        <td className="py-2 px-4 text-sm">Products, value metrics, customer preferences</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Implement value algorithms</td>
                        <td className="py-2 px-4 text-sm">Port calculation logic to Gadget.dev actions</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Create API endpoints</td>
                        <td className="py-2 px-4 text-sm">RESTful endpoints for frontend integration</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Set up Escentual.com connections</td>
                        <td className="py-2 px-4 text-sm">API credentials, authentication, data access</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Configure CORS</td>
                        <td className="py-2 px-4 text-sm">Allow cross-origin requests from Escentual.com</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Test API endpoints</td>
                        <td className="py-2 px-4 text-sm">Validate data flow and error handling</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Set up monitoring</td>
                        <td className="py-2 px-4 text-sm">API usage, performance metrics, error tracking</td>
                        <td className="py-2 px-4 text-sm">Recommended</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm">Deploy to production</td>
                        <td className="py-2 px-4 text-sm">Verify environment variables and connections</td>
                        <td className="py-2 px-4 text-sm">Required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="api">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">REST API Endpoints</Heading>
                <Text className="mb-4">
                  The Escentual Value Optimization Platform exposes the following REST API endpoints for integration:
                </Text>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`# Value Metrics API
GET    /api/products/:id/value                  # Get value metrics for a specific product
GET    /api/products/compare                    # Compare value metrics for multiple products
POST   /api/products/:id/value/calculate        # Calculate custom value metrics

# Customer Value Preferences
GET    /api/customers/:id/preferences           # Get customer's usage preferences
PUT    /api/customers/:id/preferences           # Update customer preferences

# Bulk Operations
POST   /api/products/bulk-value                 # Get value metrics for multiple products
POST   /api/products/category-value             # Get value metrics for product categories

# Value Intelligence
GET    /api/value-intelligence/trends           # Get value trend analysis
GET    /api/value-intelligence/recommendations  # Get value-based recommendations`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">Sample API Request</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Example: Get value metrics for a product
curl -X GET "https://escentual-value-metrics.gadget.app/api/products/123456789/value?usageFrequency=1" \\
  -H "Content-Type: application/json" \\
  -H "X-Api-Key: your_api_key_here"`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">Sample API Response</Heading>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`{
  "product": {
    "id": "123456789",
    "title": "Anti-Aging Facial Serum",
    "price": 89.99,
    "category": "Skincare"
  },
  "valueMetrics": {
    "costPerDay": 1.64,
    "daysLasting": 55,
    "valueScore": 76,
    "valueLabel": "Good Value",
    "estimatedUses": 55,
    "analysisDetails": {
      "concentrationFactor": 0.92,
      "longevityRating": 4.2,
      "valueAssessment": "This premium product provides excellent longevity at a reasonable daily cost."
    }
  }
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

          <TabsContent value="value-metrics">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Value Metrics Implementation</Heading>
                <Text className="mb-4">
                  The Escentual Value Optimization Platform uses a sophisticated algorithm to calculate and represent product value.
                </Text>

                <Heading className="text-lg font-semibold mb-3">Value Score Algorithm</Heading>
                <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap">
{`// Core Value Intelligence Algorithm (VIA)
function calculateValueScore(product, usageFrequency) {
  // Step 1: Calculate estimated total uses
  const estimatedUses = 32 + (product.price * 0.92);
  
  // Step 2: Calculate days lasting based on usage frequency
  const daysLasting = Math.floor(estimatedUses / usageFrequency);
  
  // Step 3: Calculate cost per day
  const costPerDay = product.price / daysLasting;
  
  // Step 4: Calculate value score (higher is better)
  const valueScore = Math.min(100, Math.max(0, 
    48 + (daysLasting / 1.75) - (costPerDay * 4.2)
  ));
  
  // Step 5: Determine value label
  let valueLabel = "Low Value";
  if (valueScore >= 80) valueLabel = "Excellent Value";
  else if (valueScore >= 60) valueLabel = "Good Value";
  else if (valueScore >= 40) valueLabel = "Average Value";
  
  return {
    costPerDay,
    daysLasting,
    valueScore,
    valueLabel,
    estimatedUses
  };
}`}
                  </pre>
                </div>

                <Heading className="text-lg font-semibold mb-3">Value Metrics Components</Heading>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Metric</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Calculation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-2 px-4 text-sm font-medium">Cost Per Day</td>
                        <td className="py-2 px-4 text-sm">Daily investment in the product</td>
                        <td className="py-2 px-4 text-sm font-mono">productPrice / daysLasting</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm font-medium">Days Lasting</td>
                        <td className="py-2 px-4 text-sm">Expected product longevity</td>
                        <td className="py-2 px-4 text-sm font-mono">estimatedUses / usageFrequency</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm font-medium">Value Score</td>
                        <td className="py-2 px-4 text-sm">Overall value rating (0-100)</td>
                        <td className="py-2 px-4 text-sm font-mono">48 + (daysLasting / 1.75) - (costPerDay * 4.2)</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 text-sm font-medium">Estimated Uses</td>
                        <td className="py-2 px-4 text-sm">Total applications per container</td>
                        <td className="py-2 px-4 text-sm font-mono">32 + (productPrice * 0.92)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Heading className="text-lg font-semibold mb-3">Frontend Implementation Guide</Heading>
                <Text className="mb-4">
                  The Value Calculator can be implemented on the Escentual.com product pages in several ways:
                </Text>

                <div className="space-y-4 mb-6">
                  <div className="bg-white p-4 border rounded-md shadow-sm">
                    <p className="text-sm font-medium mb-2">1. Direct Component Integration</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Embed the QuickValueCalculator component directly in product pages:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                      &lt;QuickValueCalculator productId="123456" initialPrice={49.99} /&gt;
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 border rounded-md shadow-sm">
                    <p className="text-sm font-medium mb-2">2. API Integration</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Connect to the Value Metrics API for real-time calculations:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md text-sm font-mono overflow-x-auto">
                      fetch(`https://escentual-value-metrics.gadget.app/api/products/${productId}/value`)
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 border rounded-md shadow-sm">
                    <p className="text-sm font-medium mb-2">3. Value Badge Integration</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Display simplified value badges on product listings:
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                      &lt;ValueScoreBadge score={76} label="Good Value" /&gt;
                    </div>
                  </div>
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
