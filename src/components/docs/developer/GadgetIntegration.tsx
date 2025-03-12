
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Server, GitBranch, Zap, Lock } from "lucide-react";

const GadgetIntegration = () => {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Heading className="text-xl font-semibold">Gadget.dev Implementation Guide</Heading>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Latest Version</Badge>
        </div>
        
        <div className="flex items-start space-x-2 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <Text className="text-blue-700">
            This guide incorporates the latest Gadget.dev features including Type Route Params, Environment Variable Groups, and improved Shopify connection capabilities.
          </Text>
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
            <li>Environment Variable Groups configured for different deployment stages</li>
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

// Step 3: Configure environment variables and authentication
- Set up API key authentication
- Create Environment Variable Groups for development, staging, and production
- Configure CORS to allow requests from Escentual.com domains
- Set up appropriate role-based access controls`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">2. Implementing Value Calculation Functions with Type-Safe Routes</Heading>
        <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// Define type-safe route parameters
export type ValueCalculationParams = {
  productId: string;
  usageFrequency?: number;
};

// Create a new Gadget.dev action for value calculations
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

// Register this action in your Gadget.dev application with typed params
export default function(gadget) {
  gadget.actions.register("calculateProductValue", calculateProductValue);
  
  // Use type-safe routes for better developer experience
  gadget.routes.get<ValueCalculationParams>(
    "/api/products/:productId/value", 
    { middleware: [gadget.auth.requireApiKey] },
    async (req, res) => {
      // Implementation using typed params
      const { productId, usageFrequency = 1 } = req.params;
      // Rest of implementation
    }
  );
}`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">3. Integration with Escentual.com using Enhanced Shopify Connection</Heading>
        <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// In your Gadget.dev application, use the enhanced Shopify connection
// Configure with API credentials and appropriate scopes

// Example API route implementation with type-safe params
gadget.routes.get<{ id: string }>(
  "/api/products/:id/value", 
  { middleware: [gadget.auth.requireApiKey] },
  async (req, res) => {
    try {
      // Get product details from Escentual.com's Shopify store
      const product = await gadget.connections.shopify.get(\`/products/\${req.params.id}.json\`);
      
      // Get user preferences (if available)
      const usageFrequency = req.query.usageFrequency || 1;
      
      // Calculate value metrics
      const valueMetrics = await calculateProductValue(product.product, usageFrequency);
      
      // Return value metrics
      res.json({
        product: {
          id: product.product.id,
          title: product.product.title,
          price: product.product.variants[0].price
        },
        valueMetrics
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">4. Frontend Integration with Environment-Specific Configuration</Heading>
        <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// Sample React code for frontend integration
// This would be implemented on Escentual.com

import { useState, useEffect } from 'react';
import { useGadgetConnection } from '@gadgetinc/react';

const ProductValueMetrics = ({ productId, environment = "production" }) => {
  const [valueMetrics, setValueMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usageFrequency, setUsageFrequency] = useState(1);
  
  // Use the Gadget React client with environment-specific config
  const { api, isConnected } = useGadgetConnection({
    environment,  // Uses environment variable groups for configuration
    apiKey: process.env.GADGET_API_KEY
  });

  useEffect(() => {
    const fetchValueMetrics = async () => {
      if (!isConnected) return;
      
      setLoading(true);
      try {
        const response = await api.get(
          \`/products/\${productId}/value\`,
          { params: { usageFrequency } }
        );
        setValueMetrics(response.data.valueMetrics);
      } catch (error) {
        console.error("Error fetching value metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchValueMetrics();
  }, [productId, usageFrequency, isConnected, api]);

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

        <Heading className="text-lg font-semibold mb-3">5. Enhanced Security Features</Heading>
        <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// Setting up enhanced security with role-based access
// In your Gadget.dev application

// Define roles and permissions
gadget.roles.define("admin", {
  description: "Full access to all resources",
  permissions: ["*:*"]
});

gadget.roles.define("analyst", {
  description: "Read-only access to value metrics",
  permissions: ["products:read", "valueMetrics:read"]
});

gadget.roles.define("customer", {
  description: "Access to own data only",
  permissions: ["own:read"]
});

// Secure routes with role-based access control
gadget.routes.get(
  "/api/analytics/dashboard", 
  { 
    middleware: [
      gadget.auth.requireApiKey,
      gadget.auth.requireRole(["admin", "analyst"])
    ]
  },
  async (req, res) => {
    // Implementation that requires admin or analyst role
  }
);

// Use environment variables for sensitive configuration
const apiKeys = gadget.env.get("EXTERNAL_API_KEYS");
const shopifySecret = gadget.env.get("SHOPIFY_API_SECRET");`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">6. Deployment with Environment Variable Groups</Heading>
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
                <td className="py-2 px-4 text-sm">Configure Environment Variable Groups</td>
                <td className="py-2 px-4 text-sm">Set up dev, staging, and production environments</td>
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
                <td className="py-2 px-4 text-sm">Create type-safe API endpoints</td>
                <td className="py-2 px-4 text-sm">RESTful endpoints with typed parameters</td>
                <td className="py-2 px-4 text-sm">Required</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm">Set up Escentual.com Shopify connections</td>
                <td className="py-2 px-4 text-sm">API credentials, authentication, data access</td>
                <td className="py-2 px-4 text-sm">Required</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm">Configure CORS</td>
                <td className="py-2 px-4 text-sm">Allow cross-origin requests from Escentual.com</td>
                <td className="py-2 px-4 text-sm">Required</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm">Implement role-based access control</td>
                <td className="py-2 px-4 text-sm">Define roles and secure routes</td>
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
        
        <div className="mt-6 flex space-x-3">
          <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="h-5 w-5 text-blue-600" />
              <h4 className="font-medium text-blue-800">Environment Variable Groups</h4>
            </div>
            <p className="text-sm text-blue-600">
              Use Gadget.dev's Environment Variable Groups to manage configuration across development, staging, and production environments.
            </p>
          </div>
          
          <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <h4 className="font-medium text-purple-800">Type-Safe Routes</h4>
            </div>
            <p className="text-sm text-purple-600">
              Leverage Gadget.dev's typed route parameters for improved type safety and better developer experience.
            </p>
          </div>
          
          <div className="flex-1 p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-800">Enhanced Security</h4>
            </div>
            <p className="text-sm text-green-600">
              Implement role-based access control and use secure environment variables for sensitive configuration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GadgetIntegration;
