
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TechnicalSpecsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Technical Specifications</Heading>
        <Text className="mb-6">
          Detailed technical information about the Replenish Reminder app architecture, data models, and technical requirements.
        </Text>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4">System Architecture</Heading>
            <div className="p-4 bg-gray-100 rounded-md mb-4">
              <pre className="whitespace-pre-wrap text-sm">
{`Replenish Reminder App Architecture:

Frontend:
├── Shopify Embedded Admin App (React + Polaris)
│   ├── Product Lifespan Management
│   ├── Email Template Configuration
│   ├── Analytics Dashboard
│   └── Settings Management
├── Customer-Facing Components
│   └── "My Replenishments" Portal (Liquid + JavaScript)

Backend (gadget.dev):
├── API Layer
│   ├── Shopify Data Connectors
│   ├── Klaviyo Integration Services
│   └── Customer-Facing API Endpoints
├── Data Processing
│   ├── Purchase History Analysis
│   ├── Product Lifespan Calculation
│   └── Reminder Scheduling Engine
├── Database
│   ├── Product Lifespan Records
│   ├── Customer Purchase History
│   └── Reminder Configuration Data

External Integrations:
├── Shopify API
│   ├── Products & Inventory
│   ├── Customer Data
│   ├── Order History
│   └── Subscription Management
└── Klaviyo API
    ├── Customer Profile Management
    ├── Email Campaign Triggering
    └── Performance Analytics`}
              </pre>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Data Models</Heading>
            <div className="space-y-4">
              <div>
                <Heading className="text-lg font-medium mb-2">Product Lifespan Model</Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>shopifyProductId</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Unique Shopify product ID</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>estimatedLifespanDays</TableCell>
                      <TableCell>Integer</TableCell>
                      <TableCell>Estimated number of days the product lasts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>suggestedSubscriptionFrequency</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Recommended subscription interval (e.g., "1 month")</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>category</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Product category for grouping and default estimates</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>isActive</TableCell>
                      <TableCell>Boolean</TableCell>
                      <TableCell>Whether the product is included in reminder system</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div>
                <Heading className="text-lg font-medium mb-2">Customer Purchase Record</Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Field</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>customerId</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Shopify customer ID</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>productId</TableCell>
                      <TableCell>String</TableCell>
                      <TableCell>Shopify product ID purchased</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>purchaseDate</TableCell>
                      <TableCell>DateTime</TableCell>
                      <TableCell>Date of most recent purchase</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>estimatedDepletionDate</TableCell>
                      <TableCell>DateTime</TableCell>
                      <TableCell>Calculated date when product will run out</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>reminderSentDate</TableCell>
                      <TableCell>DateTime</TableCell>
                      <TableCell>Date when reminder was last sent</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>isSubscription</TableCell>
                      <TableCell>Boolean</TableCell>
                      <TableCell>Whether purchase is on subscription</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Performance & Scalability</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">System Requirements</Heading>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Shopify Plus plan required</li>
                  <li>Klaviyo account with API access</li>
                  <li>Gadget.dev paid tier for production use</li>
                  <li>Modern web browser for admin interface</li>
                </ul>
              </Card>
              
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Capacity Limitations</Heading>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Supports up to 100,000 customers</li>
                  <li>Up to 10,000 product lifespan records</li>
                  <li>Email sending capacity depends on Klaviyo plan</li>
                  <li>API rate limits determined by Shopify and Klaviyo</li>
                </ul>
              </Card>
              
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Data Processing</Heading>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Batch processing of purchase data every 6 hours</li>
                  <li>Daily calculation of upcoming reminder schedules</li>
                  <li>Real-time updates for customer-facing portal</li>
                </ul>
              </Card>
              
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Security</Heading>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>End-to-end encryption for all data transfers</li>
                  <li>OAuth 2.0 authentication with Shopify</li>
                  <li>API key management for Klaviyo integration</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </Card>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default TechnicalSpecsDocs;
