
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const GadgetDevDocs: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Gadget.dev Integration Guide</Heading>
        <Text className="mb-6">
          Gadget.dev serves as the core backend service for the Replenish Reminder app, handling all business logic, 
          data processing, and integration with third-party services. This comprehensive guide will help 
          you understand how to leverage Gadget.dev's capabilities within this application.
        </Text>

        <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
          <Info className="h-4 w-4 mr-2" />
          <AlertTitle className="font-medium">Important</AlertTitle>
          <AlertDescription>
            This guide assumes you have a Gadget.dev account and basic familiarity with the platform. If you're new to 
            Gadget.dev, please review their <a href="https://docs.gadget.dev/guides" className="underline font-medium" target="_blank" rel="noopener noreferrer">official documentation</a> first.
          </AlertDescription>
        </Alert>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4">Application Architecture</Heading>
            <Text className="mb-4">
              The Replenish Reminder app follows a modern frontend-backend separation pattern:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li className="text-gray-700">
                <strong>Frontend:</strong> React application (this codebase) handling UI/UX and user interactions
              </li>
              <li className="text-gray-700">
                <strong>Backend:</strong> Gadget.dev application handling data storage, processing, and external integrations
              </li>
            </ul>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <Heading className="text-lg font-medium mb-2">Data Flow Architecture</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-white rounded border border-gray-200">
                  <p className="font-medium mb-2 text-blue-800">1. Data Sources</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    <li>Shopify (products, customers, orders)</li>
                    <li>User interactions (app settings, preferences)</li>
                    <li>Calculated values (lifespan predictions)</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border border-gray-200">
                  <p className="font-medium mb-2 text-blue-800">2. Gadget.dev Processing</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    <li>Data normalization and storage</li>
                    <li>Business logic execution</li>
                    <li>Scheduled tasks and automations</li>
                    <li>API endpoint management</li>
                  </ul>
                </div>
                <div className="p-3 bg-white rounded border border-gray-200">
                  <p className="font-medium mb-2 text-blue-800">3. Outputs & Integrations</p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    <li>Frontend app data (via API)</li>
                    <li>Klaviyo email triggers</li>
                    <li>Shopify data updates</li>
                    <li>Analytics and reporting data</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Data Models</Heading>
            <Text className="mb-4">
              The following data models are defined in the Gadget.dev application:
            </Text>
            
            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Key Fields</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Product</TableCell>
                  <TableCell>Stores product information with lifespan data</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      <li>id, title, handle</li>
                      <li>estimatedLifespan</li>
                      <li>suggestedSubscription</li>
                      <li>category, imageUrl</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Customer</TableCell>
                  <TableCell>Stores customer data and preferences</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      <li>id, email, name</li>
                      <li>reminderPreferences</li>
                      <li>lastActive, optInStatus</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ReplenishmentRecord</TableCell>
                  <TableCell>Tracks product purchases and depletion predictions</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      <li>product, customer</li>
                      <li>purchaseDate</li>
                      <li>estimatedDepletionDate</li>
                      <li>remindersSent, lastReminderDate</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">ReminderEvent</TableCell>
                  <TableCell>Logs reminder emails and customer interactions</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      <li>customer, product</li>
                      <li>sentDate, templateUsed</li>
                      <li>opened, clicked</li>
                      <li>convertedToSale</li>
                    </ul>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">KlaviyoTemplate</TableCell>
                  <TableCell>Stores email template configurations</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-4 text-sm">
                      <li>name, subject</li>
                      <li>klaviyoId</li>
                      <li>status, lastUsed</li>
                    </ul>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">API Endpoints Reference</Heading>
            <Text className="mb-4">
              The Gadget.dev application exposes the following API endpoints:
            </Text>
            
            <div className="mb-6 space-y-4">
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <Heading className="text-sm font-semibold text-blue-800">Product Endpoints</Heading>
                </div>
                <div className="p-4">
                  <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`GET    /api/products               # List all products with lifespan data
GET    /api/products/:id           # Get specific product details
PUT    /api/products/:id           # Update product lifespan data
POST   /api/products/bulk-update   # Update multiple products at once
POST   /api/products/sync          # Sync products with Shopify`}
                  </pre>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <Heading className="text-sm font-semibold text-blue-800">Customer Endpoints</Heading>
                </div>
                <div className="p-4">
                  <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`GET    /api/customers/:id                      # Get customer data
GET    /api/customers/:id/replenishments        # Get customer's replenishment schedule
PUT    /api/customers/:id/preferences           # Update reminder preferences
POST   /api/customers/:id/opt-in                # Opt in/out of reminders`}
                  </pre>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <Heading className="text-sm font-semibold text-blue-800">Reminder Endpoints</Heading>
                </div>
                <div className="p-4">
                  <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`GET    /api/reminders                   # List scheduled reminders
POST   /api/reminders/trigger             # Manually trigger reminders
GET    /api/reminders/templates           # Get available email templates
POST   /api/reminders/test                # Send a test reminder email`}
                  </pre>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-blue-50 px-4 py-2 border-b border-gray-200">
                  <Heading className="text-sm font-semibold text-blue-800">Analytics Endpoints</Heading>
                </div>
                <div className="p-4">
                  <pre className="text-sm bg-gray-50 p-3 rounded overflow-x-auto">
{`GET    /api/analytics/summary           # Get overview of reminder performance
GET    /api/analytics/products            # Get product-specific analytics
GET    /api/analytics/customers           # Get customer engagement metrics
GET    /api/analytics/conversion          # Get sales conversion data`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Authentication and Security</Heading>
            <Text className="mb-4">
              Authentication with the Gadget.dev API is handled using API keys:
            </Text>
            
            <div className="mb-6 space-y-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <Heading className="text-lg font-medium mb-2">API Key Types</Heading>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700">
                    <strong>Public API Key:</strong> Used for client-side API calls with limited access (used in the customer portal)
                  </li>
                  <li className="text-gray-700">
                    <strong>Private API Key:</strong> Used for server-side and admin operations (used in the Shopify admin app)
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <Heading className="text-lg font-medium mb-2">API Key Security Best Practices</Heading>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700">
                    Never expose private API keys in client-side code or repositories
                  </li>
                  <li className="text-gray-700">
                    Store API keys in environment variables or secure configuration storage
                  </li>
                  <li className="text-gray-700">
                    Use scoped API keys with minimal necessary permissions
                  </li>
                  <li className="text-gray-700">
                    Implement rate limiting and monitoring to detect potential API abuse
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <Heading className="text-lg font-medium mb-2">Example Authentication Header</Heading>
                <pre className="text-sm bg-white p-3 rounded border border-gray-100 overflow-x-auto">
{`// Example API request with authentication header
fetch('https://your-app.gadget.app/api/products', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                </pre>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Scheduled Jobs</Heading>
            <Text className="mb-4">
              The Gadget.dev application utilizes scheduled jobs to automate key processes:
            </Text>
            
            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">shopifySyncJob</TableCell>
                  <TableCell>Daily (12 AM)</TableCell>
                  <TableCell>Synchronizes products, customers, and orders from Shopify</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">dailyReminderJob</TableCell>
                  <TableCell>Daily (8 AM)</TableCell>
                  <TableCell>Identifies and sends due reminder emails for the day</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">weeklyDigestJob</TableCell>
                  <TableCell>Weekly (Monday 9 AM)</TableCell>
                  <TableCell>Sends weekly replenishment digests to customers</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">analyticsSummaryJob</TableCell>
                  <TableCell>Weekly (Sunday 11 PM)</TableCell>
                  <TableCell>Processes and summarizes weekly analytics data</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">klaviyoSyncJob</TableCell>
                  <TableCell>Hourly</TableCell>
                  <TableCell>Synchronizes customer profiles and metrics with Klaviyo</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
              <Heading className="text-lg font-medium mb-2">Example Scheduled Job Implementation</Heading>
              <pre className="text-sm bg-white p-3 rounded border border-gray-100 overflow-x-auto">
{`// Example Gadget.dev scheduled job
export const dailyReminderJob = gadget.job({
  name: "Daily Reminder Processor",
  schedule: "0 8 * * *", // Run at 8am daily
  action: async () => {
    // Find all replenishment records due for a reminder
    const dueReminders = await ReplenishmentRecord.findMany({
      where: {
        estimatedDepletionDate: {
          gte: new Date(),
          lte: addDays(new Date(), 7) // Within next 7 days
        },
        remindersSent: { lt: 3 } // Send max 3 reminders
      },
      include: {
        customer: true,
        product: true
      }
    });

    // Process each reminder
    const results = await Promise.all(
      dueReminders.map(async (reminder) => {
        // Send email via Klaviyo
        const emailResult = await sendKlaviyoEmail(
          reminder.customer.email,
          "product-reminder",
          {
            customer: reminder.customer,
            product: reminder.product,
            depletionDate: reminder.estimatedDepletionDate
          }
        );

        // Update reminder record
        await reminder.update({
          remindersSent: reminder.remindersSent + 1,
          lastReminderDate: new Date()
        });

        return { reminder, emailResult };
      })
    );

    return {
      processedCount: results.length,
      successCount: results.filter(r => r.emailResult.success).length
    };
  }
});`}
              </pre>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Migration Guide</Heading>
            <Text className="mb-4">
              Follow these steps to migrate an existing application to Gadget.dev:
            </Text>
            
            <ol className="list-decimal pl-6 space-y-3 mb-6">
              <li className="text-gray-700">
                <strong>Create a Gadget.dev Application</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Sign up for Gadget.dev and create a new application from the dashboard.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Define Data Models</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Create the required data models (Product, Customer, ReplenishmentRecord, etc.) in the Gadget.dev UI.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Set Up Shopify Connection</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Connect your Shopify store using Gadget.dev's Shopify connection feature. Configure the required 
                  data sync options for products, customers, and orders.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Implement API Endpoints</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Create the necessary API endpoints for your application using Gadget.dev's API builder.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Migrate Business Logic</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Port your existing business logic to Gadget.dev's action system.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Configure Scheduled Jobs</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Set up the required scheduled jobs for data synchronization and automated processes.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Update Frontend API Calls</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Update your frontend application to use the new Gadget.dev API endpoints.
                </p>
              </li>
              <li className="text-gray-700">
                <strong>Test and Validate</strong>
                <p className="text-sm text-gray-600 mt-1">
                  Thoroughly test all functionality to ensure the migration was successful.
                </p>
              </li>
            </ol>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
              <Heading className="text-lg font-medium mb-2 text-amber-800">Important Migration Considerations</Heading>
              <ul className="list-disc pl-6 space-y-2 text-amber-700">
                <li>
                  <strong>Data Migration:</strong> Plan how to migrate existing data to the new Gadget.dev models
                </li>
                <li>
                  <strong>Environment Variables:</strong> Update all environment variables and secrets in Gadget.dev
                </li>
                <li>
                  <strong>Webhooks:</strong> Reconfigure any webhooks to point to your new Gadget.dev application
                </li>
                <li>
                  <strong>Downtime Planning:</strong> Coordinate the migration to minimize customer impact
                </li>
              </ul>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Troubleshooting & Support</Heading>
            
            <div className="mb-6 space-y-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <Heading className="text-lg font-medium mb-2">Common Issues</Heading>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700">
                    <strong>API Authentication Errors:</strong> Verify API keys are correct and have appropriate permissions
                  </li>
                  <li className="text-gray-700">
                    <strong>Data Sync Issues:</strong> Check Shopify connection status and sync logs in Gadget.dev
                  </li>
                  <li className="text-gray-700">
                    <strong>Scheduled Jobs Not Running:</strong> Verify job configurations and check execution logs
                  </li>
                  <li className="text-gray-700">
                    <strong>Rate Limiting:</strong> Implement proper error handling for API rate limit responses
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <Heading className="text-lg font-medium mb-2">Support Resources</Heading>
                <ul className="list-disc pl-6 space-y-2">
                  <li className="text-gray-700">
                    <strong>Gadget.dev Documentation:</strong> <a href="https://docs.gadget.dev" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://docs.gadget.dev</a>
                  </li>
                  <li className="text-gray-700">
                    <strong>Gadget.dev Discord Community:</strong> <a href="https://discord.gg/gadget" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://discord.gg/gadget</a>
                  </li>
                  <li className="text-gray-700">
                    <strong>Email Support:</strong> <a href="mailto:support@gadget.dev" className="text-blue-600 hover:underline">support@gadget.dev</a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default GadgetDevDocs;
