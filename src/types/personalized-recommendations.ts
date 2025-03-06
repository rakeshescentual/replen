
export interface PersonalizedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
  category: string;
  personalizedReason: string;
  matchScore: number;
}

export type CategoryId = 'skincare' | 'haircare' | 'makeup';

export interface ProductsByCategory {
  [key: string]: PersonalizedProduct[];
}

// Utility functions for getting color classes
export const getMatchColorClass = (score: number): string => {
  if (score >= 90) return "bg-green-100 text-green-800";
  if (score >= 80) return "bg-blue-100 text-blue-800";
  if (score >= 70) return "bg-yellow-100 text-yellow-800";
  return "bg-gray-100 text-gray-800";
};

export const getScoreColorClass = (score: number): string => {
  if (score >= 80) return "bg-amber-100 text-amber-800";
  if (score >= 70) return "bg-amber-50 text-amber-700";
  if (score >= 60) return "bg-yellow-50 text-yellow-700";
  return "bg-gray-100 text-gray-800";
};
