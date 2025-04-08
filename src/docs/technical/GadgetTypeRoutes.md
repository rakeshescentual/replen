
# Gadget Type Routes Documentation

This document details how to use Gadget.dev's Type-Safe Route Parameters feature within the Replenish Reminder app.

## Overview

Type-Safe Route Parameters is a Gadget.dev feature that provides type safety for API endpoints. It ensures that:

- API parameters are validated against TypeScript interfaces
- Response types match expected formats
- Type errors are caught during development
- API documentation can be automatically generated

## Implementation

The Replenish Reminder app implements Type-Safe Routes through the `useGadgetTypeRoutes` hook, which wraps API calls in a type-safe manner.

### Core Types

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

export interface PaydayRouteParams {
  customerId: string;
  includeHistory?: boolean;
  includeConfidence?: boolean;
}

export interface AnalyticsRouteParams {
  startDate: string;
  endDate: string;
  metrics: string[];
  resolution?: 'day' | 'week' | 'month';
}
```

### Example Usage

Here's how to use the `useGadgetTypeRoutes` hook for type-safe API requests:

```typescript
import { useGadgetTypeRoutes } from '@/hooks/useGadgetTypeRoutes';
import { CustomerRouteParams } from '@/types/personalized-recommendations';

function CustomerRecommendations({ customerId }: { customerId: string }) {
  const { getCustomerRecommendations, isLoading, error } = useGadgetTypeRoutes();
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    async function fetchRecommendations() {
      // Type-safe request parameters
      const params: CustomerRouteParams = {
        customerId,
        productTypes: ['skincare', 'fragrance']
      };
      
      // This call is type-checked
      const data = await getCustomerRecommendations(params);
      setRecommendations(data);
    }
    
    fetchRecommendations();
  }, [customerId, getCustomerRecommendations]);
  
  // Component rendering...
}
```

## Benefits of Type-Safe Routes

### 1. Compile-Time Error Detection
Catch parameter errors during development rather than at runtime.

```typescript
// This will cause a TypeScript error because 'sorting' is not a valid parameter
const params: CategoryRouteParams = {
  category: 'skincare',
  sorting: 'price' // Error: Property 'sorting' does not exist on type 'CategoryRouteParams'
};
```

### 2. IDE Auto-Completion
Get intelligent suggestions as you type.

### 3. Self-Documenting Code
Type definitions serve as documentation for API parameters.

### 4. Refactoring Safety
When changing an API endpoint, TypeScript will identify all places that need updates.

## Environment Awareness

The `useGadgetTypeRoutes` hook is environment-aware through integration with `GadgetEnvironmentService`:

```typescript
import { gadgetEnvironment } from '@/utils/GadgetEnvironmentService';

const url = `${gadgetEnvironment.getApiBaseUrl()}/${endpoint}`;
```

This ensures that API requests target the correct environment (development, staging, or production).

## Error Handling

Type-Safe Routes include standardized error handling:

1. Error state management (`isLoading`, `error`)
2. Toast notifications for user feedback
3. Detailed error logging (with environment-specific verbosity)
4. Typed error responses for predictable handling

## Advanced Usage

### Parameterized Routes

For routes with path parameters:

```typescript
// Define the route with parameters
const getProduct = useCallback(async (params: ProductRouteParams) => {
  return makeRequest<any, ProductRouteParams>(
    `products/${params.id}`, // Path parameter
    { includes: params.includes || [] } // Query parameters
  );
}, [makeRequest]);
```

### Request Body Typing

For POST/PUT requests with typed bodies:

```typescript
const updatePaydayInfo = useCallback(async (
  params: PaydayRouteParams,
  body: PaydayUpdateBody
) => {
  return makeRequest<any, PaydayRouteParams>(
    `customers/${params.customerId}/payday-info`,
    params,
    'PUT',
    body // Typed request body
  );
}, [makeRequest]);
```

### Response Type Safety

Define expected response types:

```typescript
interface ProductResponse {
  id: string;
  title: string;
  price: number;
  valueMetrics?: ValueMetrics;
}

// Use the response type
const product = await makeRequest<ProductResponse, ProductRouteParams>(
  `products/${params.id}`,
  params
);

// TypeScript knows product has these properties
const { title, price } = product;
```

## Best Practices

1. **Define Interfaces in Central Location**:
   Store all route parameter interfaces in a dedicated types file.

2. **Consistent Error Handling**:
   Use the provided error handling pattern consistently.

3. **Environment Awareness**:
   Always use environment-specific endpoints.

4. **Parameter Validation**:
   Validate parameters before making API calls.

5. **Loading States**:
   Use the isLoading state for UI feedback.

6. **Response Typing**:
   Define response types for all API calls.

7. **Documentation**:
   Document each route parameter interface.

## Debugging

To debug Type-Safe Routes:

1. Enable detailed logging in development:
   ```typescript
   gadgetEnvironment.setLoggingEnabled(true);
   ```

2. Log request details:
   ```typescript
   console.log('Making request to:', url, 'with params:', params);
   ```

3. Use the Gadget.dev dashboard to inspect API calls.

4. Test routes with mock data using:
   ```typescript
   jest.mock('@/hooks/useGadgetTypeRoutes', () => ({
     useGadgetTypeRoutes: () => ({
       getProduct: jest.fn().mockResolvedValue(mockProductData)
     })
   }));
   ```

## Migration Guide

When migrating existing API calls to Type-Safe Routes:

1. Define parameter interfaces for each endpoint
2. Update API calls to use the `useGadgetTypeRoutes` hook
3. Add appropriate error handling
4. Update UI components to handle loading states
5. Test all endpoints in each environment
