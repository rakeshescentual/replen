
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { DollarSign, Clock, Code, Clipboard, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock product data with analytics - in a real app, this would come from the PredictiveAnalysisService
const productAnalytics = [
  {
    id: "1",
    title: "Daily Face Moisturizer",
    category: "Skincare",
    averageLifespan: 32,
    pricePerUnit: 24.99,
    costPerDay: 0.78,
    reviewScore: 4.7
  },
  {
    id: "2",
    title: "Anti-Aging Serum",
    category: "Skincare",
    averageLifespan: 58,
    pricePerUnit: 49.99,
    costPerDay: 0.86,
    reviewScore: 4.5
  },
  {
    id: "3",
    title: "Vitamin C Supplements",
    category: "Supplements",
    averageLifespan: 89,
    pricePerUnit: 29.99,
    costPerDay: 0.34,
    reviewScore: 4.8
  },
  {
    id: "4",
    title: "Shampoo",
    category: "Hair Care",
    averageLifespan: 42,
    pricePerUnit: 18.99,
    costPerDay: 0.45,
    reviewScore: 4.6
  },
  {
    id: "5",
    title: "Toothpaste",
    category: "Oral Care",
    averageLifespan: 32,
    pricePerUnit: 5.99,
    costPerDay: 0.19,
    reviewScore: 4.4
  }
];

const ProductAnalytics = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [shopifyApiKey, setShopifyApiKey] = useState("");
  const [metafieldNamespace, setMetafieldNamespace] = useState("escentual");

  // Shopify Liquid code snippets
  const basicLiquidSnippet = `{% if product.metafields.${metafieldNamespace}.average_lifespan and product.metafields.${metafieldNamespace}.cost_per_day %}
<div class="escentual-product-analytics">
  <div class="escentual-analytics-item">
    <span class="escentual-analytics-icon">⏱️</span>
    <span class="escentual-analytics-text">Lasts approximately <strong>{{ product.metafields.${metafieldNamespace}.average_lifespan }}</strong> days</span>
  </div>
  <div class="escentual-analytics-item">
    <span class="escentual-analytics-icon">💰</span>
    <span class="escentual-analytics-text">Only <strong>£{{ product.metafields.${metafieldNamespace}.cost_per_day }}</strong> per day</span>
  </div>
</div>
{% endif %}`;

  const advancedLiquidSnippet = `{% if product.metafields.${metafieldNamespace}.average_lifespan and product.metafields.${metafieldNamespace}.cost_per_day %}
<div class="escentual-product-analytics-advanced">
  <h3 class="escentual-analytics-title">Product Value Analysis</h3>
  <div class="escentual-analytics-grid">
    <div class="escentual-analytics-card">
      <div class="escentual-analytics-card-label">Average Lifespan</div>
      <div class="escentual-analytics-card-value">{{ product.metafields.${metafieldNamespace}.average_lifespan }} days</div>
    </div>
    <div class="escentual-analytics-card">
      <div class="escentual-analytics-card-label">Cost Per Day</div>
      <div class="escentual-analytics-card-value">£{{ product.metafields.${metafieldNamespace}.cost_per_day }}</div>
    </div>
  </div>
  {% if product.metafields.${metafieldNamespace}.confidence_score %}
  <div class="escentual-analytics-footer">
    Based on data from {{ product.metafields.${metafieldNamespace}.data_points }} customer reviews
  </div>
  {% endif %}
</div>

<style>
  .escentual-product-analytics-advanced {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: linear-gradient(to right, #f9fafb, #f3f4f6);
  }
  .escentual-analytics-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #374151;
  }
  .escentual-analytics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }
  .escentual-analytics-card {
    background: white;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  }
  .escentual-analytics-card-label {
    font-size: 12px;
    color: #6b7280;
    margin-bottom: 4px;
  }
  .escentual-analytics-card-value {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
  .escentual-analytics-footer {
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    margin-top: 8px;
  }
</style>
{% endif %}`;

  const metafieldCreationSnippet = `# Metafield Definitions for Shopify Admin API

# Create average_lifespan metafield definition
curl -X POST \\
  "https://\${SHOP_NAME}.myshopify.com/admin/api/2023-10/metafield_definitions.json" \\
  -H "X-Shopify-Access-Token: \${ADMIN_API_ACCESS_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metafield_definition": {
      "name": "Average Lifespan",
      "namespace": "${metafieldNamespace}",
      "key": "average_lifespan",
      "description": "The average number of days this product lasts for a typical customer",
      "type": "number_integer",
      "ownerType": "PRODUCT"
    }
  }'

# Create cost_per_day metafield definition
curl -X POST \\
  "https://\${SHOP_NAME}.myshopify.com/admin/api/2023-10/metafield_definitions.json" \\
  -H "X-Shopify-Access-Token: \${ADMIN_API_ACCESS_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metafield_definition": {
      "name": "Cost Per Day",
      "namespace": "${metafieldNamespace}",
      "key": "cost_per_day",
      "description": "The average cost per day of using this product",
      "type": "number_decimal",
      "ownerType": "PRODUCT"
    }
  }'

# Create confidence_score metafield definition
curl -X POST \\
  "https://\${SHOP_NAME}.myshopify.com/admin/api/2023-10/metafield_definitions.json" \\
  -H "X-Shopify-Access-Token: \${ADMIN_API_ACCESS_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metafield_definition": {
      "name": "Confidence Score",
      "namespace": "${metafieldNamespace}",
      "key": "confidence_score",
      "description": "Confidence score for the lifespan prediction (0-1)",
      "type": "number_decimal",
      "ownerType": "PRODUCT"
    }
  }'

# Create data_points metafield definition
curl -X POST \\
  "https://\${SHOP_NAME}.myshopify.com/admin/api/2023-10/metafield_definitions.json" \\
  -H "X-Shopify-Access-Token: \${ADMIN_API_ACCESS_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "metafield_definition": {
      "name": "Data Points",
      "namespace": "${metafieldNamespace}",
      "key": "data_points",
      "description": "Number of data points used for this prediction",
      "type": "number_integer",
      "ownerType": "PRODUCT"
    }
  }'`;

  const handleCopySnippet = (snippet: string, type: string) => {
    navigator.clipboard.writeText(snippet).then(() => {
      toast({
        title: "Copied!",
        description: `${type} snippet copied to clipboard`,
      });
      setCopiedSnippet(type);
      setTimeout(() => setCopiedSnippet(null), 2000);
    });
  };

  const updateMetafieldNamespace = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetafieldNamespace(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'));
  };

  return (
    <div>
      <Heading className="text-xl font-medium mb-6">Product Value Analytics Integration</Heading>
      <Text className="mb-6">
        This data shows the average lifespan of products based on customer usage patterns, along with the calculated cost per day. 
        Use these Shopify Liquid snippets to add this information to your product pages.
      </Text>
      
      <Card className="mb-6 p-4 border border-dashed border-blue-300 bg-blue-50">
        <div className="flex items-start">
          <div className="mr-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </div>
          <div>
            <Text className="text-sm font-medium text-blue-600">Shopify Plus Integration</Text>
            <Text className="text-sm text-blue-800 mb-3">
              Follow these steps to integrate product lifespan data with your Escentual.com Shopify Plus store:
            </Text>
            <ol className="list-decimal pl-5 text-sm text-blue-800 space-y-2">
              <li>Create the metafield definitions for product lifespan data using the Admin API</li>
              <li>Insert one of the Liquid code snippets into your product template</li>
              <li>Use our app to automatically update the metafields with predicted values</li>
            </ol>
          </div>
        </div>
      </Card>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Metafield Namespace (default: escentual)
        </label>
        <Input 
          value={metafieldNamespace}
          onChange={updateMetafieldNamespace}
          placeholder="escentual"
          className="max-w-md"
        />
        <p className="mt-1 text-xs text-gray-500">
          This namespace will be used for all metafields to avoid conflicts with other apps.
        </p>
      </div>

      <div className="mb-8">
        <Heading className="text-lg font-medium mb-4">1. Create Metafield Definitions</Heading>
        <Card className="relative p-4 border bg-gray-50">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => handleCopySnippet(metafieldCreationSnippet, "metafield")}
              className="p-2 text-gray-500 hover:text-gray-700"
              title="Copy code"
            >
              {copiedSnippet === "metafield" ? <Check size={18} /> : <Clipboard size={18} />}
            </button>
          </div>
          <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
            {metafieldCreationSnippet}
          </pre>
          <Text className="text-xs text-gray-500 mt-2">
            Run these commands in your terminal to create the required metafield definitions. Replace SHOP_NAME and ADMIN_API_ACCESS_TOKEN with your values.
          </Text>
        </Card>
      </div>
      
      <div className="mb-8">
        <Heading className="text-lg font-medium mb-4">2. Choose a Liquid Snippet</Heading>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-4 border relative">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleCopySnippet(basicLiquidSnippet, "basic")}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Copy code"
              >
                {copiedSnippet === "basic" ? <Check size={18} /> : <Clipboard size={18} />}
              </button>
            </div>
            <Heading className="text-base font-medium mb-3">Basic Liquid Snippet</Heading>
            <div className="bg-gray-50 p-4 rounded-md mb-3 h-52 overflow-auto">
              <pre className="text-xs overflow-x-auto">
                {basicLiquidSnippet}
              </pre>
            </div>
            <div className="p-4 border rounded-md">
              <div className="mb-4">
                <div className="text-lg font-medium">Daily Face Moisturizer</div>
                <div className="text-sm text-gray-500">Skincare</div>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <div className="flex items-center">
                  <Clock size={18} className="text-purple-600 mr-2" />
                  <span>Lasts approximately <strong>32 days</strong></span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={18} className="text-green-600 mr-2" />
                  <span>Only <strong>£0.78</strong> per day</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 border relative">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleCopySnippet(advancedLiquidSnippet, "advanced")}
                className="p-2 text-gray-500 hover:text-gray-700"
                title="Copy code"
              >
                {copiedSnippet === "advanced" ? <Check size={18} /> : <Clipboard size={18} />}
              </button>
            </div>
            <Heading className="text-base font-medium mb-3">Advanced Liquid Snippet</Heading>
            <div className="bg-gray-50 p-4 rounded-md mb-3 h-52 overflow-auto">
              <pre className="text-xs overflow-x-auto">
                {advancedLiquidSnippet}
              </pre>
            </div>
            <div className="p-4 border rounded-md bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="mb-4">
                <div className="text-lg font-medium">Daily Face Moisturizer</div>
                <div className="text-sm text-gray-500">Skincare</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Average Lifespan</div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-purple-600 mr-2" />
                    <span className="text-lg font-medium">32 days</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Cost Per Day</div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-green-600 mr-2" />
                    <span className="text-lg font-medium">£0.78</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-center bg-blue-100 p-2 rounded-md">
                Based on data from 1,432 customers
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <Heading className="text-lg font-medium mb-4">3. Product Data Sync</Heading>
        <Text className="mb-4">
          The table below shows the product data that will be synchronized with your Shopify store metafields. 
          This data is updated automatically based on customer feedback and usage patterns.
        </Text>
        
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Avg. Lifespan</span>
                  </div>
                </TableHead>
                <TableHead>Price</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    <span>Cost Per Day</span>
                  </div>
                </TableHead>
                <TableHead>Metafield Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productAnalytics.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.averageLifespan} days</TableCell>
                  <TableCell>£{product.pricePerUnit.toFixed(2)}</TableCell>
                  <TableCell>£{product.costPerDay.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ready to sync
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Card className="p-6 border-blue-200 border bg-blue-50">
        <Heading className="text-lg font-medium mb-3">Implementation Notes for Escentual.com</Heading>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Add the Liquid snippet to your product-template.liquid file where you want the analytics to appear</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Metafield values will be updated automatically when predictions change</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>For international stores, the currency symbol will need to be adjusted in the Liquid snippets</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>The styling can be customized to match your Escentual.com theme by modifying the CSS</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ProductAnalytics;
