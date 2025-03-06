
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, RefreshCw, ChevronUp, ChevronDown, DollarSign, Clock } from "lucide-react";

interface ProductOption {
  name: string;
  price: number;
  size: string;
  estimatedUses: number;
  actualUses: number;
}

const InteractiveValueCalculator = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductOption>(productOptions[0]);
  const [usageFrequency, setUsageFrequency] = useState(1); // times per day
  const [usageAmount, setUsageAmount] = useState(2); // on a scale of 1-5
  const [isExpanded, setIsExpanded] = useState(true);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const [costPerDay, setCostPerDay] = useState(0);
  const [costPerUse, setCostPerUse] = useState(0);
  const [valueScore, setValueScore] = useState(0);
  const [daysLasting, setDaysLasting] = useState(0);

  useEffect(() => {
    calculateMetrics();
  }, [selectedProduct, usageFrequency, usageAmount]);

  const calculateMetrics = () => {
    // Calculate how many applications based on usage amount (1-5 scale)
    // Higher usage amount means using more product per application
    const usageMultiplier = 0.7 + (usageAmount * 0.15);
    
    // Adjust total uses based on usage amount
    const adjustedUses = selectedProduct.actualUses / usageMultiplier;
    
    // Calculate days lasting based on frequency and adjusted uses
    const calculatedDaysLasting = Math.floor(adjustedUses / usageFrequency);
    
    // Calculate cost per day
    const calculatedCostPerDay = selectedProduct.price / calculatedDaysLasting;
    
    // Calculate cost per use
    const calculatedCostPerUse = selectedProduct.price / adjustedUses;
    
    // Calculate value score (0-100)
    // Higher score means better value (lower cost per use, longer lasting)
    const baseValueScore = 50;
    const priceValueRatio = (selectedProduct.actualUses / selectedProduct.price) * 10;
    const daysValue = calculatedDaysLasting / 15; // Normalize to 0-100 scale
    let calculatedValueScore = baseValueScore + (priceValueRatio * 3) + (daysValue * 2);
    calculatedValueScore = Math.min(100, Math.max(0, calculatedValueScore));
    
    setDaysLasting(calculatedDaysLasting);
    setCostPerDay(calculatedCostPerDay);
    setCostPerUse(calculatedCostPerUse);
    setValueScore(calculatedValueScore);
  };

  const recalculate = () => {
    setIsRecalculating(true);
    calculateMetrics();
    
    setTimeout(() => {
      setIsRecalculating(false);
    }, 800);
  };

  const getValueScoreColor = () => {
    if (valueScore >= 80) return "text-green-600 bg-green-100 border-green-200";
    if (valueScore >= 60) return "text-blue-600 bg-blue-100 border-blue-200";
    if (valueScore >= 40) return "text-amber-600 bg-amber-100 border-amber-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
      <CardHeader className="py-4 px-5 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg font-medium text-blue-800">Interactive Value Calculator</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 h-8 w-8"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-4 pb-5 px-5">
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-medium text-blue-600 mb-2">Select Product</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {productOptions.map((product) => (
                  <Button
                    key={product.name}
                    variant={selectedProduct.name === product.name ? "default" : "outline"}
                    size="sm"
                    className={`text-sm h-auto py-2 px-3 justify-start ${
                      selectedProduct.name === product.name 
                        ? "bg-blue-600 text-white" 
                        : "text-blue-800 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs flex gap-2 items-center">
                        <span className="opacity-80">{product.size}</span>
                        <span className="font-medium">£{product.price}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="bg-blue-100" />

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-600">Usage Frequency</h3>
                  <span className="text-sm font-medium">
                    {usageFrequency} {usageFrequency === 1 ? "time" : "times"} per day
                  </span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[usageFrequency]}
                  onValueChange={(value) => setUsageFrequency(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-blue-400 px-2">
                  <span>Once daily</span>
                  <span>Multiple times</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-sm font-medium text-blue-600">Product Amount Used</h3>
                  <span className="text-sm font-medium">
                    {usageAmount === 1 ? "Very little" :
                     usageAmount === 2 ? "Minimal" :
                     usageAmount === 3 ? "Average" :
                     usageAmount === 4 ? "Generous" : "Maximum"}
                  </span>
                </div>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={[usageAmount]}
                  onValueChange={(value) => setUsageAmount(value[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-blue-400 px-2">
                  <span>Very little</span>
                  <span>Maximum amount</span>
                </div>
              </div>
            </div>

            <Separator className="bg-blue-100" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-blue-700">Value Metrics Results</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={recalculate}
                  disabled={isRecalculating}
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRecalculating ? "animate-spin" : ""}`} />
                  <span>Recalculate</span>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-md border border-blue-100 bg-blue-50 p-3 flex flex-col items-center justify-center text-center">
                  <DollarSign className="h-4 w-4 text-blue-600 mb-1" />
                  <div className="text-xs text-blue-600 mb-1">Cost per Day</div>
                  <div className="font-medium text-md">£{costPerDay.toFixed(2)}</div>
                </div>

                <div className="rounded-md border border-blue-100 bg-blue-50 p-3 flex flex-col items-center justify-center text-center">
                  <Calculator className="h-4 w-4 text-blue-600 mb-1" />
                  <div className="text-xs text-blue-600 mb-1">Cost per Use</div>
                  <div className="font-medium text-md">£{costPerUse.toFixed(2)}</div>
                </div>

                <div className="rounded-md border border-blue-100 bg-blue-50 p-3 flex flex-col items-center justify-center text-center">
                  <Clock className="h-4 w-4 text-blue-600 mb-1" />
                  <div className="text-xs text-blue-600 mb-1">Days Lasting</div>
                  <div className="font-medium text-md">{daysLasting} days</div>
                </div>

                <div className="rounded-md border border-blue-100 bg-blue-50 p-3 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className={`absolute bottom-0 left-0 h-1 bg-blue-600`} style={{ width: `${valueScore}%` }}></div>
                  <div className="text-xs text-blue-600 mb-1">Value Score</div>
                  <div className="font-medium text-md flex items-center justify-center">
                    <Badge className={`font-normal px-2 py-0.5 ${getValueScoreColor()}`}>
                      {Math.round(valueScore)}/100
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 rounded-md p-2.5 border border-gray-100">
              <div className="font-medium mb-1">How this works:</div>
              <p>
                Our AI-powered Value Metrics System analyzes internet data to determine actual product 
                usage patterns. Estimated vs. actual uses often differ significantly, which impacts the 
                true value calculation. Adjust the sliders to see how your personal usage affects value.
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const productOptions: ProductOption[] = [
  {
    name: "Luxury Face Serum",
    price: 85,
    size: "30ml",
    estimatedUses: 60,
    actualUses: 87
  },
  {
    name: "Premium Moisturizer",
    price: 65,
    size: "50ml",
    estimatedUses: 45,
    actualUses: 52
  },
  {
    name: "Hydration Cream",
    price: 48,
    size: "75ml",
    estimatedUses: 90,
    actualUses: 106
  }
];

export default InteractiveValueCalculator;
