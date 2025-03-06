
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ValueMetricsOverview from "./value-metrics/ValueMetricsOverview";
import ValueMetricsBenefits from "./value-metrics/ValueMetricsBenefits";
import ValueMetricsRealWorldExamples from "./value-metrics/ValueMetricsRealWorldExamples";
import ValueMetricsDataTable from "./value-metrics/ValueMetricsDataTable";
import CostPerUseMetrics from "./value-metrics/CostPerUseMetrics";
import ProductLongevityMetrics from "./value-metrics/ProductLongevityMetrics";
import ValueComparisonAnalysis from "./value-metrics/ValueComparisonAnalysis";
import InternetDataMiningInfo from "./value-metrics/InternetDataMiningInfo";
import ValueMetricsCrawlingInfo from "./value-metrics/ValueMetricsCrawlingInfo";
import DataInsightsPanel from "./value-metrics/DataInsightsPanel";
import ValueIntelligenceSystem from "./value-metrics/ValueIntelligenceSystem";
import { Separator } from "@/components/ui/separator";
import QuickValueCalculator from "@/components/QuickValueCalculator";
import { Badge } from "@/components/ui/badge";
import { Database, Server, ArrowUpRight } from "lucide-react";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading className="text-2xl font-bold">Value Metrics System</Heading>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Gadget.dev Ready</Badge>
        </div>
        
        <Text className="mb-6">
          The Escentual Value Metrics system provides sophisticated analysis of product value, helping customers
          understand why premium products are worth the investment through data-driven insights.
        </Text>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
            <div className="flex items-start mb-3">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Gadget.dev Backend</h3>
                <p className="text-sm text-blue-700">Value calculations powered by Gadget.dev</p>
              </div>
            </div>
            <ul className="space-y-2 pl-11">
              <li className="text-sm text-blue-700 flex items-center">
                <span className="bg-blue-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Scalable API endpoints for value metrics
              </li>
              <li className="text-sm text-blue-700 flex items-center">
                <span className="bg-blue-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Secure data storage for product analysis
              </li>
              <li className="text-sm text-blue-700 flex items-center">
                <span className="bg-blue-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Real-time calculation of value scores
              </li>
              <li className="text-sm text-blue-700 flex items-center">
                <span className="bg-blue-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Seamless integration with Escentual.com
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border border-amber-100">
            <div className="flex items-start mb-3">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                <Server className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800">Escentual Implementation</h3>
                <p className="text-sm text-amber-700">Frontend value metrics visualization</p>
              </div>
            </div>
            <ul className="space-y-2 pl-11">
              <li className="text-sm text-amber-700 flex items-center">
                <span className="bg-amber-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Embedded value calculator on product pages
              </li>
              <li className="text-sm text-amber-700 flex items-center">
                <span className="bg-amber-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Value comparison visualizations for products
              </li>
              <li className="text-sm text-amber-700 flex items-center">
                <span className="bg-amber-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Interactive usage pattern customization
              </li>
              <li className="text-sm text-amber-700 flex items-center">
                <span className="bg-amber-100 rounded-full w-1.5 h-1.5 mr-2 flex-shrink-0"></span>
                Visual value badges and metrics display
              </li>
            </ul>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="gadget">Gadget.dev Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <ValueMetricsOverview />
              <Separator />
              <ValueMetricsBenefits />
              <Separator />
              <ValueMetricsRealWorldExamples />
            </div>
          </TabsContent>
          
          <TabsContent value="demo">
            <div className="space-y-6">
              <div className="bg-white border rounded-lg p-5 max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-4 text-center">Value Metrics Calculator Demo</h3>
                <QuickValueCalculator />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <CostPerUseMetrics />
                </div>
                <div>
                  <ProductLongevityMetrics />
                </div>
              </div>
              
              <ValueComparisonAnalysis />
            </div>
          </TabsContent>
          
          <TabsContent value="implementation">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-3">Frontend Implementation</Heading>
                  <Text className="text-sm mb-3">
                    Steps to integrate value metrics into Escentual.com's frontend:
                  </Text>
                  <ol className="list-decimal pl-5 text-sm space-y-2">
                    <li>Install the Value Metrics component package</li>
                    <li>Add Value Calculator to product detail pages</li>
                    <li>Add Value Comparison to category pages</li>
                    <li>Configure API endpoint connections to Gadget.dev</li>
                    <li>Implement value badges in product listings</li>
                    <li>Add value filters to search and category pages</li>
                  </ol>
                </Card>
                
                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-3">API Integration</Heading>
                  <Text className="text-sm mb-3">
                    Core API endpoints for value metrics functionality:
                  </Text>
                  <ul className="pl-5 text-sm space-y-2">
                    <li className="flex items-start">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mr-2 mt-0.5">GET</code>
                      <span>/api/products/:id/value</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mr-2 mt-0.5">GET</code>
                      <span>/api/products/compare?ids=123,456,789</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mr-2 mt-0.5">GET</code>
                      <span>/api/categories/:id/top-value</span>
                    </li>
                    <li className="flex items-start">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded mr-2 mt-0.5">POST</code>
                      <span>/api/products/:id/value/calculate</span>
                    </li>
                  </ul>
                </Card>
              </div>
              
              <InternetDataMiningInfo />
              <ValueMetricsCrawlingInfo />
            </div>
          </TabsContent>
          
          <TabsContent value="gadget">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Gadget.dev Integration Details</h3>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  Our value metrics system is fully integrated with Gadget.dev for backend processing, data storage, and API management.
                  Below are the key integration points and implementation details:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <a href="https://gadget.dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white p-3 rounded border border-blue-200 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-blue-700">Gadget.dev Dashboard</span>
                    <ArrowUpRight className="h-4 w-4 text-blue-500" />
                  </a>
                  <a href="https://docs.gadget.dev" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white p-3 rounded border border-blue-200 hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-blue-700">Gadget.dev Documentation</span>
                    <ArrowUpRight className="h-4 w-4 text-blue-500" />
                  </a>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Heading className="text-lg font-medium mb-3">Data Models</Heading>
                  <div className="bg-white border rounded p-4 mb-4">
                    <h4 className="text-sm font-medium mb-2">Product Value Model</h4>
                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
{`model ProductValue {
  id: ID
  product: Product
  price: Decimal
  costPerDay: Decimal
  daysLasting: Integer
  valueScore: Decimal
  valueLabel: String
  estimatedUses: Integer
  usageFrequency: Decimal
  createdAt: DateTime
  updatedAt: DateTime
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-white border rounded p-4">
                    <h4 className="text-sm font-medium mb-2">Customer Preference Model</h4>
                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
{`model CustomerPreference {
  id: ID
  customerId: String
  usageFrequency: Decimal
  preferredCategories: [String]
  valueThreshold: Integer
  createdAt: DateTime
  updatedAt: DateTime
}`}
                    </pre>
                  </div>
                </div>
                
                <div>
                  <Heading className="text-lg font-medium mb-3">API Actions</Heading>
                  <div className="bg-white border rounded p-4 mb-4">
                    <h4 className="text-sm font-medium mb-2">Calculate Value Action</h4>
                    <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
{`// In Gadget.dev, create a new action
export async function calculateProductValue(product, usageFrequency) {
  // Value calculation algorithm
  const estimatedUses = 32 + (product.price * 0.92);
  const daysLasting = Math.floor(estimatedUses / usageFrequency);
  const costPerDay = product.price / daysLasting;
  const valueScore = Math.min(100, Math.max(0, 
    48 + (daysLasting / 1.75) - (costPerDay * 4.2)
  ));
  
  // Return calculated values
  return {
    productId: product.id,
    costPerDay,
    daysLasting,
    valueScore,
    estimatedUses,
    usageFrequency
  };
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div>
                <Heading className="text-lg font-medium mb-3">API Routes</Heading>
                <div className="bg-white border rounded p-4">
                  <h4 className="text-sm font-medium mb-2">Value Metrics API Routes</h4>
                  <pre className="text-xs bg-gray-50 p-3 rounded overflow-x-auto">
{`// Configure in Gadget.dev
export default function(gadget) {
  // Get value metrics for a product
  gadget.routes.get("/api/products/:id/value", async (req, res) => {
    // Implementation
  });

  // Compare multiple products
  gadget.routes.get("/api/products/compare", async (req, res) => {
    // Implementation
  });

  // Calculate custom value metrics
  gadget.routes.post("/api/products/:id/value/calculate", async (req, res) => {
    // Implementation
  });

  // Get value metrics for product category
  gadget.routes.get("/api/categories/:id/top-value", async (req, res) => {
    // Implementation
  });
}`}
                  </pre>
                </div>
              </div>
              
              <DataInsightsPanel />
              <ValueIntelligenceSystem />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
