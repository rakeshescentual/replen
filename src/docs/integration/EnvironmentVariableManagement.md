
# Environment Variable Management with Gadget.dev

This guide provides comprehensive information about managing environment variables within the Replenish Reminder app using Gadget.dev's Environment Variable Groups feature.

## Overview

Environment Variable Groups in Gadget.dev provide a powerful way to manage configuration across different environments (development, staging, production). This approach ensures consistent behavior while allowing environment-specific settings.

## Environment Types

The Replenish Reminder app supports three distinct environments:

### 1. Development Environment

Development environment provides:
- Local testing capabilities
- Debug-friendly configurations
- Mock data options for faster development
- Detailed logging and error reporting
- Integration with test Shopify stores

### 2. Staging Environment

Staging environment offers:
- Production-like settings for pre-release testing
- Limited debug information
- Connection to staging Shopify stores
- Performance monitoring
- Integration testing capabilities

### 3. Production Environment

Production environment ensures:
- Maximum security settings
- Optimized performance configurations
- Minimal logging (only critical errors)
- Connection to live Shopify stores
- GDPR and compliance settings fully enforced

## Implementation in GadgetEnvironmentService

The `GadgetEnvironmentService` class provides a centralized way to access environment-specific configuration throughout the application:

```typescript
export class GadgetEnvironmentService {
  // Environment detection based on hostname
  private detectEnvironment(): GadgetEnvironment {
    const hostname = window.location.hostname;
    if (hostname.includes('dev') || hostname.includes('localhost')) return 'development';
    if (hostname.includes('staging')) return 'staging';
    return 'production';
  }
  
  // Get environment-specific configuration
  public getConfig(): EnvironmentConfig {
    return this.environmentConfigs[this.currentEnvironment];
  }
}
```

## Configuration Structure

Each environment maintains its own configuration profile with the following structure:

```typescript
interface EnvironmentConfig {
  apiBaseUrl: string;         // Base URL for API requests
  shopifyStorefrontDomain: string;  // Environment-specific Shopify domain
  useSecureConnection: boolean;     // Security settings
  loggingEnabled: boolean;          // Logging configuration
  featureFlags: Record<string, boolean>; // Feature toggles
}
```

## Feature Flags

Feature flags provide granular control over functionality in each environment:

| Flag Name | Development | Staging | Production | Description |
|-----------|------------|---------|------------|-------------|
| enableDetailedLogging | ✅ | ✅ | ❌ | Enable verbose logging |
| useTestData | ✅ | ❌ | ❌ | Use mock data for testing |
| showDebugTools | ✅ | ✅ | ❌ | Show developer tools |
| skipProductSync | ✅ | ❌ | ❌ | Skip product synchronization |
| mockPaydayData | ✅ | ❌ | ❌ | Use mock payday data |

## Implementation Best Practices

### 1. Access Environment Information

```typescript
import { gadgetEnvironment } from "@/utils/GadgetEnvironmentService";

// Get current environment
const currentEnv = gadgetEnvironment.getEnvironment();

// Check if a feature is enabled
if (gadgetEnvironment.isFeatureEnabled('showDebugTools')) {
  // Show debug tools
}

// Get environment-specific API URL
const apiUrl = gadgetEnvironment.getApiBaseUrl();
```

### 2. Environment-Specific Logic

```typescript
// Different behavior based on environment
if (gadgetEnvironment.getEnvironment() === 'development') {
  // Development-specific code
} else if (gadgetEnvironment.getEnvironment() === 'staging') {
  // Staging-specific code
} else {
  // Production code
}

// Toggle logging based on environment
if (gadgetEnvironment.isLoggingEnabled()) {
  console.log('Detailed log information');
}
```

### 3. API Request Configuration

```typescript
// Configure API request with environment-specific headers
const headers = {
  'Content-Type': 'application/json',
  'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
  'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
};
```

## Security Considerations

### 1. API Key Management

- API keys are environment-specific
- Development keys have limited permissions
- Production keys use more restrictive access policies
- Keys should never be stored in client-side code

### 2. Data Isolation

- Each environment uses separate databases
- Test data never mixes with production data
- Customer PII is replaced with mock data in non-production environments

### 3. Access Control

- Role-based access control settings vary by environment
- Production requires stricter authentication
- Development allows more flexible access patterns for testing

## Environment Setup in Gadget.dev

To configure environment settings in Gadget.dev:

1. Navigate to your Gadget.dev project dashboard
2. Select "Environment Variables" from the left sidebar
3. Create a new variable group (Development, Staging, Production)
4. Add required variables for each environment:
   - `API_BASE_URL`
   - `SHOPIFY_STOREFRONT_DOMAIN`
   - `USE_SECURE_CONNECTION`
   - `LOGGING_ENABLED`
   - `FEATURE_FLAGS` (as a JSON string)

5. Apply settings to your environments

## Troubleshooting Common Issues

### Issue: Environment Not Detected Correctly

**Problem**: Application using wrong environment configuration.

**Solution**: 
- Verify hostname detection logic in `detectEnvironment()`
- Check URL patterns for each environment
- Add additional environment indicators if needed

### Issue: Feature Flag Not Working

**Problem**: Feature flags not behaving as expected.

**Solution**:
- Verify flag is defined in all environment configurations
- Check correct spelling of flag name when calling `isFeatureEnabled()`
- Verify flag value in current environment

### Issue: API Endpoints Point to Wrong Environment

**Problem**: Application calling wrong environment API endpoints.

**Solution**:
- Check `apiBaseUrl` configuration
- Verify `getApiBaseUrl()` is used consistently
- Check for hardcoded URLs in API calls

## Monitoring and Alerts

Configure environment-specific monitoring:

- Development: Minimal alerts, focus on error frequency
- Staging: Performance benchmarks and regression alerts
- Production: Comprehensive monitoring with incident response
