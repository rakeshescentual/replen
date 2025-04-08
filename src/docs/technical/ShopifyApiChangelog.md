
# Shopify API Changelog (2025)

This document outlines the key changes and additions to the Shopify API that are relevant to the Replenish Reminder app.

## API Version 2025.01

### Enhanced Metafields

The 2025.01 API version introduces significant enhancements to Shopify's metafield capabilities:

#### Expanded Value Types
- **JSON Objects**: Store complex structured data with validation
- **Color Swatches**: Native color selection and display
- **Ratings**: Built-in rating system with averages and count
- **Multi-line Text**: Rich text formatting options
- **Reference Lists**: Collections of references to other resources
- **Dimensional Values**: Support for measurements with units
- **Date Ranges**: Store date periods with validation
- **File References**: Direct links to media in Shopify CDN
- **URL Lists**: Collections of validated URLs
- **Product Variants**: Direct references to specific variants

#### Metafield Definition API
```graphql
mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    metafieldDefinition {
      id
      name
      namespace
      key
      type {
        name
        valueType
      }
      validations {
        name
        value
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

#### Implementation Example for Replenish Reminder
```typescript
// Create metafield definitions for product lifespan data
const createLifespanMetafieldDefinitions = async () => {
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  
  await client.query({
    data: {
      query: METAFIELD_DEFINITION_CREATE,
      variables: {
        definition: {
          name: "Product Lifespan Data",
          namespace: "replenish_reminder",
          key: "lifespan_data",
          type: "json",
          description: "Structured data about product lifespan and usage",
          ownerType: "PRODUCT",
          pin: true,
          validations: [
            {
              name: "structured_type",
              value: JSON.stringify({
                estimated_days: "number",
                confidence_score: "number",
                data_sources: "array",
                last_updated: "string"
              })
            }
          ]
        }
      }
    }
  });
};
```

### Customer Segments API

Shopify has introduced a powerful Customer Segments API that allows for dynamic customer grouping:

#### Key Features
- Create and manage customer segments based on complex criteria
- Automatic segment membership updates when customer data changes
- Segment analytics for behavior tracking
- Integration with marketing campaigns
- Scheduled segment refreshing
- Advanced query language for segment definition
- Customer counts and segment overlap metrics
- Segment-based discount eligibility
- Event-triggered segment updates
- Multi-store segment synchronization

#### API Example
```graphql
mutation customerSegmentCreate($input: CustomerSegmentInput!) {
  customerSegmentCreate(customerSegment: $input) {
    customerSegment {
      id
      name
      query
      customerCount
    }
    userErrors {
      field
      message
    }
  }
}
```

#### Implementation for Payday Segments
```typescript
// Create a segment for customers with a specific payday
const createPaydaySegment = async (paydayDate: number) => {
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  
  await client.query({
    data: {
      query: CUSTOMER_SEGMENT_CREATE,
      variables: {
        input: {
          name: `Payday ${paydayDate} Customers`,
          query: `tag:payday-${paydayDate}`,
        }
      }
    }
  });
};
```

### Checkout Extensions

The 2025.01 API introduces Checkout Extensions - a framework for extending the Shopify checkout experience:

#### Key Features
- Add custom UI elements to the checkout flow
- Collect additional information during checkout
- Create personalized checkout experiences
- Implement post-purchase upsell opportunities
- Dynamic shipping options based on customer data
- Custom discount application logic
- Enhanced cart validation rules
- Fraud prevention extensions
- Custom payment method flows
- Multi-page checkout customization

#### Extension Points
- `purchase.checkout.block.render`: Add custom blocks to checkout
- `purchase.checkout.payment-method.render-after`: Add UI after payment method
- `purchase.checkout.shipping-method.render-after`: Add UI after shipping method
- `purchase.checkout.contact.render-after`: Add UI after contact information
- `purchase.checkout.shipping-address.render-after`: Add UI after shipping address
- `purchase.checkout.cart-line-item.render-after`: Add UI after each cart item
- `purchase.checkout.cart-line-list.render-after`: Add UI after entire cart
- `purchase.checkout.customer.accounts.sign-in.render-after`: Add UI after sign-in
- `purchase.thank-you.details.render-after`: Add UI after order confirmation
- `purchase.checkout.header.render`: Customize checkout header

#### Implementation for Payday Collection
```typescript
// Extension configuration
const checkoutExtension = {
  extension_points: [
    {
      target: "purchase.checkout.payment-method.render-after",
      module: "./src/PaydayCollectionExtension.jsx"
    }
  ]
};

// PaydayCollectionExtension.jsx
import { extend, TextField, useStorage } from "@shopify/checkout-ui-extensions-react";

extend("Checkout", () => {
  const [paydayDate, setPaydayDate] = useStorage("payday_date");
  
  return (
    <TextField
      label="When do you typically get paid? (day of month)"
      value={paydayDate}
      onChange={setPaydayDate}
      type="number"
      min={1}
      max={31}
    />
  );
});
```

### Subscription API 2.0

Shopify has revamped its Subscription API to provide more flexible and powerful subscription management:

#### Key Features
- Enhanced subscription lifecycle management
- Flexible billing schedules
- Customer self-service portal
- Subscription analytics and reporting
- Upcoming payment notifications
- Pre-billing payment validation
- Customizable retry logic for failed payments
- Promotion and discount application
- Subscription bundling capabilities
- Subscription migration and upgrading
- Skip, pause, and resume functionality
- Subscription product swapping

#### API Example
```graphql
mutation subscriptionCreate($input: SubscriptionCreateInput!) {
  subscriptionCreate(subscription: $input) {
    subscription {
      id
      status
      nextBillingDate
      lineItems {
        edges {
          node {
            title
            quantity
            variant {
              id
            }
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

#### Implementation for Replenish Reminder
```typescript
// Create a subscription based on predicted depletion date
const createSubscription = async (customerId, productId, depletionDate) => {
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  
  // Calculate optimal billing interval based on depletion date
  const today = new Date();
  const depletionDateObj = new Date(depletionDate);
  const daysDifference = Math.floor((depletionDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Round to nearest supported interval
  let interval;
  if (daysDifference <= 14) {
    interval = {
      interval: 2,
      intervalUnit: "WEEK"
    };
  } else if (daysDifference <= 30) {
    interval = {
      interval: 1,
      intervalUnit: "MONTH"
    };
  } else if (daysDifference <= 60) {
    interval = {
      interval: 2,
      intervalUnit: "MONTH"
    };
  } else {
    interval = {
      interval: 3,
      intervalUnit: "MONTH"
    };
  }
  
  await client.query({
    data: {
      query: SUBSCRIPTION_CREATE,
      variables: {
        input: {
          customerId,
          billingPolicy: {
            interval: interval.interval,
            intervalUnit: interval.intervalUnit,
            anchors: []
          },
          lineItems: [
            {
              quantity: 1,
              variantId: productId,
            }
          ],
          nextBillingDate: depletionDateObj.toISOString().split('T')[0],
        }
      }
    }
  });
};
```

### Performance Analytics API

The Performance Analytics API provides access to storefront performance metrics:

#### Key Features
- Page load times by device type
- Checkout flow analytics
- Search performance metrics
- Real-time monitoring capabilities
- Conversion funnel analytics
- A/B test performance comparisons
- Geographic performance distribution
- Mobile vs desktop performance analysis
- Browser-specific metrics
- Network performance indicators
- Core Web Vitals measurements
- User journey performance analytics

#### API Example
```graphql
query {
  shop {
    analytics {
      performance(first: 10, after: "cursor") {
        edges {
          node {
            date
            avgPageLoadMilliseconds
            avgFirstContentfulPaintMilliseconds
            bounceRate
            deviceType
            pageType
          }
        }
      }
    }
  }
}
```

#### Implementation for Performance Monitoring
```typescript
// Fetch performance metrics for the replenishment reminder pages
const fetchPerformanceMetrics = async () => {
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  
  const response = await client.query({
    data: {
      query: `
        query {
          shop {
            analytics {
              performance(
                first: 10, 
                filter: {
                  pageType: "PRODUCT",
                  dateRange: {
                    since: "${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}",
                    until: "${new Date().toISOString().split('T')[0]}"
                  }
                }
              ) {
                edges {
                  node {
                    date
                    avgPageLoadMilliseconds
                    deviceType
                    bounceRate
                  }
                }
              }
            }
          }
        }
      `
    }
  });
  
  return response.body.data.shop.analytics.performance.edges.map(edge => edge.node);
};
```

### Shopify Functions

Shopify has expanded its Shopify Functions capability for customizing core commerce logic:

#### Key Features
- Custom discount application logic
- Personalized product recommendations
- Dynamic shipping rate calculations
- Payment processor logic customization
- Inventory allocation strategies
- Tax calculation customization
- Cart validation rules
- Order routing logic
- Customer segmentation logic
- Custom checkout workflows

#### Implementation Example
```typescript
// Creating a custom discount function
export function run(input) {
  const { cart, discountNode } = input;
  
  // Check if this is a payday for the customer
  const customerTags = cart.buyerIdentity?.customer?.tags || [];
  const paydayTag = customerTags.find(tag => tag.startsWith('payday-'));
  
  if (!paydayTag) {
    return {
      discounts: []
    };
  }
  
  // Extract payday date from tag
  const paydayDate = parseInt(paydayTag.replace('payday-', ''), 10);
  const today = new Date();
  const currentDate = today.getDate();
  
  // If today is customer's payday or within 3 days after, apply discount
  if (Math.abs(currentDate - paydayDate) <= 3) {
    return {
      discounts: [
        {
          targets: [
            {
              productVariant: {
                id: cart.lines[0].merchandise.id
              }
            }
          ],
          value: {
            percentage: {
              value: "10.0"
            }
          },
          message: "Payday special! 10% off today!"
        }
      ]
    };
  }
  
  return {
    discounts: []
  };
}
```

## Migration Guide

### Upgrading from 2024.01 to 2025.01

1. **Update API Version**
   ```typescript
   // Before
   const api = new Shopify.Clients.Rest(shop, accessToken, {
     apiVersion: '2024-01'
   });
   
   // After
   const api = new Shopify.Clients.Rest(shop, accessToken, {
     apiVersion: '2025-01'
   });
   ```

2. **Migrate to Enhanced Metafields**
   ```typescript
   // Before: Using simple metafields
   await api.post({
     path: 'products/123/metafields',
     data: {
       metafield: {
         namespace: "replenish_reminder",
         key: "estimated_lifespan",
         value: "45",
         type: "number_integer"
       }
     }
   });
   
   // After: Using JSON structured metafields
   await api.post({
     path: 'products/123/metafields',
     data: {
       metafield: {
         namespace: "replenish_reminder",
         key: "lifespan_data",
         value: JSON.stringify({
           estimated_days: 45,
           confidence_score: 0.85,
           data_sources: ["purchase_history", "internet_data"],
           last_updated: new Date().toISOString()
         }),
         type: "json"
       }
     }
   });
   ```

3. **Migrate to Customer Segments API**
   ```typescript
   // Before: Using tags for customer grouping
   await api.put({
     path: `customers/${customerId}`,
     data: {
       customer: {
         id: customerId,
         tags: `payday-15`
       }
     }
   });
   
   // After: Using Customer Segments API
   const client = new Shopify.Clients.Graphql(shop, accessToken);
   await client.query({
     data: {
       query: CUSTOMER_SEGMENT_CREATE,
       variables: {
         input: {
           name: `Payday 15 Customers`,
           query: `tag:payday-15`,
         }
       }
     }
   });
   ```

4. **Adopt Checkout Extensions**
   
   Create a new checkout extension in your Shopify Partners dashboard and deploy the payday collection extension to gather payday information during checkout.

## Deprecated Features

The following features are deprecated in the 2025.01 API version and will be removed in future versions:

1. **Legacy Metafield API** - Use the Enhanced Metafields API instead
2. **Customer Save API** - Use the Customer Update API instead
3. **Legacy Webhook API** - Use the Event Subscriptions API instead
4. **Product Variant Inventory API** - Use the Inventory Level API instead
5. **Deprecated GraphQL Fields** - Several fields marked as deprecated in 2024.01 have been removed
6. **Legacy Admin API Endpoints** - Several REST endpoints have been replaced with GraphQL equivalents
7. **Script Tags** - Use App Blocks instead
8. **Legacy App Bridge** - Use App Bridge 2.0
9. **Asset API** - Use Theme API instead
10. **Bulk Operations V1** - Use Bulk Operations V2 with enhanced error handling

## Best Practices

1. **Use GraphQL When Possible**
   - The GraphQL API provides more flexibility and efficiency
   - Request only the data you need to improve performance
   - Use fragments for common data patterns
   - Implement proper error handling for GraphQL responses
   - Use the cost explorer to optimize query costs

2. **Implement Rate Limit Handling**
   - Monitor and respect Shopify's rate limits
   - Implement exponential backoff for retry logic
   - Use bulk operations for large data sets
   - Leverage GraphQL connections for pagination
   - Cache frequently accessed data

3. **Keep API Keys Secure**
   - Store API credentials in secure environment variables
   - Implement proper authentication for all API requests
   - Regularly rotate API keys
   - Use scoped access tokens with minimum required permissions
   - Implement IP restrictions where appropriate

4. **Stay Updated with API Changes**
   - Subscribe to the Shopify Developer changelog
   - Test your app against release candidate API versions
   - Plan for migrations before API versions are deprecated
   - Join the Shopify Partners program for early access
   - Participate in developer preview programs
