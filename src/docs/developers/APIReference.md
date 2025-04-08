
# API Reference

This document provides detailed information about the Replenish Reminder API endpoints, which allow developers to interact with the application programmatically through Gadget.dev.

## Authentication

All API requests require authentication using a Bearer token:

```
Authorization: Bearer YOUR_API_TOKEN
```

API tokens can be generated in the admin dashboard under Settings > API Access.

## Base URL

The base URL for all API endpoints is environment-specific:

- Production: `https://api.replenishreminder.com/v1`
- Staging: `https://api-staging.replenishreminder.com/v1`
- Development: `https://api-dev.replenishreminder.com/v1`

## Common Parameters

- `storeId`: The Shopify store ID
- `customerId`: The Shopify customer ID
- `productId`: The Shopify product ID

## Customer Endpoints

### Get Customer Payday Information

```
GET /customers/{customerId}/payday
```

Returns payday information for a specific customer.

**Response:**

```json
{
  "paydayDate": 15,
  "paydayFrequency": "monthly",
  "confidenceScore": 0.85,
  "lastUpdated": "2025-01-15T12:00:00Z"
}
```

### Update Customer Payday Information

```
POST /customers/{customerId}/payday
```

Updates payday information for a specific customer.

**Request Body:**

```json
{
  "paydayDate": 15,
  "paydayFrequency": "monthly"
}
```

**Response:**

```json
{
  "success": true,
  "customerId": "12345678",
  "paydayDate": 15,
  "paydayFrequency": "monthly",
  "updatedAt": "2025-02-01T14:30:00Z"
}
```

## Product Endpoints

### Get Product Lifespan Information

```
GET /products/{productId}/lifespan
```

Returns lifespan information for a specific product.

**Response:**

```json
{
  "estimatedLifespanDays": 45,
  "confidenceScore": 0.92,
  "usageFrequencyDefault": 1.0,
  "internetDataSources": ["reviews", "manufacturer"],
  "lastUpdated": "2025-01-10T09:15:00Z"
}
```

### Update Product Lifespan Information

```
POST /products/{productId}/lifespan
```

Updates lifespan information for a specific product.

**Request Body:**

```json
{
  "estimatedLifespanDays": 50,
  "usageFrequencyDefault": 1.2
}
```

## Reminder Endpoints

### Get Customer Reminders

```
GET /customers/{customerId}/reminders
```

Returns upcoming reminders for a specific customer.

**Query Parameters:**

- `status` (optional): Filter by reminder status (`pending`, `sent`, `clicked`)
- `limit` (optional): Maximum number of reminders to return (default: 10)

**Response:**

```json
{
  "reminders": [
    {
      "id": "rem_123456",
      "productId": "prod_7890",
      "productTitle": "Example Product",
      "predictedDepletionDate": "2025-03-15T00:00:00Z",
      "scheduledReminderDate": "2025-03-10T00:00:00Z",
      "status": "pending"
    },
    // Additional reminders...
  ]
}
```

### Schedule Manual Reminder

```
POST /customers/{customerId}/reminders
```

Manually schedules a reminder for a specific customer and product.

**Request Body:**

```json
{
  "productId": "prod_7890",
  "reminderDate": "2025-03-10T00:00:00Z"
}
```

## Error Handling

All endpoints return standard HTTP status codes:

- `200 OK`: Request succeeded
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication failure
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

Error responses include details in the following format:

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "Invalid parameter: paydayDate must be between 1 and 31",
    "requestId": "req_abc123"
  }
}
```

## Rate Limiting

API requests are limited to:

- 100 requests per minute per API key
- 5,000 requests per day per API key

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1612345678
```

## Webhooks

You can configure webhooks to receive real-time notifications for various events:

- `customer.payday_updated`: When a customer's payday information is updated
- `product.lifespan_updated`: When a product's lifespan information is updated
- `reminder.scheduled`: When a new reminder is scheduled
- `reminder.sent`: When a reminder email is sent
- `reminder.clicked`: When a customer clicks on a reminder email

Webhook configuration is available in the admin dashboard under Settings > Webhooks.
