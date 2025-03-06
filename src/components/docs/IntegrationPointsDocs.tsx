
import React from "react";
import { Card, Code, Heading, Text } from "@/components/ui/shadcn";
import { Separator } from "@/components/ui/separator";

const IntegrationPointsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Integration Overview</Heading>
        <Text className="mb-4">
          Replenish Reminder integrates with three primary platforms to deliver a seamless replenishment experience:
        </Text>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li className="text-gray-700">
            <strong>Shopify:</strong> Core e-commerce platform for product data, customer information, and subscription management
          </li>
          <li className="text-gray-700">
            <strong>Klaviyo:</strong> Email marketing platform for sending personalized reminder emails and tracking engagement
          </li>
          <li className="text-gray-700">
            <strong>Gadget.dev:</strong> Backend service for processing data, managing integration workflows, and custom business logic
          </li>
        </ul>
        <Text className="text-sm text-gray-500">
          This document provides detailed technical documentation on the integration points, API usage, and data flow between these platforms.
        </Text>
      </Card>

      {/* Shopify Integration Section */}
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Shopify Integration</Heading>
        <div className="space-y-6">
          <div>
            <Heading className="text-lg font-semibold mb-2">API Overview</Heading>
            <Text className="mb-2">
              Replenish Reminder uses the following Shopify APIs:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>GraphQL Admin API:</strong> For accessing product, order, and customer data
              </li>
              <li className="text-gray-700">
                <strong>REST Admin API:</strong> For certain operations not available in the GraphQL API
              </li>
              <li className="text-gray-700">
                <strong>Subscription API:</strong> For managing and tracking customer subscriptions
              </li>
              <li className="text-gray-700">
                <strong>Metafield API:</strong> For storing product lifespan data and custom attributes
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Authentication</Heading>
            <Text className="mb-4">
              Authentication is performed using OAuth 2.0 with the following scopes:
            </Text>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mb-4">
{`// Required OAuth Scopes
read_products, write_products
read_customers, write_customers
read_orders, write_orders
read_content, write_content
read_merchant_managed_fulfillment_orders
read_shopify_payments_payouts
read_shopify_payments_disputes`}
            </Code>
            <Text className="text-sm text-gray-600">
              The app uses a server-to-server access token for background operations and user-specific tokens for admin interface actions.
            </Text>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Product Data Flow</Heading>
            <Text className="mb-2">
              The app retrieves product data through the following process:
            </Text>
            <ol className="list-decimal pl-5 space-y-2">
              <li className="text-gray-700">
                Query all product data using GraphQL Admin API
              </li>
              <li className="text-gray-700">
                Extract relevant product information (title, SKU, metafields)
              </li>
              <li className="text-gray-700">
                Store product lifespan data in dedicated metafields
              </li>
              <li className="text-gray-700">
                Sync product data to Gadget.dev and Klaviyo
              </li>
            </ol>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example GraphQL Query for Products
query {
  products(first: 50) {
    edges {
      node {
        id
        title
        handle
        description
        variants(first: 10) {
          edges {
            node {
              id
              title
              sku
              price
              inventoryQuantity
            }
          }
        }
        metafields(first: 10, namespace: "replenish_reminder") {
          edges {
            node {
              id
              namespace
              key
              value
            }
          }
        }
      }
    }
  }
}`}
            </Code>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Customer Account Integration</Heading>
            <Text className="mb-4">
              The "My Replenishments" section is integrated into customer accounts using Liquid templates and JavaScript for dynamic content.
            </Text>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm">
{`<!-- Example Liquid Template for My Replenishments -->
<div id="my-replenishments">
  <h2>{{ 'customer.replenishments.title' | t }}</h2>
  
  <div class="loading-spinner" id="replenishment-loader">
    <!-- Loading animation -->
  </div>
  
  <div id="replenishment-content" style="display: none;">
    <!-- Content dynamically loaded via JavaScript -->
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Fetch customer replenishment data
    fetch('/apps/replenish-reminder/customer/data')
      .then(response => response.json())
      .then(data => {
        // Render replenishment data
        document.getElementById('replenishment-content').innerHTML = 
          generateReplenishmentHTML(data);
        
        // Hide loader, show content
        document.getElementById('replenishment-loader').style.display = 'none';
        document.getElementById('replenishment-content').style.display = 'block';
      })
      .catch(error => {
        console.error('Error loading replenishment data:', error);
      });
  });
</script>`}
            </Code>
          </div>
        </div>
      </Card>

      {/* Klaviyo Integration Section */}
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Klaviyo Integration</Heading>
        <div className="space-y-6">
          <div>
            <Heading className="text-lg font-semibold mb-2">API Overview</Heading>
            <Text className="mb-2">
              The app integrates with Klaviyo for all email communication using:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Klaviyo REST API v2:</strong> For customer profile management and metrics
              </li>
              <li className="text-gray-700">
                <strong>Klaviyo API v3:</strong> For campaigns, templates, and newer features
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Customer Data Sync</Heading>
            <Text className="mb-4">
              Customer profiles are synchronized with Klaviyo through:
            </Text>
            <ol className="list-decimal pl-5 space-y-2">
              <li className="text-gray-700">
                Creating/updating profiles with customer information
              </li>
              <li className="text-gray-700">
                Adding custom properties for replenishment dates
              </li>
              <li className="text-gray-700">
                Syncing purchase history and product preferences
              </li>
              <li className="text-gray-700">
                Tracking engagement with reminder emails
              </li>
            </ol>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example Klaviyo Profile Update
const updateKlaviyoProfile = async (customer, replenishmentData) => {
  const profileData = {
    email: customer.email,
    phone_number: customer.phone,
    first_name: customer.firstName,
    last_name: customer.lastName,
    properties: {
      replenishment_products: replenishmentData,
      next_replenishment_date: calculateNextDate(replenishmentData),
      total_replenishment_value: calculateTotalValue(replenishmentData),
      shopify_customer_id: customer.id,
      $source: "Replenish Reminder App"
    }
  };

  return await klaviyoClient.profiles.createOrUpdate(profileData);
};`}
            </Code>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Email Campaigns</Heading>
            <Text className="mb-2">
              The app manages three types of reminder emails:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Monthly Replenishment Reminders:</strong> Sent at the beginning of each month
              </li>
              <li className="text-gray-700">
                <strong>Product-Specific Reminders:</strong> Sent based on predicted depletion dates
              </li>
              <li className="text-gray-700">
                <strong>Subscription Recommendations:</strong> Sent to customers with repeated purchases
              </li>
            </ul>
            <Text className="mt-4 mb-2">
              Email campaigns are created using Klaviyo's API:
            </Text>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm">
{`// Example Campaign Creation
const createReminderCampaign = async (templateId, segmentId, sendDate) => {
  const campaignData = {
    name: "Monthly Replenishment Reminder - " + formatDate(sendDate),
    template_id: templateId,
    list_id: segmentId,
    send_options: {
      scheduled_date: sendDate.toISOString()
    }
  };

  return await klaviyoClient.campaigns.create(campaignData);
};`}
            </Code>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Event Tracking</Heading>
            <Text className="mb-4">
              The app tracks custom metrics in Klaviyo:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Viewed Replenishment Reminder:</strong> When a customer opens a reminder email
              </li>
              <li className="text-gray-700">
                <strong>Clicked Replenishment Product:</strong> When a customer clicks on a product in the email
              </li>
              <li className="text-gray-700">
                <strong>Completed Replenishment Purchase:</strong> When a customer makes a purchase from a reminder
              </li>
            </ul>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example Event Tracking
const trackReplenishmentPurchase = async (customer, orderData, source) => {
  const eventData = {
    event: "Completed Replenishment Purchase",
    customer_properties: {
      $email: customer.email,
      $first_name: customer.firstName,
      $last_name: customer.lastName
    },
    properties: {
      source: source,
      order_id: orderData.id,
      value: orderData.totalPrice,
      products: orderData.lineItems.map(item => ({
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
        name: item.title,
        price: item.price
      }))
    }
  };

  return await klaviyoClient.events.track(eventData);
};`}
            </Code>
          </div>
        </div>
      </Card>

      {/* Gadget.dev Integration Section */}
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Gadget.dev Integration</Heading>
        <div className="space-y-6">
          <div>
            <Heading className="text-lg font-semibold mb-2">Platform Overview</Heading>
            <Text className="mb-4">
              Gadget.dev serves as the backend service layer for Replenish Reminder, managing:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Data Synchronization:</strong> Between Shopify and Klaviyo
              </li>
              <li className="text-gray-700">
                <strong>Business Logic:</strong> Product lifespan calculations and reminder scheduling
              </li>
              <li className="text-gray-700">
                <strong>API Gateway:</strong> Unified interface for the frontend application
              </li>
              <li className="text-gray-700">
                <strong>Scheduled Jobs:</strong> Automated processes for data updates and email sends
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Data Models</Heading>
            <Text className="mb-4">
              The following data models are defined in Gadget.dev:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Product:</strong> Extends Shopify product with lifespan data
              </li>
              <li className="text-gray-700">
                <strong>Customer:</strong> Extends Shopify customer with replenishment preferences
              </li>
              <li className="text-gray-700">
                <strong>ReplenishmentRecord:</strong> Tracks customer product purchases and predicted depletion
              </li>
              <li className="text-gray-700">
                <strong>ReminderEvent:</strong> Logs all reminder emails sent and customer interactions
              </li>
            </ul>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example Gadget.dev Data Model
export const ReplenishmentRecord = gadget.recordType("ReplenishmentRecord", {
  fields: {
    customer: {
      type: gadget.relationships.belongsTo(Customer),
      required: true
    },
    product: {
      type: gadget.relationships.belongsTo(Product),
      required: true
    },
    purchaseDate: {
      type: "date",
      required: true
    },
    estimatedDepletionDate: {
      type: "date",
      required: true
    },
    actualDepletionDate: {
      type: "date",
      required: false
    },
    repurchased: {
      type: "boolean",
      defaultValue: false
    },
    remindersSent: {
      type: "number",
      defaultValue: 0
    },
    lastReminderDate: {
      type: "date",
      required: false
    }
  }
});`}
            </Code>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">API Endpoints</Heading>
            <Text className="mb-4">
              The app exposes the following API endpoints through Gadget.dev:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>/api/customer-replenishments:</strong> Get all replenishments for a customer
              </li>
              <li className="text-gray-700">
                <strong>/api/product-lifespan:</strong> Get or update product lifespan data
              </li>
              <li className="text-gray-700">
                <strong>/api/trigger-reminder:</strong> Manually trigger a reminder email
              </li>
              <li className="text-gray-700">
                <strong>/api/analytics:</strong> Get reminder performance metrics
              </li>
            </ul>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example API Endpoint in Gadget.dev
export const getCustomerReplenishments = gadget.api.get(
  "/api/customer-replenishments",
  {
    params: {
      customerId: {
        type: "string",
        required: true
      }
    },
    authentication: {
      required: true
    },
    response: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          productId: { type: "string" },
          productTitle: { type: "string" },
          purchaseDate: { type: "string", format: "date-time" },
          estimatedDepletionDate: { type: "string", format: "date-time" },
          daysRemaining: { type: "number" }
        }
      }
    }
  },
  async ({ params, authentication }) => {
    // Implementation to fetch customer replenishments
    const records = await ReplenishmentRecord.findMany({
      where: {
        customer: {
          shopifyCustomerId: params.customerId
        }
      },
      include: {
        product: true
      }
    });

    return records.map(record => ({
      id: record.id,
      productId: record.product.shopifyProductId,
      productTitle: record.product.title,
      purchaseDate: record.purchaseDate,
      estimatedDepletionDate: record.estimatedDepletionDate,
      daysRemaining: calculateDaysRemaining(record.estimatedDepletionDate)
    }));
  }
);`}
            </Code>
          </div>

          <Separator />

          <div>
            <Heading className="text-lg font-semibold mb-2">Scheduled Jobs</Heading>
            <Text className="mb-4">
              Gadget.dev runs the following scheduled jobs:
            </Text>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                <strong>Daily Data Sync:</strong> Syncs product and customer data from Shopify
              </li>
              <li className="text-gray-700">
                <strong>Monthly Reminder Generation:</strong> Creates and schedules the monthly reminder emails
              </li>
              <li className="text-gray-700">
                <strong>Depletion Prediction Update:</strong> Refines product depletion date estimates
              </li>
              <li className="text-gray-700">
                <strong>Analytics Calculation:</strong> Processes reminder effectiveness metrics
              </li>
            </ul>
            <Code className="bg-gray-100 p-4 rounded-md block whitespace-pre text-sm mt-4">
{`// Example Scheduled Job
export const monthlyReminderJob = gadget.job({
  schedule: "0 0 1 * *", // Run at midnight on the 1st of each month
  action: async () => {
    // Get all customers with products nearing depletion
    const replenishmentRecords = await ReplenishmentRecord.findMany({
      where: {
        estimatedDepletionDate: {
          gte: new Date(),
          lte: addDays(new Date(), 30)
        }
      },
      include: {
        customer: true,
        product: true
      }
    });

    // Group by customer
    const customerMap = new Map();
    for (const record of replenishmentRecords) {
      if (!customerMap.has(record.customer.id)) {
        customerMap.set(record.customer.id, {
          customer: record.customer,
          products: []
        });
      }
      
      customerMap.get(record.customer.id).products.push({
        product: record.product,
        depletionDate: record.estimatedDepletionDate
      });
    }

    // Send reminder emails
    for (const { customer, products } of customerMap.values()) {
      await sendReminderEmail(customer, products);
      
      // Update reminder sent count
      for (const product of products) {
        await ReplenishmentRecord.update({
          where: {
            customer: { id: customer.id },
            product: { id: product.product.id }
          },
          data: {
            remindersSent: { increment: 1 },
            lastReminderDate: new Date()
          }
        });
      }
    }

    return {
      customersNotified: customerMap.size,
      totalProductsIncluded: replenishmentRecords.length
    };
  }
});`}
            </Code>
          </div>
        </div>
      </Card>

      {/* Integration Architecture Diagram */}
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Integration Architecture</Heading>
        <div className="space-y-4">
          <Text className="mb-2">
            The overall integration architecture follows this data flow:
          </Text>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-gray-700">
              <strong>Data Collection:</strong> Customer purchases and product data from Shopify
            </li>
            <li className="text-gray-700">
              <strong>Data Processing:</strong> Product lifespan calculations and reminder scheduling in Gadget.dev
            </li>
            <li className="text-gray-700">
              <strong>Customer Communication:</strong> Personalized reminder emails sent via Klaviyo
            </li>
            <li className="text-gray-700">
              <strong>User Interaction:</strong> Customer views and manages replenishments in Shopify account or clicks through email
            </li>
            <li className="text-gray-700">
              <strong>Conversion:</strong> Customer completes replenishment purchase in Shopify store
            </li>
            <li className="text-gray-700">
              <strong>Analytics:</strong> Purchase and engagement data collected and analyzed
            </li>
          </ol>
          
          <div className="bg-gray-100 p-6 rounded-md mt-4 text-center">
            [Integration Architecture Diagram - Visual representation of data flow between Shopify, Gadget.dev, and Klaviyo]
          </div>
          
          <Text className="text-sm text-gray-600 mt-4">
            Note: The architecture is designed for scalability, with separate processing for data synchronization, 
            reminder generation, and analytics to ensure optimal performance even with large customer bases.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationPointsDocs;
