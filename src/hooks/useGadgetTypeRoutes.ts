
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  ProductRouteParams, 
  CategoryRouteParams, 
  CustomerRouteParams,
  CategoryId
} from '@/types/personalized-recommendations';
import { gadgetEnvironment } from '@/utils/GadgetEnvironmentService';

/**
 * Custom hook for making type-safe API requests to Gadget.dev
 * 
 * This hook leverages Gadget.dev's Type Route Params feature to ensure
 * type safety throughout the API request lifecycle.
 */
export function useGadgetTypeRoutes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  /**
   * Base function to make authenticated requests to Gadget.dev with type-safe routes
   */
  const makeRequest = useCallback(async <T, P extends Record<string, any>>(
    endpoint: string,
    params: P,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    // Build the URL with query parameters
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => queryParams.append(`${key}[]`, item.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });
    
    const url = `${gadgetEnvironment.getApiBaseUrl()}/${endpoint}${
      queryParams.toString() ? `?${queryParams.toString()}` : ''
    }`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Gadget-API-Key': process.env.GADGET_API_KEY || '',
          'X-Gadget-Environment': gadgetEnvironment.getEnvironment()
        },
        ...(data && { body: JSON.stringify(data) })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      }
      
      return await response.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      
      if (gadgetEnvironment.isLoggingEnabled()) {
        console.error('Gadget API error:', err);
      }
      
      toast({
        title: "API Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  /**
   * Get product details using type-safe route parameters
   */
  const getProduct = useCallback(async (params: ProductRouteParams) => {
    return makeRequest<any, ProductRouteParams>(
      `products/${params.id}`,
      { id: params.id, includes: params.includes || [] }
    );
  }, [makeRequest]);
  
  /**
   * Get products by category using type-safe route parameters
   */
  const getProductsByCategory = useCallback(async (params: CategoryRouteParams) => {
    return makeRequest<any, CategoryRouteParams>(
      'products',
      { 
        category: params.category,
        limit: params.limit || 10,
        sort: params.sort || 'value'
      }
    );
  }, [makeRequest]);
  
  /**
   * Get customer recommendations using type-safe route parameters
   */
  const getCustomerRecommendations = useCallback(async (params: CustomerRouteParams) => {
    return makeRequest<any, CustomerRouteParams>(
      `customers/${params.customerId}/recommendations`,
      { 
        customerId: params.customerId,
        productTypes: params.productTypes || []
      }
    );
  }, [makeRequest]);
  
  /**
   * Update product value metrics
   */
  const updateProductValueMetrics = useCallback(async (
    productId: string,
    valueScore: number,
    costEfficiency: number
  ) => {
    return makeRequest(
      `products/${productId}/value-metrics`,
      {},
      'PUT',
      {
        valueScore,
        costEfficiency,
        lastUpdated: new Date().toISOString()
      }
    );
  }, [makeRequest]);
  
  return {
    isLoading,
    error,
    getProduct,
    getProductsByCategory,
    getCustomerRecommendations,
    updateProductValueMetrics
  };
}
