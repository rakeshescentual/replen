
/**
 * Hook for detecting customer payday patterns
 */
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CustomerPaydayService } from "@/utils/CustomerPaydayService";
import { PaydayPattern, PaydayInfo as PaydayInfoType } from "@/utils/payday/PaydayTypes";

export interface UsePaydayDetectionProps {
  customerId?: string;
  orderHistory?: any[];
  enableAutoDetection?: boolean;
}

export type PaydayFrequency = 'weekly' | 'biweekly' | 'monthly';

export interface PaydayInfo {
  paydayDate: number;
  paydayFrequency: PaydayFrequency;
  confidenceScore: number;
  lastUpdated?: string;
}

/**
 * Hook for detecting and managing customer payday information
 */
export function usePaydayDetection({
  customerId,
  orderHistory,
  enableAutoDetection = false
}: UsePaydayDetectionProps = {}) {
  const [paydayInfo, setPaydayInfo] = useState<PaydayInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  // Fetch existing payday information
  const fetchPaydayInfo = useCallback(async () => {
    if (!customerId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await CustomerPaydayService.getCustomerPaydayData(customerId);
      
      if (data) {
        setPaydayInfo({
          paydayDate: data.paydayDate,
          paydayFrequency: data.paydayFrequency,
          confidenceScore: 0, // Not provided by this API, default to 0
          lastUpdated: new Date().toISOString() // Use current time as we don't get this from the API
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payday information');
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);
  
  // Detect payday pattern from order history
  const detectPaydayPattern = useCallback(async () => {
    if (!customerId || !orderHistory || orderHistory.length < 2) {
      toast({
        title: "Cannot detect pattern",
        description: "Insufficient order history to detect payday pattern",
        variant: "destructive"
      });
      return;
    }
    
    setIsDetecting(true);
    setError(null);
    
    try {
      // Extract purchase dates from order history
      const purchaseDates = orderHistory.map(order => new Date(order.processed_at));
      
      // Use our PaydayPatternService (via CustomerPaydayService) to detect patterns
      const patternResult = CustomerPaydayService.detectPaydayPattern(purchaseDates);
      
      if (!patternResult) {
        toast({
          title: "No pattern detected",
          description: "Couldn't detect a clear payday pattern from order history",
          variant: "destructive"
        });
        return null;
      }
      
      const detectedInfo: PaydayInfo = {
        paydayDate: patternResult.paydayDate,
        paydayFrequency: patternResult.paydayFrequency,
        confidenceScore: patternResult.confidenceScore,
        lastUpdated: new Date().toISOString()
      };
      
      setPaydayInfo(detectedInfo);
      
      // Update in backend if auto-detection is enabled
      if (enableAutoDetection && patternResult.confidenceScore > 70) {
        await updatePaydayInfo(detectedInfo);
      }
      
      return detectedInfo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect payday pattern');
      return null;
    } finally {
      setIsDetecting(false);
    }
  }, [customerId, orderHistory, enableAutoDetection, toast]);
  
  // Update payday information
  const updatePaydayInfo = useCallback(async (info: Omit<PaydayInfo, 'lastUpdated'>) => {
    if (!customerId) return false;
    
    try {
      const success = await CustomerPaydayService.syncCustomerPaydayData(
        customerId,
        info.paydayDate,
        info.paydayFrequency
      );
      
      if (success) {
        // Fetch updated information
        await fetchPaydayInfo();
        
        toast({
          title: "Success",
          description: "Payday information updated successfully"
        });
      }
      
      return success;
    } catch (err) {
      toast({
        title: "Error updating payday information",
        description: err instanceof Error ? err.message : "An unknown error occurred",
        variant: "destructive"
      });
      return false;
    }
  }, [customerId, fetchPaydayInfo, toast]);
  
  // Calculate next payday date
  const calculateNextPaydayDate = useCallback(() => {
    if (!paydayInfo) return null;
    
    return CustomerPaydayService.calculateNextPayday(
      paydayInfo.paydayDate,
      paydayInfo.paydayFrequency
    );
  }, [paydayInfo]);
  
  // Calculate optimal reminder date
  const calculateOptimalReminderDate = useCallback((productRunOutDate: Date) => {
    if (!paydayInfo) return null;
    
    return CustomerPaydayService.calculateOptimalReminderDate(
      paydayInfo.paydayDate,
      paydayInfo.paydayFrequency,
      productRunOutDate
    );
  }, [paydayInfo]);
  
  // Initial fetch
  useEffect(() => {
    if (customerId) {
      fetchPaydayInfo();
    }
  }, [customerId, fetchPaydayInfo]);
  
  return {
    paydayInfo,
    isLoading,
    isDetecting,
    error,
    detectPaydayPattern,
    updatePaydayInfo,
    refreshPaydayInfo: fetchPaydayInfo,
    calculateNextPaydayDate,
    calculateOptimalReminderDate
  };
}
