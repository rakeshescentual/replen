
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Info, PackagePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BundleProduct, { BundleProductType } from './BundleProduct';

export interface ValueBundleType {
  id: string;
  title: string;
  description: string;
  products: BundleProductType[];
  totalPrice: number;
  bundlePrice: number;
  combinedValueScore: number;
  primaryCategory: string;
}

interface BundleCardProps {
  bundle: ValueBundleType;
  onAddBundleToCart: (bundleId: string) => void;
  getValueBadgeClass: (score: number) => string;
  calculateSavings: (total: number, bundle: number) => number;
}

const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  onAddBundleToCart,
  getValueBadgeClass,
  calculateSavings
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{bundle.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{bundle.description}</p>
            <div className="flex items-center mt-2 space-x-3">
              <Badge className={getValueBadgeClass(bundle.combinedValueScore)}>
                {bundle.combinedValueScore} Combined Value
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                Save {calculateSavings(bundle.totalPrice, bundle.bundlePrice)}%
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 line-through">£{bundle.totalPrice.toFixed(2)}</div>
            <div className="text-lg font-bold">£{bundle.bundlePrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-col sm:flex-row">
          {bundle.products.map((product, i) => (
            <React.Fragment key={product.id}>
              <BundleProduct product={product} isLast={i === bundle.products.length - 1} />
              {i < bundle.products.length - 1 && (
                <div className="hidden sm:flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p>This bundle combines products that work synergistically to achieve better results than when used individually, increasing their combined value score.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-sm text-gray-600">These products work better together</span>
            </div>
            
            <Button onClick={() => onAddBundleToCart(bundle.id)}>
              <PackagePlus className="mr-2 h-4 w-4" />
              Add Bundle to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleCard;
