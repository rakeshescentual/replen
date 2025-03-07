
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, CheckCircle } from "lucide-react";

const ValueMetricsImplementation = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="space-y-6">
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="text-xl text-blue-800">Value Metrics Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700">
            This guide explains how to implement Escentual Value Metrics in your application
            using our Gadget.dev integration and API endpoints for Shopify Plus stores.
          </p>
          
          <Tabs defaultValue="integration" className="mt-6">
            <TabsList className="mb-4 bg-gray-100 p-1">
              <TabsTrigger value="integration" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Gadget Integration</TabsTrigger>
              <TabsTrigger value="lifecycle" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Product Lifecycle</TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Code Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="integration">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800">Setting Up Value Metrics</h3>
                <p className="text-gray-700">
                  To implement value metrics, you'll need to configure your Gadget.dev application
                  to handle the value calculation logic and expose endpoints for your Shopify store.
                </p>
                
                <Alert className="bg-amber-50 border-amber-200 my-4">
                  <InfoIcon className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Value metrics require Shopify Plus metafields access to store and display values.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm font-mono">
                  <p className="text-slate-500 mb-2">// Gadget.dev function for calculating value metrics</p>
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
                <h3 className="text-lg font-medium text-blue-800">Product Lifecycle Integration</h3>
                <p className="text-gray-700">
                  Value metrics should be calculated and updated at key points in the product lifecycle:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>When products are created or updated in Shopify</li>
                  <li>When new customer reviews are submitted</li>
                  <li>After internet data mining operations collect new information</li>
                  <li>On a regular schedule (daily/weekly) to refresh all metrics</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-4">
                  <p className="font-medium text-blue-800">Recommended Update Flow:</p>
                  <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm text-blue-900">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Shopify webhook triggers Gadget.dev function on product update</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gadget calculates new value metrics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Metrics are stored in Shopify metafields</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Frontend displays updated values to customers</span>
                    </li>
                  </ol>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="code">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-800">Implementation Examples</h3>
                
                <div>
                  <Badge className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                    Shopify Metafields
                  </Badge>
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm font-mono">
                    <p className="text-slate-500 mb-2">// Example metafields structure for value metrics</p>
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
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-sm font-mono">
                    <p className="text-slate-500 mb-2">// Update value metrics via Gadget.dev API</p>
                    <p className="text-blue-700">async function updateValueMetrics(productId, metrics) {'{'}</p>
                    <p className="text-blue-700 pl-4">const response = await fetch(`https://api.gadget.app/escentual/value-metrics/update`, {'{'}</p>
                    <p className="text-blue-700 pl-8">method: 'POST',</p>
                    <p className="text-blue-700 pl-8">headers: {'{'}</p>
                    <p className="text-blue-700 pl-12">'Content-Type': 'application/json',</p>
                    <p className="text-blue-700 pl-12">'Authorization': `Bearer ${process.env.GADGET_API_KEY || 'YOUR_API_KEY'}`</p>
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
      
      <Card className="border-blue-100 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="text-xl text-blue-800">Integration Requirements</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3 mt-0.5 flex-shrink-0">1</div>
                <div>
                  <span className="font-medium text-gray-900">Shopify Plus:</span>
                  <p className="text-gray-700 text-sm mt-0.5">Access to metafields for storing value metrics data</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3 mt-0.5 flex-shrink-0">2</div>
                <div>
                  <span className="font-medium text-gray-900">Gadget.dev:</span>
                  <p className="text-gray-700 text-sm mt-0.5">Account with appropriate plan to handle webhooks and scheduled jobs</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3 mt-0.5 flex-shrink-0">3</div>
                <div>
                  <span className="font-medium text-gray-900">API Keys:</span>
                  <p className="text-gray-700 text-sm mt-0.5">Secure storage and management of API credentials</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3 mt-0.5 flex-shrink-0">4</div>
                <div>
                  <span className="font-medium text-gray-900">GDPR Compliance:</span>
                  <p className="text-gray-700 text-sm mt-0.5">Data handling procedures compliant with Built for Shopify requirements</p>
                </div>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueMetricsImplementation;
