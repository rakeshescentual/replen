
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, CalendarClock, TrendingUp, DollarSign } from "lucide-react";
import ProductCard from './ProductCard';
import { 
  PersonalizedProduct, 
  getPaydayAlignmentClass,
  getValueSavingsClass
} from '@/types/personalized-recommendations';
import { Badge } from '@/components/ui/badge';

interface CategorySectionProps {
  category: string;
  products: PersonalizedProduct[];
  isExpanded: boolean;
  onToggle: () => void;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onSubscribe: (productId: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  products,
  isExpanded,
  onToggle,
  onAddToCart,
  onAddToWishlist,
  onSubscribe
}) => {
  // Calculate category metrics for display in the header
  const averageValueScore = products.length > 0 
    ? Math.round(products.reduce((sum, p) => sum + p.valueScore, 0) / products.length) 
    : 0;
    
  const paydayAlignedProducts = products.filter(p => p.paydayAligned).length;
  const paydayAlignedPercent = products.length > 0 
    ? Math.round((paydayAlignedProducts / products.length) * 100) 
    : 0;
    
  const averageSavings = products.length > 0 
    ? Math.round(products.reduce((sum, p) => sum + (p.valueSavings || 0), 0) / products.length) 
    : 0;
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div 
        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <h3 className="font-medium capitalize text-gray-800">{category} Recommendations</h3>
          
          {products.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {averageValueScore > 0 && (
                <Badge variant="outline" className={`text-xs ${getValueSavingsClass(averageValueScore - 50)}`}>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Avg Value: {averageValueScore}%</span>
                </Badge>
              )}
              
              {paydayAlignedPercent > 0 && (
                <Badge variant="outline" className={`text-xs ${getPaydayAlignmentClass(paydayAlignedPercent > 50)}`}>
                  <CalendarClock className="h-3 w-3 mr-1" />
                  <span>{paydayAlignedPercent}% Payday Aligned</span>
                </Badge>
              )}
              
              {averageSavings > 0 && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-100">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>~{averageSavings}% Better Value</span>
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 hover:bg-gray-200/50">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {products.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No personalized products found in this category
            </div>
          ) : (
            products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onSubscribe={onSubscribe}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
