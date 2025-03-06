
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CalendarClock, 
  ShoppingCart, 
  CreditCard, 
  Zap, 
  Server, 
  Brain,
  BarChart,
  Clock
} from "lucide-react";

const IntegrationDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Integrations</Heading>
        <Text className="mb-6">
          The Replenish Reminder app integrates with several key platforms to provide a seamless experience for
          both Escentual.com merchants and customers.
        </Text>

        <Alert className="bg-purple-50 border-purple-200 mb-6">
          <Brain className="h-5 w-5 text-purple-600" />
          <AlertDescription className="text-purple-800">
            All integrations work together to power our core feature: AI-driven product replenishment predictions timed with customer paydays.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Escentual.com Shopify Integration
            </Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Key Features</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Complete access to Escentual.com product catalog via Shopify Admin API</li>
                <li>Integration with Escentual.com subscription options via Shopify Subscription API</li>
                <li>Embedded admin app using Shopify Polaris UI components for store management</li>
                <li>Customer account integration in Escentual.com via Liquid theme customization</li>
                <li>One-click reordering via Shopify Checkout API for seamless customer experience</li>
                <li>Customer purchase history analysis for intelligent product replenishment predictions</li>
                <li>Historical order data collection for AI learning and prediction refinement</li>
              </ul>
            </div>
            <div>
              <Heading className="text-lg font-medium mb-2">API Permissions Required</Heading>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scope</TableHead>
                    <TableHead>Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>read_products</TableCell>
                    <TableCell>Access Escentual.com product data for lifespan management</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_orders</TableCell>
                    <TableCell>Track Escentual.com customer purchase history for reminder timing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_customers</TableCell>
                    <TableCell>Access customer data for personalized replenishment reminders</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>write_orders</TableCell>
                    <TableCell>Enable one-click reordering functionality for customers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_themes</TableCell>
                    <TableCell>Customer account integration in Escentual.com theme</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-5 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <Heading className="text-lg font-medium mb-2 text-blue-800">Payday Replenishment Feature</Heading>
              <Text className="text-blue-700 mb-3">
                The core functionality that sends customers predictive replenishment emails on their payday with products from Escentual.com that they're likely to run out of soon.
              </Text>
              <ul className="list-disc pl-6 space-y-1 text-blue-700">
                <li>AI analyzes purchase history to predict when products will run out</li>
                <li>Internet data mining enhances prediction accuracy with real-world usage data</li>
                <li>Synchronized with customer payday schedules (typically monthly)</li>
                <li>One-click ordering for seamless replenishment</li>
                <li>Continuous learning from customer feedback and purchase patterns</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Klaviyo Integration
            </Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Features</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Automated payday email reminders when Escentual.com products are predicted to run out</li>
                <li>Personalized email templates showing specific products based on customer history</li>
                <li>Customer segmentation based on purchase frequency and product usage patterns</li>
                <li>Performance tracking and analytics for email campaigns</li>
                <li>Subscription conversion tracking from one-time purchases</li>
                <li>A/B testing capabilities to optimize open rates and conversion</li>
                <li>Multi-product recommendation support within a single email</li>
              </ul>
            </div>
            <div>
              <Heading className="text-lg font-medium mb-2">Setup Requirements</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Klaviyo API key (Private API Key with appropriate permissions)</li>
                <li>Configured email templates in Klaviyo for Escentual.com replenishment reminders</li>
                <li>Properly set up Klaviyo list for reminder recipients</li>
                <li>Segment for payday-specific timing of emails</li>
                <li>Dynamic content blocks for personalized product recommendations</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <Heading className="text-lg font-medium mb-2 text-green-800 flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                Payday Timing Mechanism
              </Heading>
              <div className="text-green-700">
                <p className="mb-3">Our system coordinates with Klaviyo to ensure emails arrive at the optimal time:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Customer payday dates are collected or inferred from purchase patterns</li>
                  <li>Email delivery is scheduled for 1-2 days after typical payday</li>
                  <li>Reminder timing is adjusted based on product run-out predictions</li>
                  <li>Gadget.dev backend schedules the triggers for Klaviyo email sends</li>
                  <li>System adapts to changing payday patterns over time</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-blue-600" />
              Gadget.dev Backend
            </Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Core Functionality</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stores and manages Escentual.com product lifespan data</li>
                <li>Processes purchase data to calculate replenishment schedules</li>
                <li>Predicts optimal replenishment timing using AI analysis</li>
                <li>Triggers Klaviyo email sends at the appropriate times (monthly on payday)</li>
                <li>Handles subscription recommendations based on product usage</li>
                <li>Provides API endpoints for the Shopify embedded app</li>
                <li>Real-time internet data crawling to enhance predictions with current market trends</li>
                <li>Machine learning algorithms that continuously improve prediction accuracy</li>
                <li>Customer payday date tracking and management</li>
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mt-4">
              <Heading className="text-lg font-medium mb-2 text-indigo-800 flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                AI Prediction Engine
              </Heading>
              <Text className="text-indigo-700 mb-3">
                Gadget.dev powers the AI prediction engine that forms the core of our replenishment system:
              </Text>
              <ul className="list-disc pl-6 space-y-1 text-indigo-700">
                <li>Analyzes historical Escentual.com purchase data to identify product usage patterns</li>
                <li>Incorporates product category benchmarks for reliable initial predictions</li>
                <li>Customizes predictions based on individual customer behavior</li>
                <li>Synchronizes predictions with customer payday schedule</li>
                <li>Crawls the internet for Escentual.com product reviews and usage information</li>
                <li>Continuously improves prediction accuracy through machine learning</li>
                <li>Identifies seasonal usage patterns and adjusts predictions accordingly</li>
                <li>Uses natural language processing to extract usage insights from reviews</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mt-4">
              <Heading className="text-lg font-medium mb-2 text-amber-800 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-amber-600" />
                Value Metrics System
              </Heading>
              <Text className="text-amber-700 mb-3">
                Our Gadget.dev backend calculates important value metrics for Escentual.com products:
              </Text>
              <ul className="list-disc pl-6 space-y-1 text-amber-700">
                <li>Cost-per-day calculations for all products based on price and estimated lifespan</li>
                <li>Value comparisons across similar products and categories</li>
                <li>Subscription value analysis to identify cost savings</li>
                <li>Customer-specific value recommendations based on usage patterns</li>
                <li>Dynamic value scoring updated as prices and product details change</li>
              </ul>
            </div>
            
            <div className="mt-5">
              <Heading className="text-lg font-medium mb-2">Data Flow Architecture</Heading>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <ol className="list-decimal pl-6 space-y-3">
                  <li className="text-gray-800">
                    <span className="font-medium">Data Collection:</span> Customer purchase data from Escentual.com is securely transferred to Gadget.dev
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Internet Data Mining:</span> System crawls the web for product usage information and reviews
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">AI Processing:</span> Gadget.dev analyzes patterns to predict product depletion dates
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Payday Scheduling:</span> System aligns with customer payday dates for optimal timing
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Email Generation:</span> Klaviyo templates are populated with predicted replenishment items
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">One-Click Ordering:</span> Customers can reorder predicted items with a single click
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Feedback Loop:</span> System learns from customer actions to improve future predictions
                  </li>
                  <li className="text-gray-800">
                    <span className="font-medium">Value Analysis:</span> Cost-per-day and value metrics are calculated and stored
                  </li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-blue-600" />
              Payday-Based Reminders
            </Heading>
            <div className="mb-4">
              <Text className="mb-3">
                The Replenish Reminder system is specifically designed to align with customer payday schedules, ensuring timely and convenient replenishment of Escentual.com products.
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>Customer payday information is collected during account setup or inferred from purchase patterns</li>
                <li>Reminders are scheduled to arrive just after payday when customers have available funds</li>
                <li>Predictions are adjusted to ensure products won't run out before the next payday cycle</li>
                <li>Automated email campaigns are synchronized with payday dates for optimal conversion</li>
                <li>Multiple products can be bundled into a single monthly payday reminder</li>
                <li>System accounts for different payday schedules (weekly, bi-weekly, monthly)</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Optional Integrations</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Wishlist Plus Integration</Heading>
                <Text className="text-sm text-gray-600 mb-2">
                  Integration with Wishlist Plus by Swym allows Escentual.com customers to easily add products to their wishlist 
                  from reminder emails and manage their wishlist items alongside replenishment schedules.
                </Text>
                <div className="text-sm">
                  <p className="font-semibold">Status: Future Enhancement (Phase 2+)</p>
                </div>
              </Card>
              
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Analytics Integrations</Heading>
                <Text className="text-sm text-gray-600 mb-2">
                  Future integrations with analytics platforms for deeper insights into Escentual.com customer replenishment 
                  behavior, subscription conversion rates, and lifetime value calculations.
                </Text>
                <div className="text-sm">
                  <p className="font-semibold">Status: Planned Feature</p>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationDocs;
