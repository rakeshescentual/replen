
# Replenish Reminder - Product Documentation

## Purpose

Replenish Reminder is a Shopify Plus app designed to help Escentual.com increase repeat purchases and subscription rates by automatically reminding customers when they're about to run out of products. The app uses AI-powered prediction to estimate product lifespans, tracks purchase history, and sends timely, personalized reminder emails that strategically align with customer payday cycles for maximum effectiveness.

## Core Functionality

### 1. AI-Powered Replenishment Predictions

The app predicts when customers will run out of products through:
- Advanced prediction engine that combines purchase history, product usage data, and internet data mining
- Tailored predictions based on individual usage patterns
- Continuous improvement through machine learning that adapts to customer feedback
- Internet crawling for product reviews and usage information to enhance prediction accuracy

### 2. Payday-Aligned Reminders

A unique feature that times replenishment emails with customer payday cycles:
- Reminders arrive shortly after customers receive their monthly pay when funds are available
- AI prediction ensures products won't run out before the next payday cycle
- Customers maintain their essential Escentual.com products without manual reordering
- One-click reordering for seamless replenishment experience
- Flexible scheduling adapts to each customer's specific payday schedule

### 3. Value Metrics System

Helps customers understand the true value of products:
- Calculates cost-per-day metrics for all Escentual.com products
- Compares value across similar products for intelligent recommendations
- Identifies highest-value items based on customer usage patterns
- Suggests subscription options for frequently replenished products
- Internet data mining enhances value assessment accuracy

### 4. Smart Product Recommendations

- Personalized product suggestions based on purchase history and preferences
- Value-based recommendations that highlight cost-effective options
- Bundle recommendations for complementary products
- Match score system that ranks how well a product aligns with customer needs
- Payday alignment indicators showing which products fit within payday cycles

### 5. Integration Capabilities

- Seamless integration with Escentual.com Shopify store
- Klaviyo integration for sophisticated email marketing
- Gadget.dev backend for powerful data processing and API management
- Environment-specific configurations for development, staging, and production

## Technical Architecture

### Frontend Components

1. **Personalized Recommendations**
   - Category-based product display
   - Value score and match score indicators
   - Payday alignment badges
   - One-click shopping actions

2. **Documentation System**
   - Comprehensive documentation interface
   - Tab-based navigation for different documentation areas
   - Integration guides for Escentual.com, Klaviyo, and Gadget.dev

3. **Value Metrics**
   - Cost-per-day calculations
   - Value comparison tools
   - Savings indicators and visualization

### Backend Systems (via Gadget.dev)

1. **AI Prediction Engine**
   - Machine learning models for product lifespan prediction
   - Internet data mining for usage pattern insights
   - Continuous learning from customer behavior

2. **Payday Timing Mechanism**
   - Customer payday date tracking
   - Synchronized reminder scheduling
   - Adaptive timing based on product depletion predictions

3. **Shopify Integration**
   - Product catalog access
   - Customer purchase history analysis
   - Metafield management for extended product data

4. **Value Intelligence**
   - Value scoring algorithms
   - Cost efficiency calculations
   - Internet data enhanced value assessments

## Dependencies

### Frontend Libraries
- React (^18.3.1) - UI framework
- TypeScript - Type safety and development experience
- React Router Dom (^6.26.2) - Routing and navigation
- Tailwind CSS - Styling and responsive design
- Shadcn UI - Component library based on Radix UI
- Lucide React (^0.462.0) - Icon system
- React Query (^5.56.2) - Data fetching and state management
- Recharts (^2.12.7) - Data visualization
- Zod (^3.23.8) - Schema validation

### Backend Integration
- Gadget.dev - Backend-as-a-service platform for Shopify integration
- Klaviyo - Email marketing platform

### Environment Management
- Development, Staging, and Production configurations
- Environment-specific API endpoints and feature flags

## Evaluation Criteria

### Functional Testing

1. **Replenishment Prediction Accuracy**
   - Test accuracy of product lifespan predictions against actual usage
   - Verify improvement of predictions over time through machine learning
   - Evaluate internet data mining effectiveness in enhancing predictions

2. **Payday Alignment Effectiveness**
   - Confirm emails are delivered at optimal times relative to customer paydays
   - Measure conversion rates of payday-aligned vs. non-aligned reminders
   - Test adaptation to different payday schedules (weekly, bi-weekly, monthly)

3. **Value Metrics Reliability**
   - Validate cost-per-day calculations across product categories
   - Test value comparison system with diverse product sets
   - Verify accuracy of internet-data-enhanced value assessments

### Business Success Metrics

1. **Repeat Purchase Rate**
   - Increase in repeat purchase rate for products with reminders
   - Conversion rate from reminder emails to completed purchases
   - Time between replenishment reminders and actual purchases

2. **Subscription Conversion**
   - Increase in subscription sign-ups through reminder pathways
   - Retention rate for subscription customers vs. one-time purchasers
   - Average subscription duration and lifetime value

3. **Customer Experience**
   - Customer feedback on reminder timing and relevance
   - Engagement with personalized recommendation components
   - Reduction in "run out" events for subscribed customers

4. **Revenue Impact**
   - Overall revenue increase attributable to the reminder system
   - Increase in average order value from reminder-initiated purchases
   - Basket size for payday-aligned purchases vs. regular purchases

## Implementation Verification Checklist

1. **Shopify Integration Verification**
   - Confirm product data syncs correctly from Escentual.com
   - Verify customer purchase history is accurately imported
   - Test one-click reordering functionality

2. **Gadget.dev Backend Verification**
   - Validate API endpoint functionality across environments
   - Confirm data processing capabilities for prediction engine
   - Test environment-specific configurations

3. **Klaviyo Email Verification**
   - Verify reminder templates render correctly
   - Test dynamic content population with product recommendations
   - Confirm tracking and analytics data flows properly

4. **AI Prediction System**
   - Validate prediction models with test data sets
   - Verify continuous learning capabilities
   - Test internet data mining accuracy and relevance

5. **Value Metrics System**
   - Confirm value score calculations are consistent
   - Test cost-per-day metrics across product categories
   - Verify metrics update when product prices or details change

## Ongoing Monitoring

- Dashboard for tracking reminder performance and conversion rates
- A/B testing framework to optimize reminder content and timing
- Continuous learning system to improve prediction accuracy
- Regular internet data mining refreshes to maintain prediction quality
- Customer feedback collection to refine the system
