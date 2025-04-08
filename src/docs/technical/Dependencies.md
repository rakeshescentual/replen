
# Dependencies

## Frontend Libraries
- **React (^18.3.1)** - Core UI framework for building the user interface
  - Provides component-based architecture
  - Supports virtual DOM for efficient rendering
  - Enables JSX syntax for templating

- **TypeScript** - Static type checking for improved development experience
  - Provides type safety during development
  - Enables better IDE autocompletion
  - Enhances code maintainability and refactoring

- **React Router Dom (^6.26.2)** - Routing and navigation library
  - Handles client-side routing
  - Supports dynamic route parameters
  - Provides navigation guards and hooks

- **Tailwind CSS** - Utility-first CSS framework for styling
  - Enables rapid UI development with utility classes
  - Ensures consistent design system
  - Supports responsive design patterns

- **Shadcn UI** - Component library based on Radix UI
  - Provides accessible, unstyled components
  - Ensures consistent component behavior
  - Supports theme customization

- **Lucide React (^0.462.0)** - Icon system
  - Provides consistent icon set
  - Supports customization of size, color, and style
  - Optimized for React applications

- **React Query (^5.56.2)** - Data fetching and state management
  - Handles API request caching
  - Provides request deduplication
  - Supports background data refetching
  - Manages server state with optimistic updates

- **Recharts (^2.12.7)** - Data visualization library
  - Creates responsive charts and graphs
  - Supports various chart types (line, bar, pie, etc.)
  - Enables interactive data visualization

- **Zod (^3.23.8)** - Schema validation library
  - Validates data against defined schemas
  - Provides type inference for validated data
  - Enhances form validation

## Backend Integration

### Gadget.dev
Gadget.dev serves as the backend-as-a-service platform for Shopify integration, providing:

- **Environment Variable Groups**
  - Supports development, staging, and production configurations
  - Enables environment-specific API endpoints
  - Provides secure storage for environment variables
  - Facilitates feature flagging for different environments

- **Type-Safe Routes**
  - Enforces parameter validation for API endpoints
  - Provides TypeScript interfaces for request/response types
  - Ensures consistent API contracts
  - Catches type errors during development

- **Enhanced Shopify Connection**
  - Simplifies Shopify API authentication
  - Provides direct access to Shopify resources (products, customers, orders)
  - Handles rate limiting and API version management
  - Supports metafield management for extended product data
  - Implements webhooks for real-time data synchronization

- **Security Features**
  - Role-based access control
  - API key management
  - Request logging and monitoring
  - GDPR compliance utilities

### Klaviyo
Email marketing platform for customer communications, offering:

- **Email Campaign Management**
  - Automated email sequence creation
  - A/B testing capabilities
  - Scheduled sending based on customer data

- **Customer Segmentation**
  - Dynamic segment creation based on purchase history
  - Behavior-based targeting
  - Custom attribute filtering

- **Analytics and Tracking**
  - Open and click tracking
  - Conversion attribution
  - Revenue reporting

- **API Integration**
  - Webhook support for real-time events
  - Customer property synchronization
  - Custom event tracking

## Environment Management

The application supports multiple deployment environments with specific configurations:

### Development Environment
- Local development setup
- Mock data for testing
- Debug logging enabled
- Feature flags for in-development features
- Non-production API endpoints

### Staging Environment
- Production-like environment for testing
- Real data with sanitized customer information
- Limited email sending capabilities
- Full feature set for QA testing
- Detailed error reporting

### Production Environment
- Live customer-facing environment
- Optimized for performance
- Minimal logging for privacy
- Feature flags controlled by business rules
- Monitoring and alerting systems

## Mobile Support

- **Responsive Design** - Tailwind CSS breakpoints for all device sizes
- **Touch Interactions** - Support for touch events on mobile devices
- **Offline Capabilities** - Caching strategies for limited connectivity

## Accessibility

- **ARIA Attributes** - Proper semantic markup for screen readers
- **Keyboard Navigation** - Full keyboard accessibility
- **Color Contrast** - WCAG 2.1 AA compliant color schemes

## Performance Optimization

- **Code Splitting** - Dynamic imports for route-based code splitting
- **Asset Optimization** - Image compression and lazy loading
- **Cache Management** - Strategic caching policies for API responses
