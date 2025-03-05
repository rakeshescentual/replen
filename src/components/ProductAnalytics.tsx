
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { DollarSign, Clock, Clipboard, Check, ArrowRight, ExternalLink } from "lucide-react";
import { ShopifyMetafieldService } from "@/utils/ShopifyMetafieldService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGadgetAPI } from "@/hooks/useGadgetAPI";

// Mock product data with analytics - in a real app, this would come from the PredictiveAnalysisService
const productAnalytics = [
  {
    id: "1",
    title: "Daily Face Moisturizer",
    category: "Skincare",
    averageLifespan: 32,
    pricePerUnit: 24.99,
    costPerDay: 0.78,
    reviewScore: 4.7,
    metafieldStatus: "ready"
  },
  {
    id: "2",
    title: "Anti-Aging Serum",
    category: "Skincare",
    averageLifespan: 58,
    pricePerUnit: 49.99,
    costPerDay: 0.86,
    reviewScore: 4.5,
    metafieldStatus: "ready"
  },
  {
    id: "3",
    title: "Vitamin C Supplements",
    category: "Supplements",
    averageLifespan: 89,
    pricePerUnit: 29.99,
    costPerDay: 0.34,
    reviewScore: 4.8,
    metafieldStatus: "ready"
  },
  {
    id: "4",
    title: "Shampoo",
    category: "Hair Care",
    averageLifespan: 42,
    pricePerUnit: 18.99,
    costPerDay: 0.45,
    reviewScore: 4.6,
    metafieldStatus: "ready"
  },
  {
    id: "5",
    title: "Toothpaste",
    category: "Oral Care",
    averageLifespan: 32,
    pricePerUnit: 5.99,
    costPerDay: 0.19,
    reviewScore: 4.4,
    metafieldStatus: "ready"
  }
];

const ProductAnalytics = () => {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [metafieldNamespace, setMetafieldNamespace] = useState("escentual");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const { isLoading } = useGadgetAPI();

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

  const escentualThemeLiquidSnippet = `{% if product.metafields.${metafieldNamespace}.average_lifespan and product.metafields.${metafieldNamespace}.cost_per_day %}
<div class="escentual-product-value-widget">
  <div class="epvw-heading">Product Value Analysis</div>
  
  <div class="epvw-metrics">
    <div class="epvw-metric">
      <div class="epvw-metric-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="epvw-metric-content">
        <div class="epvw-metric-label">Lasts approximately</div>
        <div class="epvw-metric-value">{{ product.metafields.${metafieldNamespace}.average_lifespan }} days</div>
      </div>
    </div>
    
    <div class="epvw-metric">
      <div class="epvw-metric-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      </div>
      <div class="epvw-metric-content">
        <div class="epvw-metric-label">Cost per day</div>
        <div class="epvw-metric-value">£{{ product.metafields.${metafieldNamespace}.cost_per_day }}</div>
      </div>
    </div>
  </div>
  
  {% if product.metafields.${metafieldNamespace}.confidence_score %}
  <div class="epvw-footer">
    Based on {{ product.metafields.${metafieldNamespace}.data_points }} customer reviews
  </div>
  {% endif %}
</div>

<style>
  .escentual-product-value-widget {
    margin: 20px 0;
    padding: 16px;
    border-radius: 6px;
    background-color: #f8f9fa;
    border: 1px solid #e2e8f0;
    font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }
  
  .epvw-heading {
    font-size: 15px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .epvw-metrics {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  .epvw-metric {
    flex: 1;
    min-width: 140px;
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  
  .epvw-metric-icon {
    background-color: #f0f4ff;
    color: #3b82f6;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-right: 12px;
  }
  
  .epvw-metric-content {
    flex: 1;
  }
  
  .epvw-metric-label {
    font-size: 12px;
    color: #64748b;
    margin-bottom: 2px;
  }
  
  .epvw-metric-value {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }
  
  .epvw-footer {
    margin-top: 12px;
    font-size: 12px;
    color: #64748b;
    text-align: right;
    font-style: italic;
  }
  
  @media (max-width: 640px) {
    .epvw-metrics {
      flex-direction: column;
    }
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

  const graphqlMetafieldCreationSnippet = `# GraphQL version for Shopify Admin API 2023-10
# First, create metafield definitions using the Shopify Admin API

mutation CreateLifespanMetafieldDefinition {
  metafieldDefinitionCreate(
    definition: {
      name: "Average Lifespan"
      namespace: "${metafieldNamespace}"
      key: "average_lifespan"
      description: "The average number of days this product lasts for a typical customer"
      type: "number_integer"
      ownerType: PRODUCT
    }
  ) {
    createdDefinition {
      id
      name
    }
    userErrors {
      field
      message
    }
  }
}

mutation CreateCostPerDayMetafieldDefinition {
  metafieldDefinitionCreate(
    definition: {
      name: "Cost Per Day"
      namespace: "${metafieldNamespace}"
      key: "cost_per_day"
      description: "The average cost per day of using this product"
      type: "number_decimal"
      ownerType: PRODUCT
    }
  ) {
    createdDefinition {
      id
      name
    }
    userErrors {
      field
      message
    }
  }
}

mutation CreateConfidenceScoreMetafieldDefinition {
  metafieldDefinitionCreate(
    definition: {
      name: "Confidence Score"
      namespace: "${metafieldNamespace}"
      key: "confidence_score"
      description: "Confidence score for the lifespan prediction (0-1)"
      type: "number_decimal"
      ownerType: PRODUCT
    }
  ) {
    createdDefinition {
      id
      name
    }
    userErrors {
      field
      message
    }
  }
}

mutation CreateDataPointsMetafieldDefinition {
  metafieldDefinitionCreate(
    definition: {
      name: "Data Points"
      namespace: "${metafieldNamespace}"
      key: "data_points"
      description: "Number of data points used for this prediction"
      type: "number_integer"
      ownerType: PRODUCT
    }
  ) {
    createdDefinition {
      id
      name
    }
    userErrors {
      field
      message
    }
  }
}

# Then, to update metafields for a specific product:

mutation UpdateProductMetafields {
  productUpdate(
    input: {
      id: "gid://shopify/Product/YOUR_PRODUCT_ID"
      metafields: [
        {
          namespace: "${metafieldNamespace}"
          key: "average_lifespan"
          value: "32"
          type: "number_integer"
        },
        {
          namespace: "${metafieldNamespace}"
          key: "cost_per_day"
          value: "0.78"
          type: "number_decimal"
        },
        {
          namespace: "${metafieldNamespace}"
          key: "confidence_score"
          value: "0.85"
          type: "number_decimal"
        },
        {
          namespace: "${metafieldNamespace}"
          key: "data_points"
          value: "125"
          type: "number_integer"
        }
      ]
    }
  ) {
    product {
      id
      title
    }
    userErrors {
      field
      message
    }
  }
}`;

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

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const syncSelectedProductsToShopify = async () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No products selected",
        description: "Please select at least one product to sync",
        variant: "destructive"
      });
      return;
    }

    setSyncStatus('syncing');
    
    try {
      // For each selected product, sync its metafields with Shopify
      for (const productId of selectedProducts) {
        const product = productAnalytics.find(p => p.id === productId);
        if (product) {
          await ShopifyMetafieldService.syncProductMetafields({
            productId: productId,
            metafields: {
              average_lifespan: product.averageLifespan,
              cost_per_day: product.costPerDay,
              confidence_score: 0.85, // Example value, should come from prediction service
              data_points: 125 // Example value, should come from prediction service
            },
            namespace: metafieldNamespace
          });
        }
      }
      
      setSyncStatus('success');
      toast({
        title: "Sync successful",
        description: `${selectedProducts.length} products synced to Shopify`
      });
      
      // Clear selection after successful sync
      setSelectedProducts([]);
      
      // Reset status after a delay
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
      setSyncStatus('error');
      toast({
        title: "Sync failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      
      // Reset status after a delay
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  return (
    <div>
      <Heading className="text-xl font-medium mb-2">Escentual.com Product Value Integration</Heading>
      <Text className="mb-6">
        Share valuable product lifespan insights with your customers on your Escentual.com Shopify store. 
        This data shows the average lifespan of products and their cost per day, helping customers make informed purchasing decisions.
      </Text>
      
      <Card className="mb-6 p-4 border border-dashed border-blue-300 bg-blue-50">
        <div className="flex items-start">
          <div className="mr-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </div>
          <div>
            <Text className="text-sm font-medium text-blue-600">Escentual.com Integration Guide</Text>
            <Text className="text-sm text-blue-800 mb-3">
              Follow these steps to integrate product lifespan data with your Escentual.com Shopify Plus store:
            </Text>
            <ol className="list-decimal pl-5 text-sm text-blue-800 space-y-2">
              <li>Create the metafield definitions for product lifespan data using the Shopify Admin API</li>
              <li>Select a Liquid snippet style and add it to your product template</li>
              <li>Use this tool to sync your predicted values with your Shopify store</li>
            </ol>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="implementation" className="w-full">
        <TabsList className="mb-6 w-full md:w-auto">
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="preview">Preview Styles</TabsTrigger>
          <TabsTrigger value="sync">Sync Data</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>
        
        <TabsContent value="implementation">
          <div className="mb-6">
            <Heading className="text-lg font-medium mb-4">1. Configure Metafield Namespace</Heading>
            <Text className="mb-4">
              Customize the namespace for your metafields to avoid conflicts with other apps.
              The default namespace "<strong>escentual</strong>" is recommended for Escentual.com.
            </Text>
            
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-2">
              <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metafield Namespace
                </label>
                <Input 
                  value={metafieldNamespace}
                  onChange={updateMetafieldNamespace}
                  placeholder="escentual"
                />
              </div>
              <div className="text-sm text-gray-500 flex-1 pt-6">
                This namespace will be used for all product lifespan metafields
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <Heading className="text-lg font-medium mb-4">2. Create Metafield Definitions</Heading>
            <Text className="mb-4">
              Select your preferred API format and run these commands to create the necessary metafield definitions in your Shopify store.
            </Text>
            
            <Tabs defaultValue="rest" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="rest">REST API</TabsTrigger>
                <TabsTrigger value="graphql">GraphQL</TabsTrigger>
              </TabsList>
              
              <TabsContent value="rest">
                <Card className="relative p-4 border bg-gray-50">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopySnippet(metafieldCreationSnippet, "metafield-rest")}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy code"
                    >
                      {copiedSnippet === "metafield-rest" ? <Check size={18} /> : <Clipboard size={18} />}
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {metafieldCreationSnippet}
                  </pre>
                  <Text className="text-xs text-gray-500 mt-2">
                    Run these commands in your terminal to create the required metafield definitions. Replace SHOP_NAME and ADMIN_API_ACCESS_TOKEN with your values.
                  </Text>
                </Card>
              </TabsContent>
              
              <TabsContent value="graphql">
                <Card className="relative p-4 border bg-gray-50">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopySnippet(graphqlMetafieldCreationSnippet, "metafield-graphql")}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy code"
                    >
                      {copiedSnippet === "metafield-graphql" ? <Check size={18} /> : <Clipboard size={18} />}
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {graphqlMetafieldCreationSnippet}
                  </pre>
                  <Text className="text-xs text-gray-500 mt-2">
                    These GraphQL mutations can be run in the Shopify Admin API Explorer. Replace YOUR_PRODUCT_ID with the actual Shopify product ID.
                  </Text>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mb-8">
            <Heading className="text-lg font-medium mb-4">3. Add to Product Template</Heading>
            <Text className="mb-4">
              Choose one of the Liquid snippet styles below and add it to your product template where you want to display the product lifespan data.
            </Text>
            
            <Tabs defaultValue="escentual" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="escentual">Escentual-Themed</TabsTrigger>
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="escentual">
                <Card className="relative p-4 border bg-gray-50">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopySnippet(escentualThemeLiquidSnippet, "escentual-theme")}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy code"
                    >
                      {copiedSnippet === "escentual-theme" ? <Check size={18} /> : <Clipboard size={18} />}
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {escentualThemeLiquidSnippet}
                  </pre>
                  <Text className="text-xs text-gray-500 mt-2">
                    This snippet is specifically styled to match Escentual.com's design system. Add it to your product-template.liquid file.
                  </Text>
                </Card>
              </TabsContent>
              
              <TabsContent value="basic">
                <Card className="relative p-4 border bg-gray-50">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopySnippet(basicLiquidSnippet, "basic")}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy code"
                    >
                      {copiedSnippet === "basic" ? <Check size={18} /> : <Clipboard size={18} />}
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {basicLiquidSnippet}
                  </pre>
                  <Text className="text-xs text-gray-500 mt-2">
                    A simple, minimal snippet that displays the basic product lifespan information.
                  </Text>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Card className="relative p-4 border bg-gray-50">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleCopySnippet(advancedLiquidSnippet, "advanced")}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy code"
                    >
                      {copiedSnippet === "advanced" ? <Check size={18} /> : <Clipboard size={18} />}
                    </button>
                  </div>
                  <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                    {advancedLiquidSnippet}
                  </pre>
                  <Text className="text-xs text-gray-500 mt-2">
                    An enhanced snippet with advanced styling and more detailed product information.
                  </Text>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="mb-6">
            <Heading className="text-lg font-medium mb-4">Preview Widget Styles</Heading>
            <Text className="mb-4">
              See how each widget style will look on your Escentual.com product page. Choose the style that best matches your brand.
            </Text>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-3">Escentual Theme Style</Heading>
                <div className="p-4 border rounded-md mb-3">
                  <div className="mb-4">
                    <div className="text-lg font-medium">Anti-Aging Serum</div>
                    <div className="text-sm text-gray-500">Skincare</div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <div className="text-sm font-semibold uppercase mb-3 text-gray-700 tracking-wide">Product Value Analysis</div>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex-1 min-w-32 bg-white p-3 rounded-md shadow-sm flex items-center">
                        <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mr-3">
                          <Clock size={16} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Lasts approximately</div>
                          <div className="text-base font-bold">58 days</div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-32 bg-white p-3 rounded-md shadow-sm flex items-center">
                        <div className="w-8 h-8 rounded-md bg-green-50 text-green-600 flex items-center justify-center mr-3">
                          <DollarSign size={16} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Cost per day</div>
                          <div className="text-base font-bold">£0.86</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-right mt-3 italic">
                      Based on 156 customer reviews
                    </div>
                  </div>
                </div>
                <div className="text-sm text-center">
                  Styled specifically for Escentual.com
                </div>
              </Card>
              
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-3">Basic Style</Heading>
                <div className="p-4 border rounded-md mb-3">
                  <div className="mb-4">
                    <div className="text-lg font-medium">Anti-Aging Serum</div>
                    <div className="text-sm text-gray-500">Skincare</div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock size={18} className="text-purple-600 mr-2" />
                        <span>Lasts approximately <strong>58 days</strong></span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={18} className="text-green-600 mr-2" />
                        <span>Only <strong>£0.86</strong> per day</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-center">
                  Simple, minimalist style
                </div>
              </Card>
              
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-3">Advanced Style</Heading>
                <div className="p-4 border rounded-md mb-3">
                  <div className="mb-4">
                    <div className="text-lg font-medium">Anti-Aging Serum</div>
                    <div className="text-sm text-gray-500">Skincare</div>
                  </div>
                  <div className="p-4 border rounded-md bg-gradient-to-br from-purple-50 to-blue-50">
                    <div className="text-base font-medium mb-3">Product Value Analysis</div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Average Lifespan</div>
                        <div className="flex items-center">
                          <Clock size={16} className="text-purple-600 mr-2" />
                          <span className="text-lg font-medium">58 days</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white rounded-md shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Cost Per Day</div>
                        <div className="flex items-center">
                          <DollarSign size={16} className="text-green-600 mr-2" />
                          <span className="text-lg font-medium">£0.86</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-center bg-blue-100 p-2 rounded-md">
                      Based on data from 156 customers
                    </div>
                  </div>
                </div>
                <div className="text-sm text-center">
                  Enhanced style with gradient background
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sync">
          <div className="mb-8">
            <Heading className="text-lg font-medium mb-4">Sync Data to Shopify Metafields</Heading>
            <Text className="mb-4">
              Select products below to sync their lifespan data to your Shopify store metafields. 
              This will update the product metafields with the latest predicted values.
            </Text>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <span className="font-medium">{selectedProducts.length}</span> products selected
              </div>
              <Button 
                onClick={syncSelectedProductsToShopify}
                disabled={selectedProducts.length === 0 || isLoading || syncStatus === 'syncing'}
                className="flex items-center gap-2"
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                  </>
                ) : (
                  <>
                    <ArrowRight size={16} />
                    Sync to Shopify
                  </>
                )}
              </Button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 rounded border-gray-300"
                          checked={selectedProducts.length === productAnalytics.length}
                          onChange={() => {
                            if (selectedProducts.length === productAnalytics.length) {
                              setSelectedProducts([]);
                            } else {
                              setSelectedProducts(productAnalytics.map(p => p.id));
                            }
                          }}
                        />
                      </div>
                    </TableHead>
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productAnalytics.map((product) => (
                    <TableRow key={product.id} className={`hover:bg-gray-50 ${selectedProducts.includes(product.id) ? 'bg-blue-50' : ''}`}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 rounded border-gray-300"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleProductSelection(product.id)}
                          />
                        </div>
                      </TableCell>
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
        </TabsContent>
        
        <TabsContent value="api">
          <div className="mb-8">
            <Heading className="text-lg font-medium mb-4">API Reference</Heading>
            <Text className="mb-4">
              Technical reference for developers integrating with the Shopify metafields API for Escentual.com.
            </Text>
            
            <div className="space-y-6">
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-2">Metafield Structure</Heading>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metafield</TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Average Lifespan</TableCell>
                        <TableCell><code className="bg-gray-100 px-2 py-1 rounded">average_lifespan</code></TableCell>
                        <TableCell>number_integer</TableCell>
                        <TableCell>Number of days the product typically lasts</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Cost Per Day</TableCell>
                        <TableCell><code className="bg-gray-100 px-2 py-1 rounded">cost_per_day</code></TableCell>
                        <TableCell>number_decimal</TableCell>
                        <TableCell>Daily cost of using the product (price ÷ lifespan)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Confidence Score</TableCell>
                        <TableCell><code className="bg-gray-100 px-2 py-1 rounded">confidence_score</code></TableCell>
                        <TableCell>number_decimal</TableCell>
                        <TableCell>Algorithm confidence in prediction (0-1)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Data Points</TableCell>
                        <TableCell><code className="bg-gray-100 px-2 py-1 rounded">data_points</code></TableCell>
                        <TableCell>number_integer</TableCell>
                        <TableCell>Number of data points used for prediction</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Card>
              
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-2">API Endpoints</Heading>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Get Product Metafields</h3>
                    <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                      GET /admin/api/2023-10/products/{'{product_id}'}/metafields.json
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Create/Update Product Metafield</h3>
                    <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
                      POST /admin/api/2023-10/products/{'{product_id}'}/metafields.json
{`
{
  "metafield": {
    "namespace": "${metafieldNamespace}",
    "key": "average_lifespan",
    "value": 58,
    "type": "number_integer"
  }
}
`}
                    </pre>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Shopify Storefront API Example</h3>
                    <pre className="text-xs overflow-x-auto p-2 bg-gray-100 rounded">
{`query ProductWithMetafields {
  product(handle: "anti-aging-serum") {
    id
    title
    metafields(
      identifiers: [
        { namespace: "${metafieldNamespace}", key: "average_lifespan" },
        { namespace: "${metafieldNamespace}", key: "cost_per_day" }
      ]
    ) {
      id
      key
      value
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 border">
                <div className="flex justify-between items-start">
                  <Heading className="text-base font-medium">Additional Resources</Heading>
                  <a 
                    href="https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/metafieldDefinitionCreate" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center text-sm"
                  >
                    Shopify Docs <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>
                    <a href="https://shopify.dev/docs/apps/metafields" className="text-blue-600 hover:underline">
                      Shopify Metafields Documentation
                    </a>
                  </li>
                  <li>
                    <a href="https://shopify.dev/docs/api/liquid/objects/metafield" className="text-blue-600 hover:underline">
                      Metafield Liquid Object Reference
                    </a>
                  </li>
                  <li>
                    <a href="https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/metafieldDefinitionCreate" className="text-blue-600 hover:underline">
                      Creating Metafield Definitions (GraphQL)
                    </a>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="p-6 border-blue-200 border bg-blue-50 mt-8">
        <Heading className="text-lg font-medium mb-3">Implementation Notes for Escentual.com</Heading>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>The widget automatically handles cases where lifespan data is not available for a product</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>For Escentual.com's multi-currency store, the currency symbol will automatically match the customer's selected currency</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Responsive design ensures proper display on all device sizes, following Escentual.com's mobile-first approach</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>For best results, place the widget near product price information or below the add-to-cart button</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>The CSS in the snippets uses classes prefixed with "escentual-" or "epvw-" to avoid conflicts with your theme</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ProductAnalytics;
