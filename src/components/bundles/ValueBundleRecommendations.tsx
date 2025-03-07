
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import BundleCard, { ValueBundleType } from './BundleCard';

const ValueBundleRecommendations: React.FC = () => {
  const { toast } = useToast();
  const valueBundles: ValueBundleType[] = [
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
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              onAddBundleToCart={addBundleToCart}
              getValueBadgeClass={getValueBadgeClass}
              calculateSavings={calculateSavings}
            />
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
