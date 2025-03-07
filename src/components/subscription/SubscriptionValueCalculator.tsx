
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Recycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SubscriptionProduct, { SubscriptionProductType } from './SubscriptionProduct';
import SavingsSummary from './SavingsSummary';
import SubscriptionBenefits from './SubscriptionBenefits';

const SubscriptionValueCalculator: React.FC = () => {
  const { toast } = useToast();
  
  const [selectedProducts, setSelectedProducts] = useState<SubscriptionProductType[]>([
    {
      id: "1",
      title: "Premium Facial Cleanser",
      image: "https://placehold.co/60x60",
      price: 39.99,
      valueScore: 82,
      estimatedLifespan: 60,
      subscriptionDiscount: 15,
      optimalInterval: 60,
      intervalOptions: [30, 45, 60, 90]
    },
    {
      id: "2",
      title: "Anti-Aging Serum",
      image: "https://placehold.co/60x60",
      price: 79.99,
      valueScore: 87,
      estimatedLifespan: 45,
      subscriptionDiscount: 15,
      optimalInterval: 45,
      intervalOptions: [30, 45, 60, 90]
    }
  ]);
  
  const [selectedIntervals, setSelectedIntervals] = useState<Record<string, number>>({
    "1": 60,
    "2": 45
  });
  
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({
    "1": false,
    "2": false
  });
  
  const [allSubscriptions, setAllSubscriptions] = useState(true);
  
  // Update interval for a product
  const updateInterval = (productId: string, interval: number) => {
    setSelectedIntervals({
      ...selectedIntervals,
      [productId]: interval
    });
  };
  
  // Toggle details for a product
  const toggleDetails = (productId: string) => {
    setShowDetails({
      ...showDetails,
      [productId]: !showDetails[productId]
    });
  };
  
  // Calculate subscription price
  const getSubscriptionPrice = (price: number, discount: number): number => {
    return price * (1 - discount / 100);
  };
  
  // Calculate savings
  const calculateSavings = (product: SubscriptionProductType): number => {
    // Regular price monthly cost
    const regularMonthlyCost = (product.price / product.estimatedLifespan) * 30;
    
    // Subscription monthly cost
    const subscriptionPrice = getSubscriptionPrice(product.price, product.subscriptionDiscount);
    const subscriptionMonthlyCost = (subscriptionPrice / selectedIntervals[product.id]) * 30;
    
    // Monthly savings
    return regularMonthlyCost - subscriptionMonthlyCost;
  };
  
  // Calculate yearly savings
  const calculateYearlySavings = (product: SubscriptionProductType): number => {
    return calculateSavings(product) * 12;
  };
  
  // Calculate value improvement percentage
  const calculateValueImprovement = (product: SubscriptionProductType): number => {
    const regularValue = product.valueScore;
    
    // Assume subscription increases value score by reducing cost and optimizing usage
    const optimalMultiplier = 1 + (Math.abs(selectedIntervals[product.id] - product.optimalInterval) / product.optimalInterval * -0.2);
    const discountFactor = product.subscriptionDiscount / 100;
    
    return Math.min(15, Math.round((optimalMultiplier + discountFactor) * 10));
  };
  
  // Calculate total savings
  const calculateTotalYearlySavings = (): number => {
    return selectedProducts.reduce((total, product) => total + calculateYearlySavings(product), 0);
  };
  
  // Set up subscription
  const setupSubscription = () => {
    toast({
      title: "Subscription Created",
      description: "Your value-optimized replenishment schedule has been created"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Value Calculator</CardTitle>
        <CardDescription>
          Optimize your replenishment schedule for maximum value
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                <Recycle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Optimized Replenishment</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Our AI analyzes your usage patterns to recommend the perfect replenishment schedule. 
                  Subscribing at the optimal interval maximizes product value and minimizes waste.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-b">
            <div className="font-medium">Subscribe to all products</div>
            <Switch
              checked={allSubscriptions}
              onCheckedChange={setAllSubscriptions}
            />
          </div>
          
          <div className="space-y-4">
            {selectedProducts.map(product => (
              <SubscriptionProduct
                key={product.id}
                product={product}
                interval={selectedIntervals[product.id]}
                showDetails={showDetails[product.id]}
                onUpdateInterval={updateInterval}
                onToggleDetails={toggleDetails}
                calculateSavings={calculateSavings}
                calculateYearlySavings={calculateYearlySavings}
                calculateValueImprovement={calculateValueImprovement}
                getSubscriptionPrice={getSubscriptionPrice}
              />
            ))}
          </div>
          
          <SavingsSummary totalYearlySavings={calculateTotalYearlySavings()} />
          
          <div className="flex justify-end">
            <Button onClick={setupSubscription} className="flex items-center">
              <Recycle className="mr-2 h-4 w-4" />
              Create Subscription Schedule
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <SubscriptionBenefits />
      </CardFooter>
    </Card>
  );
};

export default SubscriptionValueCalculator;
