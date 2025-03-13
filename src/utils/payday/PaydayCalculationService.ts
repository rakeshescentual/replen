
/**
 * Service for calculating payday-related dates
 */
export class PaydayCalculationService {
  /**
   * Calculates the next payday date for a customer
   * @param currentPaydayDate Day of month (1-31)
   * @param paydayFrequency Payment frequency
   * @returns Date object representing the next payday
   */
  public static calculateNextPayday(
    currentPaydayDate: number,
    paydayFrequency: 'monthly' | 'biweekly' | 'weekly' = 'monthly'
  ): Date {
    const today = new Date();
    let nextPayday = new Date();
    
    switch (paydayFrequency) {
      case 'monthly':
        // Set to this month's payday
        nextPayday.setDate(currentPaydayDate);
        // If today is past this month's payday, move to next month
        if (today.getDate() >= currentPaydayDate) {
          nextPayday.setMonth(nextPayday.getMonth() + 1);
        }
        break;
        
      case 'biweekly':
        // Biweekly logic - assume paydayDate is last payday
        const lastPayday = new Date();
        lastPayday.setDate(currentPaydayDate);
        // Add 14 days for next payday
        nextPayday = new Date(lastPayday.getTime() + 14 * 24 * 60 * 60 * 1000);
        break;
        
      case 'weekly':
        // Weekly logic - add 7 days from the payday date
        const weeklyLastPayday = new Date();
        weeklyLastPayday.setDate(currentPaydayDate);
        // Add 7 days for next payday
        nextPayday = new Date(weeklyLastPayday.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
    }
    
    return nextPayday;
  }
  
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
  ): Date {
    // Get the next payday
    const nextPayday = this.calculateNextPayday(paydayDate, paydayFrequency);
    
    // Determine if next payday is before or after run-out date
    if (nextPayday < productRunOutDate) {
      // If next payday is before run-out, send reminder slightly after payday
      // (2 days after payday when they have money)
      return new Date(nextPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
    } else {
      // If next payday is after run-out, we need the previous payday
      // Calculate backwards based on frequency
      let daysBefore = 0;
      switch (paydayFrequency) {
        case 'monthly':
          // Go back approximately one month
          const prevMonthPayday = new Date(nextPayday);
          prevMonthPayday.setMonth(prevMonthPayday.getMonth() - 1);
          return new Date(prevMonthPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
        case 'biweekly':
          daysBefore = 14;
          break;
        case 'weekly':
          daysBefore = 7;
          break;
      }
      
      // Calculate previous payday + 2 days
      const previousPayday = new Date(nextPayday.getTime() - daysBefore * 24 * 60 * 60 * 1000);
      return new Date(previousPayday.getTime() + 2 * 24 * 60 * 60 * 1000);
    }
  }
}
