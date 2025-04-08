
/**
 * Hook for detecting and managing customer payday patterns
 */
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CustomerPaydayService } from "@/utils/CustomerPaydayService";
import { PaydayPattern, PaydayInfo as PaydayInfoType } from "@/utils/payday/PaydayTypes";

export interface UsePaydayDetectionProps {
  customerId?: string;
  orderHistory?: any[];
  enableAutoDetection?: boolean;
  confidenceThreshold?: number;
}

export type PaydayFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface PaydayInfo {
  paydayDate: number;
  paydayFrequency: PaydayFrequency;
  confidenceScore: number;
  lastUpdated?: string;
}

type PaydayDetectionStatus = 'idle' | 'loading' | 'detecting' | 'success' | 'error';

/**
 * Hook for detecting and managing customer payday information
 */
export function usePaydayDetection({
  customerId,
  orderHistory = [],
  enableAutoDetection = false,
  confidenceThreshold = 70
}: UsePaydayDetectionProps = {}) {
  const [paydayInfo, setPaydayInfo] = useState<PaydayInfo | null>(null);
  const [status, setStatus] = useState<PaydayDetectionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Helper to create a standardized timestamp
  const createTimestamp = useCallback(() => {
    return new Date().toISOString();
  }, []);
  
  /**
   * Fetch existing payday information for a customer
   */
  const fetchPaydayInfo = useCallback(async () => {
    if (!customerId) return null;
    
    setStatus('loading');
    setError(null);
    
    try {
      const data = await CustomerPaydayService.getCustomerPaydayData(customerId);
      
      if (data) {
        const paydayData: PaydayInfo = {
          paydayDate: data.paydayDate,
          paydayFrequency: data.paydayFrequency,
          confidenceScore: 0, // Not provided by this API
          lastUpdated: createTimestamp()
        };
        
        setPaydayInfo(paydayData);
        setStatus('success');
        return paydayData;
      }
      
      setStatus('idle');
      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch payday information';
      setError(errorMessage);
      setStatus('error');
      
      console.error('Error fetching payday information:', err);
      return null;
    }
  }, [customerId, createTimestamp]);
  
  /**
   * Detect payday pattern from order history
   */
  const detectPaydayPattern = useCallback(async () => {
    // Validate input requirements
    if (!customerId) {
      toast({
        title: "Missing customer ID",
        description: "Customer ID is required to detect payday patterns",
        variant: "destructive"
      });
      return null;
    }
    
    if (!orderHistory || orderHistory.length < 2) {
      toast({
        title: "Insufficient order history",
        description: "At least 2 orders are required to detect a pattern",
        variant: "destructive"
      });
      return null;
    }
    
    setStatus('detecting');
    setError(null);
    
    try {
      // Extract purchase dates from order history
      const purchaseDates = orderHistory.map(order => new Date(order.processed_at));
      
      // Use PaydayPatternService to detect patterns
      const patternResult = CustomerPaydayService.detectPaydayPattern(purchaseDates);
      
      if (!patternResult) {
        toast({
          title: "No pattern detected",
          description: "Couldn't detect a clear payday pattern from order history",
          variant: "destructive"
        });
        setStatus('idle');
        return null;
      }
      
      const detectedInfo: PaydayInfo = {
        paydayDate: patternResult.paydayDate,
        paydayFrequency: patternResult.paydayFrequency,
        confidenceScore: patternResult.confidenceScore,
        lastUpdated: createTimestamp()
      };
      
      setPaydayInfo(detectedInfo);
      setStatus('success');
      
      // Update in backend if auto-detection is enabled and confidence is high enough
      if (enableAutoDetection && patternResult.confidenceScore >= confidenceThreshold) {
        await updatePaydayInfo(detectedInfo);
        
        toast({
          title: "Payday pattern detected",
          description: `Detected ${detectedInfo.paydayFrequency} pattern with ${detectedInfo.confidenceScore}% confidence`,
        });
      } else if (patternResult.confidenceScore < confidenceThreshold) {
        toast({
          title: "Low confidence pattern",
          description: `Pattern detected but confidence (${patternResult.confidenceScore}%) is below threshold`,
          variant: "destructive"
        });
      }
      
      return detectedInfo;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to detect payday pattern';
      setError(errorMessage);
      setStatus('error');
      
      toast({
        title: "Error detecting pattern",
        description: errorMessage,
        variant: "destructive"
      });
      
      console.error('Error detecting payday pattern:', err);
      return null;
    }
  }, [customerId, orderHistory, enableAutoDetection, confidenceThreshold, createTimestamp, toast]);
  
  /**
   * Update payday information for a customer
   */
  const updatePaydayInfo = useCallback(async (info: Omit<PaydayInfo, 'lastUpdated'>) => {
    if (!customerId) return false;
    
    setStatus('loading');
    
    try {
      const success = await CustomerPaydayService.syncCustomerPaydayData(
        customerId,
        info.paydayDate,
        info.paydayFrequency
      );
      
      if (success) {
        // Refresh payday information
        await fetchPaydayInfo();
        
        toast({
          title: "Success",
          description: "Payday information updated successfully"
        });
        
        return true;
      }
      
      setStatus('error');
      setError('Failed to update payday information');
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setStatus('error');
      
      toast({
        title: "Error updating payday information",
        description: errorMessage,
        variant: "destructive"
      });
      
      console.error('Error updating payday information:', err);
      return false;
    }
  }, [customerId, fetchPaydayInfo, toast]);
  
  /**
   * Calculate the next payday date for a customer
   */
  const calculateNextPaydayDate = useCallback(() => {
    if (!paydayInfo) return null;
    
    try {
      return CustomerPaydayService.calculateNextPayday(
        paydayInfo.paydayDate,
        paydayInfo.paydayFrequency
      );
    } catch (err) {
      console.error('Error calculating next payday date:', err);
      return null;
    }
  }, [paydayInfo]);
  
  /**
   * Calculate the optimal reminder date based on product run-out date
   */
  const calculateOptimalReminderDate = useCallback((productRunOutDate: Date) => {
    if (!paydayInfo) return null;
    
    try {
      return CustomerPaydayService.calculateOptimalReminderDate(
        paydayInfo.paydayDate,
        paydayInfo.paydayFrequency,
        productRunOutDate
      );
    } catch (err) {
      console.error('Error calculating optimal reminder date:', err);
      return null;
    }
  }, [paydayInfo]);
  
  /**
   * Schedule reminders for a customer based on their payday
   */
  const schedulePaydayReminders = useCallback(async (productIds: string[]) => {
    if (!customerId || !paydayInfo || productIds.length === 0) return false;
    
    setStatus('loading');
    
    try {
      // This would need to be implemented in CustomerPaydayService
      const result = await CustomerPaydayService.schedulePaydayReminders(
        customerId, 
        productIds, 
        paydayInfo.paydayDate, 
        paydayInfo.paydayFrequency
      );
      
      setStatus('success');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to schedule reminders';
      setError(errorMessage);
      setStatus('error');
      
      console.error('Error scheduling payday reminders:', err);
      return false;
    }
  }, [customerId, paydayInfo]);
  
  // Initialize payday info on mount or when customerId changes
  useEffect(() => {
    if (customerId) {
      fetchPaydayInfo();
    }
  }, [customerId, fetchPaydayInfo]);
  
  return {
    paydayInfo,
    status,
    isLoading: status === 'loading',
    isDetecting: status === 'detecting',
    isError: status === 'error',
    error,
    detectPaydayPattern,
    updatePaydayInfo,
    refreshPaydayInfo: fetchPaydayInfo,
    calculateNextPaydayDate,
    calculateOptimalReminderDate,
    schedulePaydayReminders
  };
}
