
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Database, Server, Code, GitBranch, CheckCircle } from "lucide-react";

/**
 * Component providing detailed information about Gadget.dev implementation
 * for Shopify app integration
 */
const GadgetImplementationGuide = () => {
  return (
    <div className="space-y-6">
      <Card className="p-5 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full">
            <Server className="h-6 w-6 text-blue-600" />
          </div>
          <Heading className="text-xl font-semibold text-blue-800">
            Gadget.dev Implementation Guide
          </Heading>
        </div>
        
        <Text className="mb-6 text-blue-700">
          This guide outlines how to implement our app backend using Gadget.dev, ensuring compatibility with both 
          Gadget.dev standards and Shopify's Built for Shopify requirements.
        </Text>
        
        <div className="bg-white p-5 rounded-lg border border-blue-100 mb-6">
          <h3 className="text-base font-medium mb-3 text-blue-800 flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Data Model Implementation
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Setting Up Data Models in Gadget.dev</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>
                  <p className="font-medium">Create the Gadget.dev project</p>
                  <p className="text-xs text-gray-600">Create a new Gadget.dev application in your dashboard</p>
                </li>
                <li>
                  <p className="font-medium">Configure the Shopify connection</p>
                  <p className="text-xs text-gray-600">Set up the Shopify connection with appropriate scopes</p>
                </li>
                <li>
                  <p className="font-medium">Define custom models</p>
                  <p className="text-xs text-gray-600">Create models for ProductLifespan, ValueMetrics, and other app-specific data</p>
                </li>
                <li>
                  <p className="font-medium">Establish relationships</p>
                  <p className="text-xs text-gray-600">Link custom models to Shopify models (Products, Customers, etc.)</p>
                </li>
              </ol>
            </div>
            
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Sample Model Definition - ProductLifespan</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`// In Gadget.dev schema editor
model ProductLifespan {
  id: ID
  shopifyProduct: BelongsTo<ShopifyProduct>
  estimatedLifespanDays: Number
  valueScore: Number
  costPerDay: Decimal
  usageFrequencyDefault: Decimal
  dataConfidence: Number
  internetDataSources: [String]
  lastUpdated: DateTime
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-blue-100 mb-6">
          <h3 className="text-base font-medium mb-3 text-blue-800 flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-600" />
            API Implementation
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Creating Gadget.dev Actions</h4>
              <p className="text-sm text-gray-700 mb-3">
                Implement these key actions to support app functionality:
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">calculateProductValue</p>
                    <p className="text-xs text-gray-600">Calculates value metrics for a product based on price and usage patterns</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">syncShopifyMetafields</p>
                    <p className="text-xs text-gray-600">Syncs calculated value metrics to Shopify product metafields</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">processInternetData</p>
                    <p className="text-xs text-gray-600">Processes crawled internet data to extract usage patterns</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">handleGDPRDataRequest</p>
                    <p className="text-xs text-gray-600">Processes GDPR data requests (required for Built for Shopify)</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Sample Action Implementation - calculateProductValue</h4>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
{`// In Gadget.dev actions editor
import { GadgetRecord, ActionExecutionScope } from "@gadgetinc/api";
import { ProductLifespan } from "../models";

/**
 * Calculate product value metrics
 * 
 * Follows Gadget.dev best practices and supports Shopify API standards
 */
export async function calculateProductValue(
  scope: ActionExecutionScope<{
    productId: string;
    price: number;
    usageFrequency: number;
  }>,
  context: { api: any }
) {
  const { params, logger } = scope;
  const { productId, price, usageFrequency } = params;
  
  try {
    // Fetch product data from Shopify
    const product = await context.api.shopifyProduct.findOne({
      filter: { id: { equals: productId } }
    });
    
    if (!product) {
      throw new Error(\`Product not found: \${productId}\`);
    }
    
    // Calculate value metrics
    const estimatedUses = 32 + (price * 0.92);
    const daysLasting = Math.floor(estimatedUses / usageFrequency);
    const costPerDay = price / daysLasting;
    const valueScore = Math.min(100, Math.max(0, 
      48 + (daysLasting / 1.75) - (costPerDay * 4.2)
    ));
    
    // Save to ProductLifespan model
    const productLifespan = await context.api.productLifespan.findFirst({
      filter: { shopifyProduct: { equals: productId } }
    });
    
    if (productLifespan) {
      await context.api.productLifespan.update(productLifespan.id, {
        estimatedLifespanDays: daysLasting,
        valueScore,
        costPerDay,
        usageFrequencyDefault: usageFrequency,
        lastUpdated: new Date()
      });
    } else {
      await context.api.productLifespan.create({
        shopifyProduct: { connect: { id: productId } },
        estimatedLifespanDays: daysLasting,
        valueScore,
        costPerDay,
        usageFrequencyDefault: usageFrequency,
        dataConfidence: 0.75,
        lastUpdated: new Date()
      });
    }
    
    // Return calculated values
    return {
      productId,
      costPerDay,
      daysLasting,
      valueScore,
      estimatedUses,
      usageFrequency
    };
  } catch (error) {
    logger.error("Error calculating product value", { error, productId });
    throw error;
  }
}`}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg border border-blue-100">
          <h3 className="text-base font-medium mb-3 text-blue-800 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-blue-600" />
            Integration With Shopify
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Shopify App Bridge Integration</h4>
              <p className="text-sm text-gray-700 mb-3">
                Ensure your Gadget.dev app properly integrates with Shopify App Bridge:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Session token authentication</p>
                    <p className="text-xs text-gray-600">Configure session validation in Gadget.dev routes</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">CORS configuration</p>
                    <p className="text-xs text-gray-600">Set up proper CORS for Shopify admin domains</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Webhook handling</p>
                    <p className="text-xs text-gray-600">Implement proper webhook verification and processing</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Shopify App Compliance</h4>
              <p className="text-sm text-gray-700 mb-3">
                Implement these features to ensure Built for Shopify compliance:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">GDPR data handlers</p>
                    <p className="text-xs text-gray-600">
                      <code className="bg-gray-100 px-1 rounded">shop/redact</code>, 
                      <code className="bg-gray-100 px-1 rounded ml-1">customers/redact</code>, 
                      <code className="bg-gray-100 px-1 rounded ml-1">customers/data_request</code>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Rate limiting</p>
                    <p className="text-xs text-gray-600">Implement proper API rate limiting for Shopify API calls</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Error logging</p>
                    <p className="text-xs text-gray-600">Comprehensive error logging for debugging and support</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-indigo-100 p-1.5 rounded-full">
            <CheckCircle className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="font-medium text-indigo-800">Gadget.dev Platform Benefits</h3>
        </div>
        <ul className="space-y-2 pl-10">
          <li className="text-sm text-indigo-700">Automatic Shopify API version management</li>
          <li className="text-sm text-indigo-700">Built-in authentication flows for Shopify</li>
          <li className="text-sm text-indigo-700">Simplified deployment and scaling</li>
          <li className="text-sm text-indigo-700">Developer-friendly environment with built-in logging</li>
          <li className="text-sm text-indigo-700">Streamlined data modeling with relationships</li>
        </ul>
      </div>
    </div>
  );
};

export default GadgetImplementationGuide;
