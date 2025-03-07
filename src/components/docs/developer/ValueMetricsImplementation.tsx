
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const ValueMetricsImplementation = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Value Metrics Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This guide explains how to implement Escentual Value Metrics in your application
            using our Gadget.dev integration and API endpoints.
          </p>
          
          <Tabs defaultValue="integration">
            <TabsList className="mb-4">
              <TabsTrigger value="integration">Gadget Integration</TabsTrigger>
              <TabsTrigger value="lifecycle">Product Lifecycle</TabsTrigger>
              <TabsTrigger value="code">Code Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="integration">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Setting Up Value Metrics</h3>
                <p>
                  To implement value metrics, you'll need to configure your Gadget.dev application
                  to handle the value calculation logic and expose endpoints for your Shopify store.
                </p>
                
                <Alert className="bg-amber-50 border-amber-200">
                  <InfoIcon className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Value metrics require Shopify Plus metafields access to store and display values.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-gray-50 p-4 rounded-md border text-sm font-mono">
                  <p className="text-gray-700 mb-2">// Gadget.dev function for calculating value metrics</p>
                  <p className="text-blue-700">export function calculateValueScore(product) {'{'}</p>
                  <p className="text-blue-700 pl-4">const costPerDay = product.price / product.averageLifespan;</p>
                  <p className="text-blue-700 pl-4">const reviewScore = product.averageRating * 20; // Scale to 0-100</p>
                  <p className="text-blue-700 pl-4">return (80 - (costPerDay * 10)) + (reviewScore * 0.2);</p>
                  <p className="text-blue-700">{'}'}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lifecycle">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Product Lifecycle Integration</h3>
                <p>
                  Value metrics should be calculated and updated at key points in the product lifecycle:
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>When products are created or updated in Shopify</li>
                  <li>When new customer reviews are submitted</li>
                  <li>After internet data mining operations collect new information</li>
                  <li>On a regular schedule (daily/weekly) to refresh all metrics</li>
                </ul>
                
                <div className="bg-gray-50 p-4 rounded-md border">
                  <p className="font-medium">Recommended Update Flow:</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
                    <li>Shopify webhook triggers Gadget.dev function on product update</li>
                    <li>Gadget calculates new value metrics</li>
                    <li>Metrics are stored in Shopify metafields</li>
                    <li>Frontend displays updated values to customers</li>
                  </ol>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Implementation Examples</h3>
                
                <div>
                  <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                    Shopify Metafields
                  </Badge>
                  <div className="bg-gray-50 p-4 rounded-md border text-sm font-mono">
                    <p className="text-gray-700 mb-2">// Example metafields structure for value metrics</p>
                    <p className="text-blue-700">const valueMetrics = {'{'}</p>
                    <p className="text-blue-700 pl-4">namespace: "value_metrics",</p>
                    <p className="text-blue-700 pl-4">key: "data",</p>
                    <p className="text-blue-700 pl-4">type: "json",</p>
                    <p className="text-blue-700 pl-4">value: {'{'}</p>
                    <p className="text-blue-700 pl-8">value_score: 85,</p>
                    <p className="text-blue-700 pl-8">cost_per_day: 1.24,</p>
                    <p className="text-blue-700 pl-8">lifespan: 90,</p>
                    <p className="text-blue-700 pl-8">updated_at: "{currentYear}-03-15"</p>
                    <p className="text-blue-700 pl-4">{'}'}</p>
                    <p className="text-blue-700">{'}'}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                    API Call Example
                  </Badge>
                  <div className="bg-gray-50 p-4 rounded-md border text-sm font-mono">
                    <p className="text-gray-700 mb-2">// Update value metrics via Gadget.dev API</p>
                    <p className="text-blue-700">async function updateValueMetrics(productId, metrics) {'{'}</p>
                    <p className="text-blue-700 pl-4">const response = await fetch(`https://api.gadget.app/escentual/value-metrics/update`, {'{'}</p>
                    <p className="text-blue-700 pl-8">method: 'POST',</p>
                    <p className="text-blue-700 pl-8">headers: {'{'}</p>
                    <p className="text-blue-700 pl-12">'Content-Type': 'application/json',</p>
                    <p className="text-blue-700 pl-12">'Authorization': `Bearer ${apiKey}`</p>
                    <p className="text-blue-700 pl-8">{'}'},</p>
                    <p className="text-blue-700 pl-8">body: JSON.stringify({'{'}</p>
                    <p className="text-blue-700 pl-12">product_id: productId,</p>
                    <p className="text-blue-700 pl-12">metrics: metrics</p>
                    <p className="text-blue-700 pl-8">{'}'})</p>
                    <p className="text-blue-700 pl-4">{'}'})</p>
                    <p className="text-blue-700 pl-4">return response.json();</p>
                    <p className="text-blue-700">{'}'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Integration Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Shopify Plus:</span> Access to metafields for 
              storing value metrics data
            </li>
            <li>
              <span className="font-medium">Gadget.dev:</span> Account with appropriate 
              plan to handle webhooks and scheduled jobs
            </li>
            <li>
              <span className="font-medium">API Keys:</span> Secure storage and management 
              of API credentials
            </li>
            <li>
              <span className="font-medium">GDPR Compliance:</span> Data handling procedures 
              compliant with Built for Shopify requirements
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueMetricsImplementation;
