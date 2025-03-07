
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";
import { Badge } from "@/components/ui/badge";

const GadgetIntegration = () => {
  return (
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

const ProductValueMetrics = ({ productId = "123" }) => {
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
  );
};

export default GadgetIntegration;
