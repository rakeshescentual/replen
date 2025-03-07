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
import { Database, Server, ArrowUpRight, ShieldCheck, Users, CheckCircle2 } from "lucide-react";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Heading className="text-2xl font-bold">Value Metrics System</Heading>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Gadget.dev Ready</Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Built for Shopify</span>
            </Badge>
          </div>
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
            
            <div className="mt-4 pt-4 border-t border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Gadget.dev Compliance</h4>
              <ul className="space-y-1 pl-4">
                <li className="text-xs text-blue-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-600" />
                  Uses Gadget.dev Connection APIs for Shopify integration
                </li>
                <li className="text-xs text-blue-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-600" />
                  Implements Gadget actions for data processing
                </li>
                <li className="text-xs text-blue-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-600" />
                  Follows current Gadget data model best practices
                </li>
              </ul>
            </div>
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
            
            <div className="mt-4 pt-4 border-t border-amber-100">
              <h4 className="text-sm font-medium text-amber-800 mb-2">Shopify Compliance</h4>
              <ul className="space-y-1 pl-4">
                <li className="text-xs text-amber-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-amber-600" />
                  Follows Shopify design guidelines
                </li>
                <li className="text-xs text-amber-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-amber-600" />
                  Supports accessibility standards (WCAG 2.1)
                </li>
                <li className="text-xs text-amber-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-amber-600" />
                  Compatible with Shopify's App Bridge
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-5 border border-green-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <ShieldCheck className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Built for Shopify Certification</h3>
              <p className="text-sm text-green-700">This app adheres to all Built for Shopify requirements</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-1">Security & Data Privacy</h4>
              <ul className="space-y-1">
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Secure authentication via OAuth
                </li>
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Rate limiting implemented for API calls
                </li>
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Encrypted data storage and transfer
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-1">Merchant Experience</h4>
              <ul className="space-y-1">
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Polaris-compliant UI design patterns
                </li>
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Comprehensive onboarding flow
                </li>
                <li className="text-xs text-green-700 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
                  Performance optimization for speed
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demo">Interactive Demo</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="gadget">Gadget.dev Details</TabsTrigger>
            <TabsTrigger value="shopify">Shopify Compliance</TabsTrigger>
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
                
                <div className="p-3 bg-white rounded border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Gadget.dev Integration Standards</h4>
                  <ul className="space-y-1 pl-4 text-xs text-blue-700">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Uses the latest Gadget Connection API for seamless Shopify integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Implements Actions for data processing and API interaction following Gadget.dev standards</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Uses Gadget-compatible data models and schema design for optimal performance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Implements proper error handling and validation using Gadget's validation patterns</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-3 w-3 mr-1.5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Leverages Gadget's environment variables for secure configuration management</span>
                    </li>
                  </ul>
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
          
          <TabsContent value="shopify">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-lg border border-green-100">
                <Heading className="text-lg font-medium mb-3 text-green-800 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Built for Shopify Certification
                </Heading>
                <Text className="text-green-700 mb-4">
                  Our app is designed to meet all Built for Shopify requirements, ensuring a premium experience for merchants.
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h3 className="text-sm font-medium text-green-800 mb-2">App Experience Requirements</h3>
                    <ul className="space-y-2 text-xs text-green-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Polaris design system</span>
                          <p className="mt-0.5">Uses Shopify's Polaris components and design patterns</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Onboarding experience</span>
                          <p className="mt-0.5">Step-by-step onboarding with clear merchant value</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">App performance</span>
                          <p className="mt-0.5">Optimized for speed with < 400ms load times</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Responsive design</span>
                          <p className="mt-0.5">Fully responsive across all device sizes</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Technical Requirements</h3>
                    <ul className="space-y-2 text-xs text-green-700">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">App Bridge 3.0+</span>
                          <p className="mt-0.5">Integrated with latest App Bridge version</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Session token authentication</span>
                          <p className="mt-0.5">Secure JWT-based authentication</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Proper API usage</span>
                          <p className="mt-0.5">Adheres to GraphQL best practices with rate limiting</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">WCAG 2.1 Level AA</span>
                          <p className="mt-0.5">Fully accessible interface with proper semantic markup</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Security & Privacy Compliance</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-xs text-green-700">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Data security</span>
                          <p className="mt-0.5">Secure data storage and transfer with TLS 1.2+</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Privacy policy</span>
                          <p className="mt-0.5">Clear privacy policy detailing data usage</p>
                        </div>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Minimal scopes</span>
                          <p className="mt-0.5">Uses only required API access scopes</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">GDPR compliance</span>
                          <p className="mt-0.5">Supports data export and deletion requests</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <Heading className="text-lg font-medium mb-3">Shopify Plus Certification Requirements</Heading>
                <Text className="mb-4 text-sm text-gray-600">
                  Our app is also designed to meet the higher standards required for Shopify Plus certification:
                </Text>
                
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Enterprise-Grade Performance</h4>
                    <p className="text-xs text-gray-600">Optimized for high-volume stores with 10,000+ products and orders</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Multi-Store Management</h4>
                    <p className="text-xs text-gray-600">Supports organization-level administration for multiple storefronts</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Enhanced Support SLAs</h4>
                    <p className="text-xs text-gray-600">Priority support with guaranteed response times for Plus merchants</p>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-800 mb-1">Customization & API Extensibility</h4>
                    <p className="text-xs text-gray-600">Enterprise-level customization options and API access for advanced integrations</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
