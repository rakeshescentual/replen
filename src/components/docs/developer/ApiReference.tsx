
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";

const ApiReference = () => {
  return (
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
  );
};

export default ApiReference;
