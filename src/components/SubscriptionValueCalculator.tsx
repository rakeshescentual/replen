
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, DollarSign, Recycle, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
  estimatedLifespan: number; // in days
  subscriptionDiscount: number; // percentage
  optimalInterval: number; // in days
  intervalOptions: number[]; // in days
}

const SubscriptionValueCalculator: React.FC = () => {
  const { toast } = useToast();
  const [selectedProducts, setSelectedProducts] = useState<SubscriptionProduct[]>([
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
  const calculateSavings = (product: SubscriptionProduct): number => {
    // Regular price monthly cost
    const regularMonthlyCost = (product.price / product.estimatedLifespan) * 30;
    
    // Subscription monthly cost
    const subscriptionPrice = getSubscriptionPrice(product.price, product.subscriptionDiscount);
    const subscriptionMonthlyCost = (subscriptionPrice / selectedIntervals[product.id]) * 30;
    
    // Monthly savings
    return regularMonthlyCost - subscriptionMonthlyCost;
  };
  
  // Calculate yearly savings
  const calculateYearlySavings = (product: SubscriptionProduct): number => {
    return calculateSavings(product) * 12;
  };
  
  // Calculate value improvement percentage
  const calculateValueImprovement = (product: SubscriptionProduct): number => {
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
                <Calendar className="h-5 w-5 text-blue-600" />
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
              <div key={product.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{product.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Estimated to last: {product.estimatedLifespan} days
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="line-through text-sm text-gray-500">£{product.price.toFixed(2)}</div>
                          <div className="font-medium">
                            £{getSubscriptionPrice(product.price, product.subscriptionDiscount).toFixed(2)}
                            <span className="text-sm text-green-600 ml-1">
                              (-{product.subscriptionDiscount}%)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm font-medium">Replenishment Interval: {selectedIntervals[product.id]} days</span>
                          </div>
                          {selectedIntervals[product.id] === product.optimalInterval && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Optimal
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm w-8">30d</span>
                          <Slider
                            value={[selectedIntervals[product.id]]}
                            min={30}
                            max={90}
                            step={15}
                            onValueChange={(value) => updateInterval(product.id, value[0])}
                            className="flex-grow"
                          />
                          <span className="text-sm w-8">90d</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs flex items-center"
                            onClick={() => toggleDetails(product.id)}
                          >
                            {showDetails[product.id] ? (
                              <>
                                <ChevronUp className="h-3 w-3 mr-1" />
                                Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3 w-3 mr-1" />
                                Show Value Details
                              </>
                            )}
                          </Button>
                          
                          <div className="flex items-center">
                            <Badge className="bg-amber-100 text-amber-800 mr-2">
                              {product.valueScore}
                              {calculateValueImprovement(product) > 0 && (
                                <span className="text-green-600 ml-1">+{calculateValueImprovement(product)}%</span>
                              )}
                            </Badge>
                            <span className="text-sm">Value Score</span>
                          </div>
                        </div>
                        
                        {showDetails[product.id] && (
                          <div className="mt-4 pt-4 border-t text-sm">
                            <Table>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="py-2 pl-0">Monthly Savings</TableCell>
                                  <TableCell className="py-2 text-right text-green-600">
                                    £{calculateSavings(product).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="py-2 pl-0">Yearly Savings</TableCell>
                                  <TableCell className="py-2 text-right text-green-600 font-medium">
                                    £{calculateYearlySavings(product).toFixed(2)}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="py-2 pl-0">Optimal Interval</TableCell>
                                  <TableCell className="py-2 text-right">
                                    {product.optimalInterval} days
                                    {selectedIntervals[product.id] !== product.optimalInterval && (
                                      <span className="text-amber-600 ml-1">(Recommended)</span>
                                    )}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="py-2 pl-0">Value Improvement</TableCell>
                                  <TableCell className="py-2 text-right text-green-600">
                                    +{calculateValueImprovement(product)}%
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Total Yearly Savings</div>
                <div className="text-sm text-gray-600 mt-1">By subscribing at optimal intervals</div>
              </div>
              <div className="text-xl font-bold text-green-600">
                £{calculateTotalYearlySavings().toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={setupSubscription} className="flex items-center">
              <Recycle className="mr-2 h-4 w-4" />
              Create Subscription Schedule
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Why subscribe?</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Save up to 15% on premium products</li>
            <li>Personalized replenishment prevents running out or product expiration</li>
            <li>Optimal timing maximizes product effectiveness</li>
            <li>Reduce waste by receiving products when you actually need them</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionValueCalculator;
