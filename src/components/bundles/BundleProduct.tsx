
import React from 'react';
import { Badge } from "@/components/ui/badge";

export interface BundleProductType {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
}

interface BundleProductProps {
  product: BundleProductType;
  isLast: boolean;
}

const BundleProduct: React.FC<BundleProductProps> = ({ product, isLast }) => {
  return (
    <div className="flex-1 flex items-center p-2">
      <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded mr-3" />
      <div>
        <h4 className="font-medium text-sm">{product.title}</h4>
        <div className="flex items-center mt-1">
          <Badge variant="outline" className="text-xs mr-2">
            {product.valueScore} Value
          </Badge>
          <span className="text-sm">£{product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BundleProduct;
