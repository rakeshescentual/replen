
import React, { useState } from 'react';
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Code, FileCode, RefreshCw, Mail, Database, ServerOff, Server, AlertTriangle } from "lucide-react";

const IntegrationPointsDocs = () => {
  const [activeTab, setActiveTab] = useState('gadget');
  
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Integration Points Documentation</Heading>
        <Text className="mb-6">
          The Replenish Reminder app integrates with several key platforms to provide a seamless experience. 
          This documentation outlines the integration points, data flows, and implementation details.
        </Text>
        
        <Tabs defaultValue="gadget" onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap gap-2">
            <TabsTrigger value="gadget">Gadget.dev</TabsTrigger>
            <TabsTrigger value="klaviyo">Klaviyo</TabsTrigger>
            <TabsTrigger value="shopify">Shopify</TabsTrigger>
            <TabsTrigger value="architecture">System Architecture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gadget">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Gadget.dev Integration</Heading>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Text className="mb-4">
                      Gadget.dev serves as the backend platform for the Replenish Reminder app, handling the core business logic,
                      data processing, and integration between Shopify and Klaviyo.
                    </Text>
                    
                    <Alert className="mb-4">
                      <Server className="h-4 w-4" />
                      <AlertTitle>Backend Platform</AlertTitle>
                      <AlertDescription>
                        Gadget.dev provides a serverless environment that simplifies backend development and offers
                        scalable infrastructure for the app.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <Card className="p-4 bg-slate-50">
                    <Heading className="text-lg font-medium mb-2">Key Integration Points</Heading>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Seamless Shopify API access with built-in authentication</li>
                      <li>Direct Klaviyo API integration for sending emails</li>
                      <li>Data models and storage for product lifespan data</li>
                      <li>Scheduled jobs for reminder processing</li>
                      <li>RESTful API endpoints for app frontend</li>
                    </ul>
                  </Card>
                </div>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger>Gadget.dev Setup and Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        To set up the Gadget.dev backend for Replenish Reminder, follow these steps:
                      </Text>
                      
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Create a Gadget.dev account and create a new app</li>
                        <li>Connect your Shopify store by installing the Shopify connection</li>
                        <li>Add the Klaviyo connection by providing your Klaviyo API key</li>
                        <li>Create the necessary data models (Products, Customers, Reminders)</li>
                        <li>Set up scheduled jobs for reminder processing</li>
                        <li>Deploy the backend</li>
                      </ol>
                      
                      <Card className="p-4 bg-amber-50 border-amber-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <Heading className="text-md font-medium text-amber-800">Important Security Note</Heading>
                            <Text className="text-sm text-amber-700 mt-1">
                              Never expose your Gadget.dev API keys in frontend code. All API requests should be proxied
                              through the Gadget.dev backend to maintain security.
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="datamodels">
                  <AccordionTrigger>Data Models and Schemas</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following data models are used in the Gadget.dev backend:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Model</TableHead>
                              <TableHead>Purpose</TableHead>
                              <TableHead>Key Fields</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Product</TableCell>
                              <TableCell>Store product lifespan data</TableCell>
                              <TableCell>
                                <code>id, title, estimatedLifespan, category, suggestedSubscription</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">CustomerProduct</TableCell>
                              <TableCell>Track customer-specific product usage</TableCell>
                              <TableCell>
                                <code>customerId, productId, purchaseDate, estimatedDepletionDate</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">ReminderCampaign</TableCell>
                              <TableCell>Track reminder email campaigns</TableCell>
                              <TableCell>
                                <code>templateId, productIds, status, scheduledDate, sentDate</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">ReminderStat</TableCell>
                              <TableCell>Store reminder effectiveness metrics</TableCell>
                              <TableCell>
                                <code>campaignId, opens, clicks, conversions, revenue</code>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="apis">
                  <AccordionTrigger>API Endpoints</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The Gadget.dev backend exposes the following API endpoints:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Endpoint</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead>Purpose</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/products</code>
                              </TableCell>
                              <TableCell>GET</TableCell>
                              <TableCell>Get all products with lifespan data</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/products/:id</code>
                              </TableCell>
                              <TableCell>GET</TableCell>
                              <TableCell>Get a specific product</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/products/:id</code>
                              </TableCell>
                              <TableCell>PUT</TableCell>
                              <TableCell>Update product lifespan data</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/customers/:id/products</code>
                              </TableCell>
                              <TableCell>GET</TableCell>
                              <TableCell>Get a customer's product purchase data</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/reminders/schedule</code>
                              </TableCell>
                              <TableCell>POST</TableCell>
                              <TableCell>Schedule personalized reminders</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">
                                <code>/analytics/reminders</code>
                              </TableCell>
                              <TableCell>GET</TableCell>
                              <TableCell>Get reminder effectiveness metrics</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="jobs">
                  <AccordionTrigger>Scheduled Jobs</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        Gadget.dev scheduled jobs are used for automated recurring tasks:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Job Name</TableHead>
                              <TableHead>Schedule</TableHead>
                              <TableHead>Purpose</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">syncShopifyProducts</TableCell>
                              <TableCell>Daily at 1:00 AM</TableCell>
                              <TableCell>Sync product data from Shopify</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">processReminderQueue</TableCell>
                              <TableCell>Every 4 hours</TableCell>
                              <TableCell>Process reminder queue and send due reminders</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">updateReminderStats</TableCell>
                              <TableCell>Every 6 hours</TableCell>
                              <TableCell>Update reminder effectiveness statistics</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">monthlyReplenishmentReport</TableCell>
                              <TableCell>1st day of month at 6:00 AM</TableCell>
                              <TableCell>Generate monthly replenishment reports</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="klaviyo">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Klaviyo Integration</Heading>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Text className="mb-4">
                      Klaviyo serves as the email marketing and automation platform for the Replenish Reminder app,
                      enabling personalized reminder emails and automated customer communication workflows.
                    </Text>
                    
                    <Alert className="mb-4">
                      <Mail className="h-4 w-4" />
                      <AlertTitle>Email Marketing Platform</AlertTitle>
                      <AlertDescription>
                        Klaviyo provides robust email marketing capabilities with advanced segmentation,
                        personalization, and analytics for tracking email performance.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <Card className="p-4 bg-slate-50">
                    <Heading className="text-lg font-medium mb-2">Key Integration Points</Heading>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Sending personalized replenishment reminder emails</li>
                      <li>Customer profile management in Klaviyo</li>
                      <li>Tracking email opens, clicks, and conversions</li>
                      <li>Event tracking for customer behavior analysis</li>
                      <li>Automated flows for reminder sequences</li>
                    </ul>
                  </Card>
                </div>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="setup">
                  <AccordionTrigger>Klaviyo Setup and Configuration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        To set up the Klaviyo integration for Replenish Reminder, follow these steps:
                      </Text>
                      
                      <ol className="list-decimal pl-6 space-y-2">
                        <li>Create a Klaviyo account if you don't have one</li>
                        <li>Generate a Private API Key with appropriate permissions</li>
                        <li>Set up the API key in your Gadget.dev backend</li>
                        <li>Create lists for reminder recipients</li>
                        <li>Set up email templates for different reminder types</li>
                        <li>Configure tracking to properly attribute conversions</li>
                      </ol>
                      
                      <Card className="p-4 bg-amber-50 border-amber-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <Heading className="text-md font-medium text-amber-800">Important Security Note</Heading>
                            <Text className="text-sm text-amber-700 mt-1">
                              Store your Klaviyo API key securely in Gadget.dev environment variables. Never include the API key
                              in client-side code or public repositories.
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="events">
                  <AccordionTrigger>Event Tracking</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following events are tracked in Klaviyo:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Event</TableHead>
                              <TableHead>Purpose</TableHead>
                              <TableHead>Properties</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Replenishment Reminder Sent</TableCell>
                              <TableCell>Track when a reminder email is sent</TableCell>
                              <TableCell>
                                <code>productId, daysRemaining, reminderType</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Replenishment Reminder Opened</TableCell>
                              <TableCell>Track when a reminder email is opened</TableCell>
                              <TableCell>
                                <code>productId, reminderType, campaignId</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Replenishment Reminder Clicked</TableCell>
                              <TableCell>Track when a link in a reminder email is clicked</TableCell>
                              <TableCell>
                                <code>productId, reminderType, linkUrl, campaignId</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Replenishment Reminder Conversion</TableCell>
                              <TableCell>Track when a purchase is made after a reminder</TableCell>
                              <TableCell>
                                <code>productId, orderId, orderValue, campaignId</code>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="templates">
                  <AccordionTrigger>Email Templates</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following email templates are used for different types of reminders:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Template</TableHead>
                              <TableHead>Purpose</TableHead>
                              <TableHead>Variables</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Early Reminder</TableCell>
                              <TableCell>Sent 14 days before estimated depletion</TableCell>
                              <TableCell>
                                <code>{% raw %}{{first_name}}, {{product_name}}, {{days_remaining}}{% endraw %}</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Urgent Reminder</TableCell>
                              <TableCell>Sent 3 days before estimated depletion</TableCell>
                              <TableCell>
                                <code>{% raw %}{{first_name}}, {{product_name}}, {{days_remaining}}{% endraw %}</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Subscription Recommendation</TableCell>
                              <TableCell>Sent 7 days before estimated depletion</TableCell>
                              <TableCell>
                                <code>{% raw %}{{first_name}}, {{product_name}}, {{optimal_interval}}{% endraw %}</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Post-Depletion Reminder</TableCell>
                              <TableCell>Sent after estimated depletion date</TableCell>
                              <TableCell>
                                <code>{% raw %}{{first_name}}, {{product_name}}, {{days_since_depletion}}{% endraw %}</code>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="flows">
                  <AccordionTrigger>Klaviyo Flows</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following Klaviyo flows are used for automated email sequences:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Flow</TableHead>
                              <TableHead>Trigger</TableHead>
                              <TableHead>Steps</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Replenishment Reminder</TableCell>
                              <TableCell>API triggered when product is nearing depletion</TableCell>
                              <TableCell>
                                1. Initial reminder<br />
                                2. Follow-up reminder (if no action taken)
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Subscription Offer</TableCell>
                              <TableCell>After multiple replenishment purchases</TableCell>
                              <TableCell>
                                1. Subscription offer email<br />
                                2. Benefits explanation<br />
                                3. Final offer with incentive
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Post-Purchase Feedback</TableCell>
                              <TableCell>30 days after purchase</TableCell>
                              <TableCell>
                                1. Feedback request<br />
                                2. Lifespan confirmation
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="shopify">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Shopify Integration</Heading>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Text className="mb-4">
                      Shopify is the core e-commerce platform that the Replenish Reminder app integrates with,
                      providing access to product data, customer information, and order history.
                    </Text>
                    
                    <Alert className="mb-4">
                      <Database className="h-4 w-4" />
                      <AlertTitle>E-commerce Platform</AlertTitle>
                      <AlertDescription>
                        Shopify serves as the foundation for the app, providing the essential data and
                        commerce functionality needed for replenishment reminders and subscriptions.
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <Card className="p-4 bg-slate-50">
                    <Heading className="text-lg font-medium mb-2">Key Integration Points</Heading>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Embedded admin app built with Shopify Polaris</li>
                      <li>Product data access via Admin API</li>
                      <li>Customer data and order history access</li>
                      <li>Product metafields for storing lifespan data</li>
                      <li>Shopify Subscription API integration</li>
                      <li>Customer account customization using Liquid</li>
                    </ul>
                  </Card>
                </div>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="apis">
                  <AccordionTrigger>Shopify APIs Used</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The app integrates with the following Shopify APIs:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>API</TableHead>
                              <TableHead>Purpose</TableHead>
                              <TableHead>Permissions Required</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Admin API (GraphQL)</TableCell>
                              <TableCell>Access product, customer, and order data</TableCell>
                              <TableCell>
                                <code>read_products, read_customers, read_orders</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Admin API (REST)</TableCell>
                              <TableCell>Metafield management for products</TableCell>
                              <TableCell>
                                <code>write_products</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Subscription API</TableCell>
                              <TableCell>Manage subscription contracts</TableCell>
                              <TableCell>
                                <code>read_subscription_contracts, write_subscription_contracts</code>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Storefront API</TableCell>
                              <TableCell>Customer-facing data access</TableCell>
                              <TableCell>
                                <code>unauthenticated_read_product_listings</code>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="metafields">
                  <AccordionTrigger>Product Metafields</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The app uses the following metafields to store product lifespan and subscription data:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Metafield</TableHead>
                              <TableHead>Namespace</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Type</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">estimatedLifespan</TableCell>
                              <TableCell>replenish_reminder</TableCell>
                              <TableCell>Estimated days until product depletion</TableCell>
                              <TableCell><code>integer</code></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">suggestedSubscription</TableCell>
                              <TableCell>replenish_reminder</TableCell>
                              <TableCell>Suggested subscription interval</TableCell>
                              <TableCell><code>string</code></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">valueScore</TableCell>
                              <TableCell>replenish_reminder</TableCell>
                              <TableCell>Product value score (0-100)</TableCell>
                              <TableCell><code>integer</code></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">repurchaseRate</TableCell>
                              <TableCell>replenish_reminder</TableCell>
                              <TableCell>Percentage of customers who repurchase</TableCell>
                              <TableCell><code>decimal</code></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">costPerDay</TableCell>
                              <TableCell>replenish_reminder</TableCell>
                              <TableCell>Calculated cost per day of usage</TableCell>
                              <TableCell><code>decimal</code></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="admin">
                  <AccordionTrigger>Admin App Interface</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The Shopify Admin app interface provides merchants with the following functionality:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Section</TableHead>
                              <TableHead>Purpose</TableHead>
                              <TableHead>Features</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Dashboard</TableCell>
                              <TableCell>Overview of app performance</TableCell>
                              <TableCell>
                                Key metrics, reminders sent, conversion rates, revenue generated
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Product Management</TableCell>
                              <TableCell>Manage product lifespan data</TableCell>
                              <TableCell>
                                View, edit, and override product lifespan estimates
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Reminder Templates</TableCell>
                              <TableCell>Manage email templates</TableCell>
                              <TableCell>
                                Create, edit, preview, and test email templates
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Analytics</TableCell>
                              <TableCell>Track reminder effectiveness</TableCell>
                              <TableCell>
                                Open rates, click rates, conversion rates, revenue impact
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Settings</TableCell>
                              <TableCell>Configure app settings</TableCell>
                              <TableCell>
                                Klaviyo integration, reminder timing, app behavior
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="customer">
                  <AccordionTrigger>Customer Account Integration</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The "My Replenishments" section integrated into Shopify customer accounts provides the following features:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Feature</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Implementation Method</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Product Timeline</TableCell>
                              <TableCell>Visual timeline of product depletion dates</TableCell>
                              <TableCell>
                                Liquid template with JavaScript for visualization
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Subscription Status</TableCell>
                              <TableCell>View active subscriptions and details</TableCell>
                              <TableCell>
                                Integration with Shopify Subscription API
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">One-Click Reorder</TableCell>
                              <TableCell>Quickly reorder depleting products</TableCell>
                              <TableCell>
                                AJAX cart API + instant checkout link
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Reminder Preferences</TableCell>
                              <TableCell>Control reminder frequency and channels</TableCell>
                              <TableCell>
                                Customer metafields + app preferences
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      <Card className="p-4 bg-slate-50">
                        <Heading className="text-lg font-medium mb-2">Liquid Theme Integration</Heading>
                        <Text className="mb-4">
                          The customer account section is implemented using Liquid templates that are injected into the
                          customer account pages through Shopify's theme customization.
                        </Text>
                        <div className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
                          <pre className="text-sm"><code>{`<!-- Simplified implementation example -->
{% if customer %}
  {% section 'replenishment-reminders' %}
{% endif %}`}</code></pre>
                        </div>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="architecture">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">System Architecture</Heading>
                <Text className="mb-6">
                  The Replenish Reminder app uses a comprehensive system architecture that integrates
                  Shopify, Gadget.dev, and Klaviyo to provide a seamless replenishment reminder experience.
                </Text>
                
                <Card className="p-6 bg-slate-50">
                  <Heading className="text-lg font-medium mb-4">Data Flow Diagram</Heading>
                  <div className="p-4 border rounded bg-white">
                    <pre className="text-sm overflow-x-auto">
{`
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│                │     │                │     │                │
│     Shopify    │◄────┤   Gadget.dev   │────►│     Klaviyo    │
│                │     │                │     │                │
└────────────────┘     └────────────────┘     └────────────────┘
     │      ▲                │   ▲                 │    ▲
     │      │                │   │                 │    │
     ▼      │                ▼   │                 ▼    │
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│                │     │                │     │                │
│ Product Data   │     │ Business Logic │     │ Email Delivery │
│ Customer Data  │     │ Data Processing│     │ Event Tracking │
│ Order History  │     │ API Endpoints  │     │                │
│                │     │                │     │                │
└────────────────┘     └────────────────┘     └────────────────┘
                              │   ▲
                              │   │
                              ▼   │
                        ┌────────────────┐
                        │                │
                        │  React/Polaris │
                        │  Admin UI      │
                        │                │
                        └────────────────┘
`}
                    </pre>
                  </div>
                </Card>
              </section>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dataflow">
                  <AccordionTrigger>Data Flow Process</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following describes the key data flows in the Replenish Reminder app:
                      </Text>
                      
                      <ol className="list-decimal pl-6 space-y-4">
                        <li>
                          <p className="font-medium">Product Data Synchronization</p>
                          <p className="text-sm">
                            Shopify product data is synchronized to Gadget.dev via scheduled jobs.
                            This includes product details, variant information, and pricing.
                            Gadget.dev enriches this data with lifespan estimations and stores it
                            in its database.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Purchase Tracking</p>
                          <p className="text-sm">
                            When a customer makes a purchase in Shopify, the order data is sent to
                            Gadget.dev, which records the purchase date, products purchased, and
                            calculates estimated depletion dates based on product lifespan data.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Reminder Scheduling</p>
                          <p className="text-sm">
                            Gadget.dev continuously monitors customer purchase history and product
                            lifespan data to determine when reminders should be sent. When a product
                            is nearing its estimated depletion date, Gadget.dev triggers a reminder.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Email Delivery</p>
                          <p className="text-sm">
                            Gadget.dev uses the Klaviyo API to send personalized reminder emails to
                            customers. The emails include product information, custom messaging, and
                            direct reorder links.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Conversion Tracking</p>
                          <p className="text-sm">
                            When a customer makes a purchase after receiving a reminder, the conversion
                            is tracked. Shopify records the order, Gadget.dev associates it with the
                            reminder campaign, and Klaviyo updates the campaign performance metrics.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Analytics</p>
                          <p className="text-sm">
                            Gadget.dev aggregates data from Shopify orders and Klaviyo email performance
                            to generate comprehensive analytics on reminder effectiveness, conversion rates,
                            and revenue impact.
                          </p>
                        </li>
                      </ol>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="key-components">
                  <AccordionTrigger>Key System Components</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The Replenish Reminder system consists of the following key components:
                      </Text>
                      
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Component</TableHead>
                              <TableHead>Responsibility</TableHead>
                              <TableHead>Technologies</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Shopify Admin App</TableCell>
                              <TableCell>Merchant interface for managing the app</TableCell>
                              <TableCell>React, Polaris, GraphQL</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Customer Account Integration</TableCell>
                              <TableCell>Customer-facing interface in Shopify store</TableCell>
                              <TableCell>Liquid, JavaScript, AJAX</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Backend API</TableCell>
                              <TableCell>Business logic and data processing</TableCell>
                              <TableCell>Gadget.dev, Node.js, TypeScript</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Scheduled Jobs</TableCell>
                              <TableCell>Automated tasks and data synchronization</TableCell>
                              <TableCell>Gadget.dev Jobs, Cron</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Reminder Engine</TableCell>
                              <TableCell>Determining when to send reminders</TableCell>
                              <TableCell>AI algorithms, prediction models</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Email Delivery System</TableCell>
                              <TableCell>Sending personalized reminder emails</TableCell>
                              <TableCell>Klaviyo API, email templates</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Analytics Dashboard</TableCell>
                              <TableCell>Tracking reminder effectiveness</TableCell>
                              <TableCell>Recharts, data visualization</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="security">
                  <AccordionTrigger>Security Considerations</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The following security measures are implemented in the app architecture:
                      </Text>
                      
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <p className="font-medium">API Key Management</p>
                          <p className="text-sm">
                            All API keys are stored securely in Gadget.dev environment variables,
                            never exposed in client-side code.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Authentication</p>
                          <p className="text-sm">
                            Shopify OAuth for merchant authentication, ensuring secure access to the admin app.
                            Customer authentication is handled by Shopify's secure customer accounts system.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Data Encryption</p>
                          <p className="text-sm">
                            All data is transmitted over HTTPS, and sensitive data is encrypted at rest in Gadget.dev.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Permission Scopes</p>
                          <p className="text-sm">
                            Shopify API access is limited to the minimum required scopes needed for app functionality.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Rate Limiting</p>
                          <p className="text-sm">
                            API requests are rate limited to prevent abuse and ensure system stability.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Data Minimization</p>
                          <p className="text-sm">
                            Only essential customer data is collected and stored, following data minimization principles.
                          </p>
                        </li>
                      </ul>
                      
                      <Card className="p-4 bg-amber-50 border-amber-200">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                          <div>
                            <Heading className="text-md font-medium text-amber-800">Security Best Practices</Heading>
                            <Text className="text-sm text-amber-700 mt-1">
                              Always conduct regular security audits and vulnerability assessments.
                              Keep all libraries and dependencies up to date and monitor for security advisories.
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="scalability">
                  <AccordionTrigger>Scalability Considerations</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Text>
                        The architecture is designed to scale with the following considerations:
                      </Text>
                      
                      <ul className="list-disc pl-6 space-y-3">
                        <li>
                          <p className="font-medium">Serverless Architecture</p>
                          <p className="text-sm">
                            Gadget.dev provides a serverless environment that automatically scales
                            based on load, without requiring manual infrastructure management.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Distributed Processing</p>
                          <p className="text-sm">
                            Reminder processing is distributed to handle large volumes of customers
                            and products without performance degradation.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Efficient Data Storage</p>
                          <p className="text-sm">
                            Data is structured efficiently with proper indexing to ensure fast queries
                            even as the database grows.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Caching Strategy</p>
                          <p className="text-sm">
                            Frequently accessed data is cached to reduce API calls and improve response times.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Batch Processing</p>
                          <p className="text-sm">
                            Reminder emails are processed in batches to optimize API usage and prevent rate limiting.
                          </p>
                        </li>
                        <li>
                          <p className="font-medium">Klaviyo's Scalable Infrastructure</p>
                          <p className="text-sm">
                            Klaviyo's platform is designed to handle high email volumes and traffic spikes.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default IntegrationPointsDocs;
