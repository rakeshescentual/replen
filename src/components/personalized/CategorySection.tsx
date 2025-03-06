
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
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-medium capitalize">{category} Recommendations</h3>
        <Button variant="ghost" size="sm">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-4 divide-y">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              onSubscribe={onSubscribe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
