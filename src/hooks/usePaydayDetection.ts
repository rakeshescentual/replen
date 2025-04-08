
/**
 * Hook for detecting customer payday patterns using the latest Gadget.dev features
 */
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { GadgetPaydayService } from "@/utils/GadgetPaydayService";

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
 * using the latest Gadget.dev features
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
      const data = await GadgetPaydayService.getCustomerPaydayInfo({
        customerId,
        includeConfidence: true
      });
      
      if (data) {
        setPaydayInfo({
          paydayDate: data.paydayDate,
          paydayFrequency: data.paydayFrequency,
          confidenceScore: data.confidenceScore || 0,
          lastUpdated: data.lastUpdated
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
      // In a real implementation, we would analyze order dates for patterns
      // For demonstration, we'll use a simplified algorithm
      
      // Sort orders by date
      const sortedOrders = [...orderHistory].sort(
        (a, b) => new Date(a.processed_at).getTime() - new Date(b.processed_at).getTime()
      );
      
      // Extract days of month for each order
      const daysOfMonth = sortedOrders.map(order => {
        return new Date(order.processed_at).getDate();
      });
      
      // Find most frequent day (simplified)
      const dayCounts: Record<number, number> = {};
      let mostFrequentDay = 1;
      let highestCount = 0;
      
      daysOfMonth.forEach(day => {
        dayCounts[day] = (dayCounts[day] || 0) + 1;
        if (dayCounts[day] > highestCount) {
          highestCount = dayCounts[day];
          mostFrequentDay = day;
        }
      });
      
      // Calculate confidence score (simplified)
      const confidenceScore = Math.min(0.95, highestCount / daysOfMonth.length);
      
      // Determine frequency (simplified)
      // This would be more complex in a real implementation
      let frequency: PaydayFrequency = 'monthly';
      
      // Create detected payday info
      const detectedInfo: PaydayInfo = {
        paydayDate: mostFrequentDay,
        paydayFrequency: frequency,
        confidenceScore
      };
      
      setPaydayInfo(detectedInfo);
      
      // Update in backend if auto-detection is enabled
      if (enableAutoDetection && confidenceScore > 0.7) {
        await updatePaydayInfo(detectedInfo);
      }
      
      return detectedInfo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to detect payday pattern');
    } finally {
      setIsDetecting(false);
    }
  }, [customerId, orderHistory, enableAutoDetection, toast]);
  
  // Update payday information
  const updatePaydayInfo = useCallback(async (info: Omit<PaydayInfo, 'confidenceScore' | 'lastUpdated'>) => {
    if (!customerId) return false;
    
    try {
      const success = await GadgetPaydayService.updateCustomerPaydayInfo({
        customerId,
        paydayDate: info.paydayDate,
        paydayFrequency: info.paydayFrequency
      });
      
      if (success) {
        // Create a customer segment based on payday date
        await GadgetPaydayService.createPaydaySegment(info.paydayDate);
        
        // Tag customer with payday date
        await GadgetPaydayService.tagCustomerWithPayday(customerId, info.paydayDate);
        
        // Fetch updated information
        await fetchPaydayInfo();
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
    refreshPaydayInfo: fetchPaydayInfo
  };
}
