
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PackagePlus, ArrowRight, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface BundleProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
}

interface ValueBundle {
  id: string;
  title: string;
  description: string;
  products: BundleProduct[];
  totalPrice: number;
  bundlePrice: number;
  combinedValueScore: number;
  primaryCategory: string;
}

const ValueBundleRecommendations: React.FC = () => {
  const { toast } = useToast();
  const valueBundles: ValueBundle[] = [
    {
      id: "b1",
      title: "Ultimate Anti-Aging Routine",
      description: "Complete premium skincare routine with our highest value anti-aging products",
      primaryCategory: "Skincare",
      products: [
        {
          id: "p1",
          title: "Luxury Anti-Aging Serum",
          image: "https://placehold.co/80x80",
          price: 89.99,
          valueScore: 87
        },
        {
          id: "p2",
          title: "Premium Night Cream",
          image: "https://placehold.co/80x80",
          price: 65.50,
          valueScore: 84
        },
        {
          id: "p3",
          title: "Advanced Eye Treatment",
          image: "https://placehold.co/80x80",
          price: 49.99,
          valueScore: 82
        }
      ],
      totalPrice: 205.48,
      bundlePrice: 174.99,
      combinedValueScore: 89
    },
    {
      id: "b2",
      title: "Hydration Essentials",
      description: "Our best value hydrating products combined for maximum effectiveness",
      primaryCategory: "Skincare",
      products: [
        {
          id: "p4",
          title: "Hydrating Cleanser",
          image: "https://placehold.co/80x80",
          price: 35.99,
          valueScore: 83
        },
        {
          id: "p5",
          title: "Hyaluronic Acid Serum",
          image: "https://placehold.co/80x80",
          price: 59.99,
          valueScore: 85
        },
        {
          id: "p6",
          title: "Intensive Moisturizer",
          image: "https://placehold.co/80x80",
          price: 45.50,
          valueScore: 81
        }
      ],
      totalPrice: 141.48,
      bundlePrice: 119.99,
      combinedValueScore: 86
    }
  ];
  
  const addBundleToCart = (bundleId: string) => {
    toast({
      title: "Bundle Added",
      description: "Value bundle has been added to your cart"
    });
  };
  
  // Get badge color based on value score
  const getValueBadgeClass = (score: number): string => {
    if (score >= 85) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 75) return "bg-amber-100 text-amber-800";
    return "bg-gray-100 text-gray-800";
  };
  
  // Calculate savings percentage
  const calculateSavings = (total: number, bundle: number): number => {
    return Math.round(((total - bundle) / total) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Value-Based Product Bundles</CardTitle>
        <CardDescription>
          Curated collections of premium products with exceptional combined value
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {valueBundles.map(bundle => (
            <div key={bundle.id} className="border rounded-lg overflow-hidden">
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
                    
                    <Button onClick={() => addBundleToCart(bundle.id)}>
                      <PackagePlus className="mr-2 h-4 w-4" />
                      Add Bundle to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <p className="text-sm text-gray-600">
          Our value bundles are created by analyzing thousands of customer purchases and reviews 
          to identify product combinations that deliver exceptional value when used together.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ValueBundleRecommendations;
