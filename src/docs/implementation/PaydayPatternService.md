
# PaydayPatternService Implementation Guide

## Overview

The `PaydayPatternService` is a core component of the Replenish Reminder system that detects and analyzes customer payday patterns based on their purchase history. This service enables the system to identify when customers typically have funds available, allowing for optimal timing of replenishment reminders.

## Key Capabilities

1. **Pattern Detection**: Analyzes purchase date patterns to identify recurring payday cycles
2. **Frequency Identification**: Determines if a customer follows weekly, bi-weekly, or monthly payment schedules
3. **Confidence Scoring**: Provides a reliability score for detected patterns
4. **Adaptive Learning**: Improves accuracy over time as more purchase data becomes available
5. **Manual Override Support**: Allows for customer-provided payday information to take precedence

## Implementation Details

### Core Method: `detectPaydayPattern`

```typescript
/**
 * Identifies customer payday patterns from purchase history
 * @param purchaseDates Array of past purchase dates
 * @returns Detected payday information or null if pattern unclear
 */
public static detectPaydayPattern(
  purchaseDates: Date[]
): { 
  paydayDate: number; 
  paydayFrequency: 'monthly' | 'biweekly' | 'weekly';
  confidenceScore: number;
} | null
```

### Pattern Detection Algorithm

The algorithm works through these sequential steps:

1. **Data Preparation**:
   - Sort purchase dates chronologically
   - Filter out outliers (purchases more than 3 standard deviations from mean intervals)
   - Ensure sufficient data points (at least 3 purchases)

2. **Interval Analysis**:
   - Calculate days between consecutive purchases
   - Identify recurring patterns in these intervals
   - Group similar intervals to detect frequency

3. **Frequency Determination**:
   - Weekly pattern: Consistent 7-day intervals (±1 day)
   - Bi-weekly pattern: Consistent 14-day intervals (±2 days)
   - Monthly pattern: Consistent 28-31 day intervals or same date each month

4. **Confidence Calculation**:
   - Base confidence starts at 0.5
   - Increases with more consistent patterns
   - Increases with more data points
   - Decreases with higher variance in intervals
   - Caps at 0.95 (allowing for some uncertainty)

### Integration with Other Services

The `PaydayPatternService` interfaces with:

- `CustomerPaydayService`: Acts as the facade for accessing payday functionality
- `PaydayAPIService`: For storing detected patterns in customer profiles
- `PaydayCalculationService`: For calculating optimal reminder dates based on detected patterns

## Usage Examples

### Basic Pattern Detection

```typescript
// Get a customer's purchase history
const purchaseDates = await getPurchaseDates(customerId);

// Detect their payday pattern
const paydayPattern = PaydayPatternService.detectPaydayPattern(purchaseDates);

if (paydayPattern && paydayPattern.confidenceScore > 0.7) {
  // Store the detected pattern
  await PaydayAPIService.syncCustomerPaydayData(
    customerId,
    paydayPattern.paydayDate,
    paydayPattern.paydayFrequency
  );
}
```

### Combining With Manual Input

```typescript
// Get any manually provided payday information
const manualPaydayInfo = await getCustomerPaydayPreference(customerId);

if (manualPaydayInfo) {
  // Manual data takes precedence, use it directly
  return manualPaydayInfo;
}

// No manual data, try to detect pattern
const purchaseDates = await getPurchaseDates(customerId);
return PaydayPatternService.detectPaydayPattern(purchaseDates);
```

## Performance Considerations

- **Time Complexity**: O(n log n) where n is the number of purchase dates
- **Memory Usage**: O(n) for storing and processing date intervals
- **Caching**: Results should be cached to avoid frequent recalculation
- **Batch Processing**: Process customer cohorts during off-peak hours

## Testing Approach

1. **Unit Testing**:
   - Test with known patterns (weekly, bi-weekly, monthly)
   - Test with edge cases (irregular purchases, insufficient data)
   - Test confidence scoring accuracy

2. **Integration Testing**:
   - Verify correct interaction with `PaydayAPIService`
   - Test persistence and retrieval of detected patterns

3. **Validation Testing**:
   - Compare detected patterns with actual customer-provided data
   - Measure accuracy across customer segments

## Future Enhancements

1. **Multi-pattern detection**: Identifying customers with multiple income sources
2. **Seasonal variation handling**: Adjusting for seasonal employment patterns
3. **ML-enhanced detection**: Using machine learning to improve pattern recognition
4. **External data integration**: Incorporating typical industry payday patterns
