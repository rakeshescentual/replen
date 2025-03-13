
# Gadget.dev Integration Guide

This document provides an overview of how the Replenish Reminder app integrates with Gadget.dev to power its backend functionality.

## Overview

Gadget.dev serves as the backend platform for the Replenish Reminder app, providing:

1. API endpoints for data access and management
2. Shopify integration through enhanced Shopify connections
3. Data processing for AI predictions and value metrics
4. Environment-specific configurations via Environment Variable Groups
5. Type-safe route parameters for API requests

## Environment Configuration

The app uses Gadget.dev's Environment Variable Groups to maintain separate configurations for:

- Development
- Staging 
- Production

Each environment has its own:
- API base URL
- Shopify storefront domain
- Security settings
- Feature flags
- Logging configuration

## API Endpoints

| Endpoint | Purpose | Parameters |
|----------|---------|------------|
| `/products/{id}` | Get product details | `id`, `includes[]` |
| `/products/category/{category}` | Get products by category | `category`, `limit`, `sort` |
| `/customers/{customerId}/recommendations` | Get personalized recommendations | `customerId`, `productTypes[]` |
| `/customers/{customerId}/payday-info` | Manage customer payday information | `paydayDate`, `frequency` |
| `/shopify/metafields` | Sync product metafields | `productId`, `namespace`, `metafields` |

## Type-Safe Route Parameters

The application uses TypeScript interfaces to ensure type safety when making API requests:

```typescript
export interface ProductRouteParams {
  id: string;
  includes?: string[];
}

export interface CategoryRouteParams {
  category: CategoryId;
  limit?: number;
  sort?: 'value' | 'match' | 'price';
}

export interface CustomerRouteParams {
  customerId: string;
  productTypes?: CategoryId[];
}
```

## Core Features Powered by Gadget.dev

### AI Prediction Engine

- Stores and processes customer purchase history
- Calculates product lifespan predictions
- Implements machine learning to improve predictions
- Manages internet data mining results

### Payday Alignment System

- Tracks customer payday information
- Calculates optimal reminder timing
- Schedules Klaviyo email sends
- Adapts to changing payday patterns

### Value Metrics

- Stores value scores and cost efficiency metrics
- Calculates cost-per-day figures
- Processes internet data to enhance value assessment
- Compares value across similar products

## Implementation Steps

1. **Create Gadget.dev Project**
   - Set up a new project in Gadget.dev
   - Configure Shopify connection with appropriate scopes
   - Set up Klaviyo connection for email integration

2. **Configure Environment Variable Groups**
   - Create separate configurations for dev/staging/production
   - Set appropriate API endpoints and security settings
   - Configure feature flags for each environment

3. **Set Up Data Models**
   - Product Lifespan model
   - Customer Purchase History model
   - Payday Information model
   - Replenishment Schedule model

4. **Implement API Endpoints**
   - Create RESTful endpoints following Gadget.dev best practices
   - Implement data validation and error handling
   - Set up proper authentication and authorization

5. **Configure Shopify Connection**
   - Set up metafield definitions for value metrics and lifespan data
   - Configure webhooks for order and customer events
   - Implement product catalog synchronization

## Testing the Integration

- Verify API connections in all environments
- Test authentication and authorization
- Validate data flow between Shopify and Gadget.dev
- Confirm metafield updates work correctly
- Test environment-specific configurations

## Common Issues and Troubleshooting

- API Key authentication problems
- Environment detection issues
- Rate limiting considerations
- Data synchronization delays
- Webhook reliability

## Best Practices

- Use type-safe route parameters for all API requests
- Leverage environment-specific configurations
- Implement comprehensive error handling
- Use the GadgetEnvironmentService for environment detection
- Cache frequently accessed data to improve performance
