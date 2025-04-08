
# PaydayCalculationService Implementation Guide

## Overview

The `PaydayCalculationService` is responsible for all date and timing calculations related to customer paydays and product replenishment. This service enables accurate prediction of optimal reminder timing based on when customers receive their income and when products are expected to be depleted.

## Key Capabilities

1. **Next Payday Calculation**: Determines when a customer will next receive income
2. **Optimal Reminder Timing**: Calculates the best time to send reminders relative to paydays
3. **Reminder Scheduling**: Creates a schedule of reminders aligned with paydays
4. **Pattern Adaptation**: Adjusts to different payday frequencies (weekly, bi-weekly, monthly)
5. **Date Manipulation**: Provides utility functions for working with payday-related dates

## Implementation Details

### Core Methods

#### `calculateNextPayday`

```typescript
/**
 * Calculates the next payday date for a customer
 * @param currentPaydayDate Day of month (1-31) for monthly, or any reference day for weekly/biweekly
 * @param paydayFrequency Payment frequency
 * @returns Date object representing the next payday
 */
public static calculateNextPayday(
  currentPaydayDate: number,
  paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
): Date
```

#### `calculateOptimalReminderDate`

```typescript
/**
 * Calculates the optimal reminder date based on payday and product lifespan
 * @param paydayDate Customer's payday date
 * @param paydayFrequency Payment frequency
 * @param productRunOutDate Predicted date when product will run out
 * @returns Date when reminder should be sent
 */
public static calculateOptimalReminderDate(
  paydayDate: number,
  paydayFrequency: 'monthly' | 'biweekly' | 'weekly',
  productRunOutDate: Date
): Date
```

### Calculation Algorithms

#### Next Payday Calculation

The algorithm handles different payment frequencies:

1. **Monthly Paydays**:
   - If the payday date has already passed this month, calculate for next month
   - Handle edge cases like the 31st in months with fewer days
   - Account for February's variable length in leap years

2. **Bi-weekly Paydays**:
   - Use the reference payday date to establish a bi-weekly pattern
   - Calculate the next occurrence based on the current date
   - Maintain consistent 14-day intervals

3. **Weekly Paydays**:
   - Determine the day of week from the reference payday date
   - Calculate the next occurrence of that day of week
   - Maintain consistent 7-day intervals

#### Optimal Reminder Timing

The algorithm balances several factors:

1. **Payday Proximity**:
   - Prioritize reminders that arrive shortly after a payday (1-3 days)
   - Avoid sending reminders just before a payday (when funds may be low)

2. **Product Depletion Timing**:
   - Ensure reminders arrive before the product runs out
   - Ideally 7-14 days before predicted depletion

3. **Urgency Adjustment**:
   - If the product will run out before the next payday, send reminder immediately
   - If multiple paydays occur before depletion, choose the closest one to depletion

### Integration with Other Services

The `PaydayCalculationService` interfaces with:

- `CustomerPaydayService`: The facade for accessing payday functionality
- `PaydayPatternService`: For detected payment patterns to use in calculations
- `PaydayAPIService`: For accessing stored customer payday information

## Usage Examples

### Basic Next Payday Calculation

```typescript
// For a customer who gets paid on the 15th of each month
const nextPayday = PaydayCalculationService.calculateNextPayday(15, 'monthly');

// For a customer who gets paid every other Friday (using a reference date)
const referenceFriday = new Date(2023, 0, 13); // Jan 13, 2023 was a Friday
const nextBiweeklyPayday = PaydayCalculationService.calculateNextPayday(
  referenceFriday.getDate(),
  'biweekly'
);
```

### Reminder Scheduling

```typescript
// Get customer's payday information
const { paydayDate, paydayFrequency } = await PaydayAPIService.getCustomerPaydayData(customerId);

// Calculate when product will run out
const productRunOutDate = calculateProductDepletionDate(customer, productId);

// Determine optimal reminder date
const reminderDate = PaydayCalculationService.calculateOptimalReminderDate(
  paydayDate,
  paydayFrequency,
  productRunOutDate
);

// Schedule the reminder
await scheduleReminderEmail(customerId, productId, reminderDate);
```

## Performance Considerations

- **Caching**: Cache next payday calculations for performance
- **Batch Processing**: Process customer cohorts for efficiency
- **Date Math Optimization**: Minimize Date object creation and manipulation

## Testing Approach

1. **Unit Testing**:
   - Test each payday frequency separately
   - Test edge cases (month boundaries, leap years)
   - Test reminder date optimization logic

2. **Integration Testing**:
   - Verify correct interaction with `PaydayAPIService`
   - Test reminder scheduling flow

3. **Validation Testing**:
   - Measure accuracy of payday predictions
   - Assess conversion rates based on reminder timing

## Future Enhancements

1. **Holiday Adjustment**: Accounting for banking holidays that affect paydays
2. **Multiple Income Streams**: Supporting customers with multiple regular payment dates
3. **Variable Income Handling**: Adapting to irregular income patterns
4. **Regional Customization**: Adapting to country-specific payment patterns
