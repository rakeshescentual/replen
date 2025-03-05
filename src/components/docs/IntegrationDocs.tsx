
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const IntegrationDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Integrations</Heading>
        <Text className="mb-6">
          The Replenish Reminder app integrates with several key platforms to provide a seamless experience for
          both merchants and customers.
        </Text>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4">Shopify Integration</Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Key Features</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to product data via Shopify Admin API</li>
                <li>Integration with Shopify Subscription API</li>
                <li>Embedded admin app using Shopify Polaris UI components</li>
                <li>Customer account integration via Liquid theme customization</li>
                <li>One-click reordering via Shopify Checkout API</li>
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
                    <TableCell>Access product data for lifespan management</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_orders</TableCell>
                    <TableCell>Track purchase history for reminder timing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_customers</TableCell>
                    <TableCell>Access customer data for personalized reminders</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>write_orders</TableCell>
                    <TableCell>Enable one-click reordering functionality</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>read_themes</TableCell>
                    <TableCell>Customer account integration</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Klaviyo Integration</Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Features</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Automated email reminders when products are about to run out</li>
                <li>Personalized email templates with product-specific information</li>
                <li>Customer segmentation based on purchase history and product usage</li>
                <li>Performance tracking and analytics for email campaigns</li>
                <li>Subscription conversion tracking</li>
              </ul>
            </div>
            <div>
              <Heading className="text-lg font-medium mb-2">Setup Requirements</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Klaviyo API key (Private API Key with appropriate permissions)</li>
                <li>Configured email templates in Klaviyo</li>
                <li>Properly set up Klaviyo list for reminder recipients</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Gadget.dev Backend</Heading>
            <div className="mb-4">
              <Heading className="text-lg font-medium mb-2">Core Functionality</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>Stores and manages product lifespan data</li>
                <li>Processes purchase data to calculate reminder schedules</li>
                <li>Triggers Klaviyo email sends at the appropriate times</li>
                <li>Handles subscription recommendations based on product usage</li>
                <li>Provides API endpoints for the Shopify embedded app</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Optional Integrations</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Wishlist Plus Integration</Heading>
                <Text className="text-sm text-gray-600 mb-2">
                  Integration with Wishlist Plus by Swym allows customers to easily add products to their wishlist 
                  from reminder emails and manage their wishlist items alongside replenishment schedules.
                </Text>
                <div className="text-sm">
                  <p className="font-semibold">Status: Future Enhancement (Phase 2+)</p>
                </div>
              </Card>
              
              <Card className="p-4">
                <Heading className="text-lg font-medium mb-2">Analytics Integrations</Heading>
                <Text className="text-sm text-gray-600 mb-2">
                  Future integrations with analytics platforms for deeper insights into customer replenishment 
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
