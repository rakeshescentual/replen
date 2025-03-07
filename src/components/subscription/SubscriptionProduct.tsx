
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";

export interface SubscriptionProductType {
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

interface SubscriptionProductProps {
  product: SubscriptionProductType;
  interval: number;
  showDetails: boolean;
  onUpdateInterval: (productId: string, interval: number) => void;
  onToggleDetails: (productId: string) => void;
  calculateSavings: (product: SubscriptionProductType) => number;
  calculateYearlySavings: (product: SubscriptionProductType) => number;
  calculateValueImprovement: (product: SubscriptionProductType) => number;
  getSubscriptionPrice: (price: number, discount: number) => number;
}

const SubscriptionProduct: React.FC<SubscriptionProductProps> = ({
  product,
  interval,
  showDetails,
  onUpdateInterval,
  onToggleDetails,
  calculateSavings,
  calculateYearlySavings,
  calculateValueImprovement,
  getSubscriptionPrice
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
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
                  <span className="text-sm font-medium">Replenishment Interval: {interval} days</span>
                </div>
                {interval === product.optimalInterval && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Optimal
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm w-8">30d</span>
                <Slider
                  value={[interval]}
                  min={30}
                  max={90}
                  step={15}
                  onValueChange={(value) => onUpdateInterval(product.id, value[0])}
                  className="flex-grow"
                />
                <span className="text-sm w-8">90d</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex items-center"
                  onClick={() => onToggleDetails(product.id)}
                >
                  {showDetails ? (
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
              
              {showDetails && (
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
                          {interval !== product.optimalInterval && (
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
  );
};

export default SubscriptionProduct;
