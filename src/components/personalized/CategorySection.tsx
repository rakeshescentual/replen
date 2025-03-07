
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCard from './ProductCard';
import { PersonalizedProduct } from '@/types/personalized-recommendations';

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
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div 
        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-medium capitalize text-gray-800">{category} Recommendations</h3>
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
