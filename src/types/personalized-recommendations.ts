
export interface PersonalizedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  valueScore: number;
  category: string;
  personalizedReason: string;
  matchScore: number;
  // Added fields for improved integration with Gadget.dev
  estimatedDaysRemaining?: number;
  repurchaseProbability?: number;
  paydayAligned?: boolean;
  valueSavings?: number;
}

export type CategoryId = 'skincare' | 'haircare' | 'makeup' | 'fragrance' | 'bodycare';

export interface ProductsByCategory {
  [key: string]: PersonalizedProduct[];
}

// Enhanced utility functions for getting match score color classes with improved visual hierarchy
export const getMatchColorClass = (score: number): string => {
  if (score >= 90) return "bg-green-100 text-green-800 border-green-200";
  if (score >= 80) return "bg-blue-100 text-blue-800 border-blue-200";
  if (score >= 70) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

export const getScoreColorClass = (score: number): string => {
  if (score >= 80) return "bg-amber-100 text-amber-800 border-amber-200";
  if (score >= 70) return "bg-amber-50 text-amber-700 border-amber-100";
  if (score >= 60) return "bg-yellow-50 text-yellow-700 border-yellow-100";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

// Utility function for getting color class for payday alignment indicator
export const getPaydayAlignmentClass = (isAligned: boolean): string => {
  return isAligned 
    ? "bg-green-50 text-green-700 border-green-100" 
    : "bg-gray-50 text-gray-600 border-gray-100";
};

// Utility function for value savings badge
export const getValueSavingsClass = (savingsPercent: number): string => {
  if (savingsPercent >= 30) return "bg-green-100 text-green-800 border-green-200";
  if (savingsPercent >= 20) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (savingsPercent >= 10) return "bg-teal-100 text-teal-800 border-teal-200";
  return "bg-blue-50 text-blue-800 border-blue-100";
};

// Enhanced types for Gadget.dev integration with Shopify
// Updated to align with Gadget.dev's type-safe route parameters
export interface ShopifyProductMetafields {
  valueScore?: number;
  costPerDay?: number;
  estimatedLifespan?: number;
  repurchaseRate?: number;
  internetDataScore?: number;
  paydayAlignmentScore?: number;
}

// Type-safe route parameter types for Gadget.dev API requests
export interface ProductRouteParams {
  id: string;
  includes?: string[];
}

export interface CategoryRouteParams {
  category: CategoryId;
  limit?: number;
  sort?: 'value' | 'match' | 'price';
}

export interface CustomerRouteParams {
  customerId: string;
  productTypes?: CategoryId[];
}

// Gadget.dev product response format using their enhanced Shopify connection
export interface GadgetProductResponse {
  id: string;
  title: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  metafields: ShopifyProductMetafields;
  personalizedReason?: string;
}

// Converter function to transform Gadget API responses to our internal format
// Updated to align with Gadget.dev's latest best practices
export const convertGadgetProductToPersonalized = (
  gadgetProduct: GadgetProductResponse
): PersonalizedProduct => {
  const matchScore = gadgetProduct.metafields.paydayAlignmentScore || 
    Math.floor(70 + Math.random() * 20);
  
  return {
    id: gadgetProduct.id,
    title: gadgetProduct.title,
    image: gadgetProduct.image,
    price: gadgetProduct.price,
    originalPrice: gadgetProduct.compareAtPrice,
    valueScore: gadgetProduct.metafields.valueScore || 75,
    category: gadgetProduct.category,
    personalizedReason: gadgetProduct.personalizedReason || 
      "Based on your purchase history and preferences",
    matchScore: matchScore,
    estimatedDaysRemaining: gadgetProduct.metafields.estimatedLifespan,
    repurchaseProbability: gadgetProduct.metafields.repurchaseRate,
    paydayAligned: (gadgetProduct.metafields.paydayAlignmentScore || 0) > 70,
    valueSavings: gadgetProduct.metafields.valueScore 
      ? Math.floor((gadgetProduct.metafields.valueScore - 50) / 2)
      : undefined
  };
};

// New utility for environment-specific configuration
export const getGadgetEnvironment = (): 'development' | 'staging' | 'production' => {
  const hostname = window.location.hostname;
  if (hostname.includes('dev') || hostname.includes('localhost')) return 'development';
  if (hostname.includes('staging')) return 'staging';
  return 'production';
};
