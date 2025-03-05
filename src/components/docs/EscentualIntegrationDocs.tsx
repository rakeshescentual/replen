
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, ShoppingCart, Mail, Users, Clock, DollarSign } from "lucide-react";

const EscentualIntegrationDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Escentual.com Integration Guide</Heading>
        <Text className="mb-6">
          Comprehensive integration guide for implementing Replenish Reminder with Escentual.com's Shopify Plus store.
          This document outlines all technical requirements and implementation details.
        </Text>

        <div className="space-y-8">
          <section>
            <Heading className="text-xl font-semibold mb-4">Website Integration Overview</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-blue-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Product Lifespan Display</p>
                    <p className="text-sm text-gray-600">
                      Show customers how long products typically last based on real usage data, building trust and informing purchase decisions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-green-600">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Cost-Per-Day Metrics</p>
                    <p className="text-sm text-gray-600">
                      Highlight value by showing the daily cost of premium products, making higher-priced items more appealing when their per-day cost is low.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-purple-600">
                    <ShoppingCart size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Subscription Recommendations</p>
                    <p className="text-sm text-gray-600">
                      Automatically recommend subscription intervals based on predicted product lifespans, increasing subscription adoption.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-orange-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Multilingual Support</p>
                    <p className="text-sm text-gray-600">
                      Widget text supports full internationalization for Escentual.com's global customer base.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Implementation Checklist</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Estimated Time</TableHead>
                  <TableHead>Required Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1. Create metafield definitions</TableCell>
                  <TableCell>Set up the required metafield structure in Shopify Admin</TableCell>
                  <TableCell>30 minutes</TableCell>
                  <TableCell>Shopify Admin access</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2. Install Liquid snippet</TableCell>
                  <TableCell>Add the widget code to product template</TableCell>
                  <TableCell>15 minutes</TableCell>
                  <TableCell>Theme editing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3. Initial data sync</TableCell>
                  <TableCell>Sync product lifespan data to Shopify</TableCell>
                  <TableCell>1 hour</TableCell>
                  <TableCell>API knowledge</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">4. Testing</TableCell>
                  <TableCell>Verify widget displays correctly on product pages</TableCell>
                  <TableCell>1 hour</TableCell>
                  <TableCell>QA testing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5. Translations</TableCell>
                  <TableCell>Add translations for all supported languages</TableCell>
                  <TableCell>2 hours</TableCell>
                  <TableCell>Localization</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>

          <section>
            <Heading className="text-xl font-semibold mb-4">Escentual.com Theme Integration</Heading>
            <div className="p-4 bg-gray-50 border rounded-md mb-4">
              <p className="text-sm mb-3">
                <span className="font-medium">Recommended placement:</span> Insert the widget code just below the product price display 
                in your product template file.
              </p>
              <p className="text-sm">
                <span className="font-medium">Theme file path:</span> <code className="bg-gray-100 px-1.5 py-0.5 rounded">sections/product-template.liquid</code>
              </p>
            </div>
            
            <div className="space-y-4">
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-2">Escentual.com Theme Styling Notes</Heading>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>The widget uses <code className="bg-gray-100 px-1 py-0.5 rounded">font-family: 'Nunito Sans'</code> to match Escentual.com's typography</li>
                  <li>Color scheme uses Escentual.com's blue (#3b82f6) as the primary accent color</li>
                  <li>Responsive design matches Escentual.com's mobile breakpoints</li>
                  <li>All CSS is scoped with custom prefixes to avoid theme conflicts</li>
                </ul>
              </Card>
              
              <Card className="p-4 border">
                <Heading className="text-base font-medium mb-2">Translation Support</Heading>
                <Text className="text-sm mb-3">
                  For Escentual.com's international stores, use Shopify's translation system:
                </Text>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`{% if product.metafields.escentual.average_lifespan and product.metafields.escentual.cost_per_day %}
  <div class="escentual-product-value-widget">
    <div class="epvw-heading">{{ 'products.product.value_analysis' | t }}</div>
    
    <div class="epvw-metrics">
      <div class="epvw-metric">
        <!-- Icon -->
        <div class="epvw-metric-content">
          <div class="epvw-metric-label">{{ 'products.product.lasts_approximately' | t }}</div>
          <div class="epvw-metric-value">{{ product.metafields.escentual.average_lifespan }} {{ 'products.product.days' | t }}</div>
        </div>
      </div>
      
      <!-- Cost per day metric -->
    </div>
  </div>
{% endif %}`}
                </pre>
              </Card>
            </div>
          </section>
          
          <section>
            <Heading className="text-xl font-semibold mb-4">Automated Data Synchronization</Heading>
            <Text className="mb-4">
              The Replenish Reminder app automatically keeps product lifespan data synchronized with your Shopify metafields.
              Here's how the data flows:
            </Text>
            
            <div className="relative bg-white p-4 border rounded-md overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md inline-block mb-2">
                    <Users size={20} className="inline mr-2" />
                    Customer Purchase Data
                  </div>
                  <p className="text-sm text-gray-600">Order history & repurchase timing</p>
                </div>
                
                <div className="transform rotate-90 md:rotate-0 mb-4 md:mb-0">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 0L40 10L30 20V0Z" fill="#CBD5E1"/>
                    <rect width="30" height="4" y="8" fill="#CBD5E1"/>
                  </svg>
                </div>
                
                <div className="text-center mb-4 md:mb-0">
                  <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md inline-block mb-2">
                    <Clock size={20} className="inline mr-2" />
                    AI Prediction Engine
                  </div>
                  <p className="text-sm text-gray-600">Calculates optimal lifespan</p>
                </div>
                
                <div className="transform rotate-90 md:rotate-0 mb-4 md:mb-0">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 0L40 10L30 20V0Z" fill="#CBD5E1"/>
                    <rect width="30" height="4" y="8" fill="#CBD5E1"/>
                  </svg>
                </div>
                
                <div className="text-center md:text-right">
                  <div className="px-4 py-2 bg-green-100 text-green-800 rounded-md inline-block mb-2">
                    <Globe size={20} className="inline mr-2" />
                    Shopify Metafields
                  </div>
                  <p className="text-sm text-gray-600">Displayed on product pages</p>
                </div>
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
                <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 0 10 L 40 10 M 10 0 L 10 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>
          </section>
          
          <section>
            <Heading className="text-xl font-semibold mb-4">Product Selection Strategy</Heading>
            <Text className="mb-4">
              Not all products will benefit from lifespan display. Here's our recommended selection strategy for Escentual.com:
            </Text>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Category</TableHead>
                  <TableHead>Display Recommendation</TableHead>
                  <TableHead>Rationale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Skincare serums & treatments</TableCell>
                  <TableCell className="text-green-600">High priority</TableCell>
                  <TableCell>High price point makes cost-per-day metrics very appealing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Moisturizers & creams</TableCell>
                  <TableCell className="text-green-600">High priority</TableCell>
                  <TableCell>Regular replenishment items with consistent usage patterns</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cleansers & toners</TableCell>
                  <TableCell className="text-green-600">High priority</TableCell>
                  <TableCell>Daily use products with predictable consumption rates</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Makeup foundations & concealers</TableCell>
                  <TableCell className="text-yellow-600">Medium priority</TableCell>
                  <TableCell>Usage varies by customer but still beneficial</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Perfumes & fragrances</TableCell>
                  <TableCell className="text-red-600">Low priority</TableCell>
                  <TableCell>Too variable in usage patterns for accurate predictions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gift sets & limited editions</TableCell>
                  <TableCell className="text-red-600">Not recommended</TableCell>
                  <TableCell>Not designed for regular replenishment</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default EscentualIntegrationDocs;
