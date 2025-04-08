
# Gadget Integration Guide

## Introduction

This guide provides comprehensive instructions for integrating the Replenish Reminder app with Gadget.dev's backend services. Gadget.dev serves as the primary backend platform for processing product lifespan data, customer payday information, and value metrics calculations.

## Latest Gadget.dev Features (2025)

### Type-Safe Route Parameters

Gadget.dev now supports fully typed route parameters, enhancing developer experience and reducing runtime errors. The Replenish Reminder app leverages this feature for all API endpoints to ensure type safety throughout the application.

```typescript
// Example of typed route parameters
export type ProductValueParams = {
  productId: string;
  includeMetafields?: boolean;
  calculationMethod?: 'standard' | 'enhanced';
};

// Using typed parameters in Gadget.dev routes
gadget.routes.get<ProductValueParams>(
  "/products/:productId/value", 
  { middleware: [gadget.auth.requireApiKey] },
  async (req, res) => {
    const { productId, includeMetafields = false, calculationMethod = 'standard' } = req.params;
    // Implementation using typed parameters
  }
);
```

### Environment Variable Groups

The latest version of Gadget.dev introduces Environment Variable Groups, allowing for environment-specific configuration across development, staging, and production environments. This feature is essential for maintaining separate configurations for Shopify API endpoints, credentials, and feature flags.

```typescript
// Environment-specific configuration via Gadget.dev
const config = {
  development: {
    apiUrl: 'https://escentual-dev.myshopify.com/api',
    featureFlags: {
      enableEnhancedValueMetrics: true,
      useTestCustomers: true
    }
  },
  production: {
    apiUrl: 'https://escentual.myshopify.com/api',
    featureFlags: {
      enableEnhancedValueMetrics: false,
      useTestCustomers: false
    }
  }
};

// Access environment-specific configuration
const env = gadget.env.current(); // 'development', 'staging', or 'production'
const apiUrl = config[env].apiUrl;
```

### Enhanced Shopify Connection

Gadget.dev has improved its Shopify connection capabilities with support for Shopify's 2025.01 API version and the new Admin API GraphQL features. This includes:

1. **Metafield Definition API**: Create and manage product metafield definitions programmatically
2. **Enhanced Customer Data API**: Access comprehensive customer purchase patterns
3. **Subscription API 2.0**: Improved subscription management capabilities
4. **Performance Analytics API**: Access to storefront performance metrics

### Improved Security Features

New security features in Gadget.dev include:

1. **Role-Based Access Control**: Fine-grained permission management for API endpoints
2. **Enhanced API Key Management**: Rotation schedules and usage tracking
3. **Audit Logging**: Comprehensive logging of all API interactions
4. **GDPR Compliance Tools**: Built-in data management for GDPR requirements

## Integration Steps

### 1. Setting Up Your Gadget.dev Project

1. Create a new Gadget.dev application:
   - Log in to your Gadget.dev dashboard
   - Click "New Application"
   - Select "Shopify Integration" template
   - Name your application (e.g., "Escentual-Replenishment")

2. Configure Shopify connection:
   - Enter your Shopify store URL
   - Authorize the requested scopes:
     - `read_products`
     - `read_customers`
     - `read_orders`
     - `write_metafields`

3. Set up environment variables:
   - Create separate environment groups for development, staging, and production
   - Configure Shopify API credentials for each environment
   - Set up Klaviyo API keys if using email integration

### 2. Data Model Configuration

Create the following models in your Gadget.dev application:

#### Product Lifespan Model
- `productId` (String): Shopify product ID
- `estimatedLifespan` (Number): Days the product typically lasts
- `confidenceScore` (Number): Confidence in the lifespan estimate (0-1)
- `dataSources` (Array): Sources used for lifespan calculation
- `lastUpdated` (DateTime): When the estimate was last updated

#### Customer Payday Model
- `customerId` (String): Shopify customer ID
- `paydayDate` (Number): Day of month for payday (1-31)
- `paydayFrequency` (String): 'weekly', 'biweekly', or 'monthly'
- `confidenceScore` (Number): Confidence in payday detection (0-1)
- `lastUpdated` (DateTime): When the payday data was last updated

#### Reminder Schedule Model
- `customerId` (String): Shopify customer ID
- `productId` (String): Shopify product ID
- `estimatedDepletionDate` (DateTime): When product will run out
- `reminderDate` (DateTime): When to send the reminder
- `status` (String): 'scheduled', 'sent', or 'clicked'

### 3. API Implementation

Create the following API endpoints in your Gadget.dev application:

#### Value Metrics API
```typescript
gadget.routes.get<{ productId: string }>(
  "/products/:productId/value-metrics", 
  { middleware: [gadget.auth.requireApiKey] },
  async (req, res) => {
    const product = await gadget.connections.shopify.get(
      `/products/${req.params.productId}.json`
    );
    
    const valueMetrics = await calculateValueMetrics(product.product);
    
    res.json({ valueMetrics });
  }
);
```

#### Customer Payday API
```typescript
gadget.routes.post<{ customerId: string }>(
  "/customers/:customerId/payday", 
  { middleware: [gadget.auth.requireApiKey] },
  async (req, res) => {
    const { paydayDate, frequency } = req.body;
    
    await gadget.models.CustomerPayday.findOne({
      filter: { customerId: req.params.customerId }
    }).upsert({
      create: {
        customerId: req.params.customerId,
        paydayDate,
        paydayFrequency: frequency,
        confidenceScore: 1.0, // Direct input has high confidence
        lastUpdated: new Date()
      },
      update: {
        paydayDate,
        paydayFrequency: frequency,
        confidenceScore: 1.0,
        lastUpdated: new Date()
      }
    });
    
    res.json({ success: true });
  }
);
```

#### Reminder Scheduling API
```typescript
gadget.routes.post<{ customerId: string }>(
  "/customers/:customerId/reminders/schedule", 
  { middleware: [gadget.auth.requireApiKey] },
  async (req, res) => {
    const { productId } = req.body;
    
    // Get customer payday information
    const paydayInfo = await gadget.models.CustomerPayday.findOne({
      filter: { customerId: req.params.customerId }
    });
    
    // Get product lifespan information
    const lifespanInfo = await gadget.models.ProductLifespan.findOne({
      filter: { productId }
    });
    
    // Calculate optimal reminder date
    const reminderDate = calculateReminderDate(
      new Date(), 
      lifespanInfo.estimatedLifespan,
      paydayInfo.paydayDate,
      paydayInfo.paydayFrequency
    );
    
    // Create reminder schedule
    await gadget.models.ReminderSchedule.create({
      customerId: req.params.customerId,
      productId,
      estimatedDepletionDate: new Date(Date.now() + lifespanInfo.estimatedLifespan * 86400000),
      reminderDate,
      status: 'scheduled'
    });
    
    res.json({ 
      success: true,
      reminderDate 
    });
  }
);
```

### 4. Scheduled Jobs

Set up the following scheduled jobs in your Gadget.dev application:

#### Daily Reminder Processing
```typescript
gadget.jobs.schedule("process-daily-reminders", "0 8 * * *", async () => {
  const today = new Date();
  
  // Find reminders scheduled for today
  const reminders = await gadget.models.ReminderSchedule.findMany({
    filter: {
      reminderDate: { lte: today },
      status: "scheduled"
    }
  });
  
  // Process each reminder
  for (const reminder of reminders) {
    // Get product and customer details
    const product = await gadget.connections.shopify.get(
      `/products/${reminder.productId}.json`
    );
    
    const customer = await gadget.connections.shopify.get(
      `/customers/${reminder.customerId}.json`
    );
    
    // Send reminder email via Klaviyo (if integrated)
    if (process.env.KLAVIYO_API_KEY) {
      await sendKlaviyoEmail(
        customer.customer.email,
        "replenishment_reminder",
        {
          product_name: product.product.title,
          product_image: product.product.image?.src,
          depletion_date: reminder.estimatedDepletionDate,
          reorder_url: `https://escentual.com/products/${product.product.handle}`
        }
      );
    }
    
    // Update reminder status
    await gadget.models.ReminderSchedule.update(reminder.id, {
      status: "sent"
    });
  }
});
```

#### Weekly Payday Detection
```typescript
gadget.jobs.schedule("detect-customer-paydays", "0 0 * * 0", async () => {
  // Get customers with recent orders
  const orders = await gadget.connections.shopify.get(
    `/orders.json?status=any&created_at_min=${getDateXDaysAgo(30)}`
  );
  
  // Group orders by customer
  const customerOrders = groupOrdersByCustomer(orders.orders);
  
  // Detect payday patterns for each customer
  for (const [customerId, orders] of Object.entries(customerOrders)) {
    if (orders.length >= 2) {
      const { 
        paydayDate, 
        paydayFrequency,
        confidenceScore 
      } = detectPaydayPattern(orders);
      
      if (confidenceScore > 0.6) {
        // Update customer payday information
        await gadget.models.CustomerPayday.findOne({
          filter: { customerId }
        }).upsert({
          create: {
            customerId,
            paydayDate,
            paydayFrequency,
            confidenceScore,
            lastUpdated: new Date()
          },
          update: {
            paydayDate,
            paydayFrequency,
            confidenceScore,
            lastUpdated: new Date()
          }
        });
      }
    }
  }
});
```

### 5. Frontend Integration

To integrate your Replenish Reminder frontend with Gadget.dev:

1. Install the Gadget.dev client library:
```bash
npm install @gadgetinc/react-client-core
```

2. Configure the client with environment-specific settings:
```typescript
import { createGadgetClient, GadgetProvider } from '@gadgetinc/react-client-core';

const getEnvironmentConfig = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('dev') || hostname.includes('localhost')) {
    return {
      environment: 'development',
      apiKey: process.env.GADGET_DEV_API_KEY
    };
  } else if (hostname.includes('staging')) {
    return {
      environment: 'staging',
      apiKey: process.env.GADGET_STAGING_API_KEY
    };
  } else {
    return {
      environment: 'production',
      apiKey: process.env.GADGET_PRODUCTION_API_KEY
    };
  }
};

const { environment, apiKey } = getEnvironmentConfig();

const client = createGadgetClient({
  environment,
  apiKey
});

// Wrap your app with the provider
function App() {
  return (
    <GadgetProvider client={client}>
      {/* Your app components */}
    </GadgetProvider>
  );
}
```

3. Use the client in your components:
```typescript
import { useGadget } from '@gadgetinc/react-client-core';

function ProductValueMetrics({ productId }) {
  const gadget = useGadget();
  const [valueMetrics, setValueMetrics] = useState(null);
  
  useEffect(() => {
    async function fetchValueMetrics() {
      const response = await gadget.api.get(`/products/${productId}/value-metrics`);
      setValueMetrics(response.data.valueMetrics);
    }
    
    fetchValueMetrics();
  }, [productId]);
  
  // Render value metrics
}
```

## Latest Shopify Changelog Integration (2025)

### Metafield Value Types

Shopify has expanded metafield value types to include new structured data types. Replenish Reminder now uses these enhanced metafield types for storing product lifespan and value metrics data:

```typescript
// Update product metafields with the new value types
async function updateProductMetafields(productId, lifespanData) {
  return gadget.connections.shopify.post(
    `/products/${productId}/metafields.json`,
    {
      metafield: {
        namespace: "replenish_reminder",
        key: "product_lifespan_data",
        value: JSON.stringify({
          estimated_days: lifespanData.estimatedLifespan,
          confidence_score: lifespanData.confidenceScore,
          data_sources: lifespanData.dataSources,
          last_updated: new Date().toISOString()
        }),
        type: "json"  // Using the enhanced JSON type
      }
    }
  );
}
```

### Customer Segments API

Leverage Shopify's Customer Segments API for creating dynamic customer groups based on payday patterns:

```typescript
// Create a segment for customers with specific payday date
async function createPaydaySegment(paydayDate) {
  return gadget.connections.shopify.post(
    `/customer_segments.json`,
    {
      customer_segment: {
        name: `Payday ${paydayDate} Customers`,
        query: `tag:payday-${paydayDate}`,
        shop_id: process.env.SHOPIFY_SHOP_ID
      }
    }
  );
}

// Tag customer with their payday date
async function tagCustomerWithPayday(customerId, paydayDate) {
  return gadget.connections.shopify.put(
    `/customers/${customerId}.json`,
    {
      customer: {
        id: customerId,
        tags: `payday-${paydayDate}`
      }
    }
  );
}
```

### Shopify Checkout Extensions

Integrate with Shopify's Checkout Extensions to collect payday information during checkout:

```typescript
// Example checkpoint extension in Gadget.dev
gadget.extensions.checkout.create({
  name: "Payday Information Collection",
  target: "purchase.checkout.payment-method.render-after",
  metafields: [
    {
      namespace: "replenish_reminder",
      key: "payday_information",
      label: "When do you typically get paid?",
      type: "single_line_text_field"
    }
  ]
});
```

## Testing and Verification

To verify your Gadget.dev integration is working correctly:

1. **API Testing**:
   - Use the Gadget.dev API Explorer to test each endpoint
   - Verify responses match expected formats
   - Test error handling with invalid inputs

2. **Job Testing**:
   - Run scheduled jobs manually to verify functionality
   - Check outputs in the Gadget.dev logs
   - Verify data is correctly updated in the database

3. **Frontend Testing**:
   - Test API calls from the frontend
   - Verify data is displayed correctly
   - Test error handling and loading states

## Troubleshooting Common Issues

### Authentication Failures
- Verify API keys are correctly set for each environment
- Check that Shopify connection is properly authorized
- Ensure proper middleware is applied to protected routes

### Data Synchronization Issues
- Check Shopify webhook configurations
- Verify Gadget.dev jobs are running as scheduled
- Inspect job logs for errors or failures

### Performance Problems
- Enable Gadget.dev Performance Monitoring
- Check for N+1 query patterns
- Implement pagination for large data sets
- Use caching for frequently accessed data

## Support and Resources

- Gadget.dev Documentation: https://docs.gadget.dev
- Shopify Developer Documentation: https://shopify.dev
- Replenish Reminder Support: support@replenishreminder.com
