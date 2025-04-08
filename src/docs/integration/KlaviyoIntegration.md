
# Klaviyo Integration Guide

This document provides detailed instructions for integrating the Replenish Reminder app with Klaviyo for email marketing.

## Overview

The Replenish Reminder app uses Klaviyo to send personalized, payday-aligned replenishment reminder emails to customers. This integration enables:

- Automated reminder emails based on AI predictions
- Personalized product recommendations
- Payday-aligned email timing
- A/B testing of email content and timing
- Performance tracking and analytics

## Setup Requirements

### Prerequisites

- Klaviyo account with API access
- Administrator access to Escentual.com Shopify store
- Replenish Reminder app installed and configured

### API Key Configuration

1. Log in to your Klaviyo account
2. Navigate to Account > Settings > API Keys
3. Create a new Private API Key with the following permissions:
   - Profiles
   - Metrics
   - Campaigns
   - Templates
4. Copy the generated API key
5. In the Replenish Reminder admin dashboard, go to Settings > Integrations > Klaviyo
6. Paste the API key and click "Verify Connection"

## Email Template Configuration

### Required Templates

Create the following templates in Klaviyo:

1. **Standard Replenishment Reminder**
   - Purpose: Single product replenishment reminder
   - Dynamic fields: Product name, image, price, run-out date, reorder button
   
2. **Multi-Product Reminder**
   - Purpose: Multiple product replenishment in one email
   - Dynamic fields: Product list, images, prices, run-out dates, reorder buttons
   
3. **Subscription Recommendation**
   - Purpose: Suggest subscription for frequently replenished items
   - Dynamic fields: Product details, subscription pricing, savings calculation

### Dynamic Content Blocks

Each template should include these dynamic content blocks:

#### Product Information Block
```
{% if product %}
  <div class="product">
    <img src="{{ product.image_url }}" alt="{{ product.name }}">
    <h3>{{ product.name }}</h3>
    <p>You may run out around {{ product.predicted_depletion_date | date: '%B %d, %Y' }}</p>
    <p class="price">{{ product.price | money }}</p>
    <p class="value">{{ product.cost_per_day | money }} per day</p>
    <a href="{{ product.reorder_url }}" class="button">Reorder Now</a>
  </div>
{% endif %}
```

#### Payday Message Block
```
{% if customer.payday_date %}
  <div class="payday-message">
    <p>This reminder is timed with your payday for your convenience.</p>
  </div>
{% endif %}
```

#### Value Metric Block
```
{% if product.comparison %}
  <div class="value-comparison">
    <p>This product offers {{ product.value_score }}% better value than similar products.</p>
  </div>
{% endif %}
```

## Flow Configuration

### Replenishment Reminder Flow

1. In Klaviyo, create a new Flow
2. Set the trigger to "Receives API Event" with event name "Predicted Product Depletion"
3. Add a split based on payday timing:
   - If within 3 days after payday: Route to "Payday Aligned" path
   - Otherwise: Route to "Standard Timing" path
4. For each path, add an email send action using the appropriate template
5. Add conversion tracking with a 7-day window
6. Enable A/B testing for timing optimization

### Data Synchronization

The following data points will be automatically synced from Replenish Reminder to Klaviyo:

1. Customer Properties:
   - predicted_depletion_dates (JSON object with product IDs and dates)
   - payday_date (day of month)
   - payday_frequency (monthly, bi-weekly, weekly)
   - value_conscious_score (customer's sensitivity to value metrics)
   
2. Events:
   - Predicted Product Depletion (when a product is predicted to run out)
   - Reminder Email Sent (when a reminder is delivered)
   - Reminder Click (when a customer engages with a reminder)
   - Replenishment Purchase (when a customer reorders)
   
## Testing the Integration

### Test Flow

1. In the Replenish Reminder admin dashboard, go to Settings > Integrations > Klaviyo
2. Click "Send Test Event"
3. Select a test customer and product
4. Click "Send Test Reminder Event"
5. Check your test email account for the reminder
6. Verify all dynamic content populates correctly

### Troubleshooting

Common issues and solutions:

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| Events not showing in Klaviyo | API key permissions | Verify API key has correct permissions |
| Missing dynamic content | Template variables | Check variable naming consistency |
| Delayed emails | Queue processing | Check Klaviyo sending capacity |
| Incorrect product data | Data sync issues | Manually resync product data |

## Performance Optimization

### Recommended Metrics to Track

- Open rate for payday vs. non-payday emails
- Click-through rate on product recommendations
- Conversion rate from reminder to purchase
- Time between reminder and purchase
- Revenue generated from reminder emails
- Subscription conversion rate

### A/B Testing Recommendations

- Subject line optimization (value-focused vs. convenience-focused)
- Timing variations (days before predicted depletion)
- Call-to-action button text and design
- Number of product recommendations per email
- Value metric display formats

## Advanced Features

### Personalized Recommendation Logic

The API will send Klaviyo detailed information about:

- Products predicted to run out
- Complementary product recommendations
- Personalized value metrics
- Payday alignment information

This data can be used for highly personalized email content using Klaviyo's dynamic content capabilities.

### Segmentation Strategy

Consider these segments for tailored messaging:

- High-value customers (top 20% by lifetime value)
- Value-conscious customers (high response to value metrics)
- Convenience-focused customers (quick reordering habits)
- Subscription-ready customers (regular repurchase patterns)

### Custom Events

You can create custom metrics in Klaviyo based on these events:

- "Viewed Replenishment Schedule" (customer checked their schedule)
- "Updated Payday Information" (customer provided payday details)
- "Adjusted Product Lifespan" (customer gave feedback on predictions)

## Support and Resources

- Klaviyo documentation: https://help.klaviyo.com
- Replenish Reminder integration support: integration@replenishreminder.com
- API documentation: https://developers.replenishreminder.com
