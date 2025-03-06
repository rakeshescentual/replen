
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, ShoppingCart } from "lucide-react";
import { PersonalizedProduct, getMatchColorClass, getScoreColorClass } from '@/types/personalized-recommendations';

interface ProductCardProps {
  product: PersonalizedProduct;
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onSubscribe: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onSubscribe
}) => {
  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex bg-white rounded-lg p-3 border hover:shadow-md transition-shadow duration-200">
        <div className="flex-shrink-0 mr-4">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-20 h-20 object-cover rounded-md shadow-sm" 
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{product.title}</h4>
              <div className="flex items-center mt-1.5 space-x-2">
                <Badge className={`${getScoreColorClass(product.valueScore)} font-medium`}>
                  {product.valueScore} Value
                </Badge>
                <Badge variant="outline" className={`${getMatchColorClass(product.matchScore)} font-medium`}>
                  {product.matchScore}% Match
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.personalizedReason}</p>
            </div>
            <span className="font-medium text-gray-900">£{product.price.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button 
              onClick={() => onAddToCart(product.id)}
              className="flex items-center bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="h-4 w-4 mr-1.5" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onSubscribe(product.id)}
              className="hover:bg-blue-50 hover:text-blue-600 border-gray-300"
            >
              <Clock className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onAddToWishlist(product.id)}
              className="hover:bg-rose-50 hover:text-rose-600 border-gray-300"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
