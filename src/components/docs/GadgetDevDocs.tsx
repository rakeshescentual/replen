
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Server, Zap, Database, LineChart, Sparkles, Clock, ArrowRightCircle } from "lucide-react";

const GadgetDevDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading className="text-2xl font-bold mb-2">Gadget.dev Integration</Heading>
            <Text className="text-gray-600">
              Comprehensive documentation for our Gadget.dev backend integration powering the Replenish Reminder app
            </Text>
          </div>
          <div className="bg-indigo-100 rounded-full p-3">
            <Server className="h-8 w-8 text-indigo-700" />
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-600" />
              Core AI Prediction Engine
            </Heading>
            <Text className="mb-4">
              The heart of the Replenish Reminder system lies in its AI prediction engine hosted on Gadget.dev. This engine analyzes 
              Escentual.com customer purchase history, product characteristics, and market data to predict when customers will run out of products.
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <h3 className="font-semibold text-gray-900">AI Prediction Features</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Purchase frequency analysis per customer and product</li>
                  <li>Category-based usage pattern identification</li>
                  <li>Product size vs. usage rate calculations</li>
                  <li>Personalized usage pattern adjustments</li>
                  <li>Cross-reference with similar customer cohorts</li>
                  <li>Continuous learning from customer feedback</li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <h3 className="font-semibold text-gray-900">Payday-Based Scheduling</h3>
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Customer payday date identification and tracking</li>
                  <li>Reminder scheduling aligned with customer payday</li>
                  <li>Advance notification timing optimization</li>
                  <li>Batch processing for monthly payday cohorts</li>
                  <li>Scheduled Klaviyo trigger automation</li>
                  <li>Schedule adjustments based on observed behaviors</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mt-6">
              <Heading className="text-lg font-medium mb-3 text-indigo-800">Prediction Algorithm Overview</Heading>
              <Text className="text-indigo-700 mb-4">
                Our proprietary algorithm combines multiple data points to generate accurate predictions:
              </Text>
              <ol className="list-decimal pl-6 space-y-3 text-indigo-700">
                <li>
                  <span className="font-medium">Historical Purchase Analysis:</span> We calculate the average time between repurchases for each product by each customer
                </li>
                <li>
                  <span className="font-medium">Product Specifications:</span> We incorporate manufacturer data about expected product lifespans
                </li>
                <li>
                  <span className="font-medium">Category Benchmarks:</span> We use category-level usage data when individual history is limited
                </li>
                <li>
                  <span className="font-medium">Usage Pattern Detection:</span> We identify patterns like seasonal usage or product combinations
                </li>
                <li>
                  <span className="font-medium">Feedback Integration:</span> We adjust predictions based on customer responses to feedback emails
                </li>
                <li>
                  <span className="font-medium">Payday Alignment:</span> We align predictions with customer payday schedules for optimal timing
                </li>
              </ol>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5 text-indigo-600" />
              Gadget.dev Data Architecture
            </Heading>
            <Text className="mb-4">
              Our Gadget.dev implementation uses a sophisticated data architecture to manage customer data, predictions, and integration points:
            </Text>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 border-b text-left">Model</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                    <th className="py-2 px-4 border-b text-left">Key Fields</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Customer</td>
                    <td className="py-2 px-4 border-b">Stores Escentual.com customer information</td>
                    <td className="py-2 px-4 border-b">id, email, firstName, lastName, paydayDate</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">Product</td>
                    <td className="py-2 px-4 border-b">Stores Escentual.com product information</td>
                    <td className="py-2 px-4 border-b">id, title, category, defaultLifespan, size</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">PurchaseHistory</td>
                    <td className="py-2 px-4 border-b">Records all customer purchases</td>
                    <td className="py-2 px-4 border-b">customerId, productId, purchaseDate, quantity</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">UsagePattern</td>
                    <td className="py-2 px-4 border-b">Stores calculated usage patterns</td>
                    <td className="py-2 px-4 border-b">customerId, productId, averageLifespan, confidence</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">ReminderSchedule</td>
                    <td className="py-2 px-4 border-b">Manages upcoming payday reminders</td>
                    <td className="py-2 px-4 border-b">customerId, productId, predictedDepletionDate, scheduledReminderDate</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b font-medium">FeedbackResponse</td>
                    <td className="py-2 px-4 border-b">Tracks customer feedback on predictions</td>
                    <td className="py-2 px-4 border-b">customerId, productId, responseType, actualDepletionDate</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <Heading className="text-lg font-medium mb-3">Gadget.dev Jobs</Heading>
            <Text className="mb-4">
              Scheduled jobs in Gadget.dev manage the ongoing operations of the replenishment system:
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">Daily Prediction Updates</p>
                <p className="text-sm text-gray-600">Recalculates all predictions based on new data</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">Payday Email Scheduler</p>
                <p className="text-sm text-gray-600">Schedules reminder emails aligned with customer paydays</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">Shopify Data Sync</p>
                <p className="text-sm text-gray-600">Imports new orders and customer data from Escentual.com</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-1">Feedback Analysis</p>
                <p className="text-sm text-gray-600">Processes customer feedback to improve predictions</p>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-indigo-600" />
              Internet Data Crawling & Analysis
            </Heading>
            <Text className="mb-4">
              Our system leverages Gadget.dev's serverless functions to crawl and analyze internet data about Escentual.com products, enhancing prediction accuracy:
            </Text>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Product Reviews Analysis:</span> Extracts typical usage duration from product reviews
                </li>
                <li>
                  <span className="font-medium">Manufacturer Data Collection:</span> Gathers official product lifespan information
                </li>
                <li>
                  <span className="font-medium">Beauty Forum Monitoring:</span> Identifies trends in product usage discussions
                </li>
                <li>
                  <span className="font-medium">Competitor Analysis:</span> Compares similar product recommendations and lifespans
                </li>
                <li>
                  <span className="font-medium">Sentiment Analysis:</span> Gauges customer satisfaction and usage experiences
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <ArrowRightCircle className="h-5 w-5 text-blue-600" />
                <Heading className="text-lg font-medium text-blue-800">Implementation Example</Heading>
              </div>
              <Text className="text-blue-700 mb-3">
                A serverless Gadget.dev function that processes new customer orders:
              </Text>
              <div className="bg-gray-800 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                <pre>{`// Gadget.dev serverless function
export default async function processNewOrder(event, context) {
  // Extract order details from Shopify webhook
  const { customer_id, line_items, processed_at } = event.body;
  
  // For each product purchased
  for (const item of line_items) {
    // Record purchase in our system
    await db.PurchaseHistory.create({
      customerId: customer_id,
      productId: item.product_id,
      purchaseDate: new Date(processed_at),
      quantity: item.quantity
    });
    
    // Get customer's payday info
    const customer = await db.Customer.findOne({ id: customer_id });
    
    // Calculate predicted depletion date based on our AI model
    const { predictedDepletionDate } = await calculateProductDepletion(
      customer_id,
      item.product_id,
      item.quantity
    );
    
    // Schedule reminder before next payday after predicted depletion
    const reminderDate = calculateReminderDateBasedOnPayday(
      customer.paydayDate, 
      predictedDepletionDate
    );
    
    // Create reminder schedule
    await db.ReminderSchedule.create({
      customerId: customer_id,
      productId: item.product_id,
      predictedDepletionDate,
      scheduledReminderDate: reminderDate
    });
  }
  
  return { success: true };
}`}</pre>
              </div>
            </div>
          </section>
          
          <section>
            <Heading className="text-xl font-semibold mb-4">Getting Started with Gadget.dev</Heading>
            <Text className="mb-4">
              To set up your own instance of the Replenish Reminder system with Gadget.dev, follow these steps:
            </Text>
            
            <ol className="list-decimal pl-6 space-y-4 mb-6">
              <li>
                <p className="font-medium">Create a Gadget.dev account</p>
                <p className="text-sm text-gray-600">Sign up at gadget.dev and create a new application</p>
              </li>
              <li>
                <p className="font-medium">Set up data models</p>
                <p className="text-sm text-gray-600">Create the necessary data models according to our schema</p>
              </li>
              <li>
                <p className="font-medium">Configure Shopify connection</p>
                <p className="text-sm text-gray-600">Connect to your Escentual.com Shopify store using the Gadget.dev Shopify connection</p>
              </li>
              <li>
                <p className="font-medium">Set up API keys</p>
                <p className="text-sm text-gray-600">Generate and securely store necessary API keys for Klaviyo and other services</p>
              </li>
              <li>
                <p className="font-medium">Deploy prediction engine</p>
                <p className="text-sm text-gray-600">Deploy our AI prediction engine code to your Gadget.dev instance</p>
              </li>
              <li>
                <p className="font-medium">Configure scheduled jobs</p>
                <p className="text-sm text-gray-600">Set up the required jobs for prediction updates and email scheduling</p>
              </li>
              <li>
                <p className="font-medium">Connect to frontend</p>
                <p className="text-sm text-gray-600">Connect your admin dashboard to the Gadget.dev backend</p>
              </li>
            </ol>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="font-medium text-amber-800 mb-1">Note</p>
              <p className="text-sm text-amber-700">
                For detailed implementation assistance and access to our reference code, please contact our developer support team.
              </p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default GadgetDevDocs;
