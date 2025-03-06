
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickCalcResult {
  costPerDay: number;
  daysLasting: number;
  valueScore: number;
}

const QuickValueCalculator = () => {
  const { toast } = useToast();
  const [productPrice, setProductPrice] = useState(45);
  const [usageFrequency, setUsageFrequency] = useState(1); // times per day
  const [result, setResult] = useState<QuickCalcResult>({
    costPerDay: 0,
    daysLasting: 0,
    valueScore: 0
  });

  useEffect(() => {
    calculateValue();
  }, [productPrice, usageFrequency]);

  const calculateValue = () => {
    // Estimated uses based on product price (higher price often means more concentrated/effective products)
    const estimatedUses = 40 + (productPrice * 0.8);
    
    // Calculate days lasting based on frequency
    const daysLasting = Math.floor(estimatedUses / usageFrequency);
    
    // Calculate cost per day
    const costPerDay = productPrice / daysLasting;
    
    // Value score calculation (higher is better)
    // Based on days lasting and cost efficiency
    const valueScore = Math.min(100, Math.max(0, 
      50 + (daysLasting / 2) - (costPerDay * 5)
    ));
    
    setResult({
      costPerDay,
      daysLasting,
      valueScore
    });
  };

  const getValueScoreColor = () => {
    if (result.valueScore >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (result.valueScore >= 60) return "bg-blue-100 text-blue-800 border-blue-200";
    if (result.valueScore >= 40) return "bg-amber-100 text-amber-800 border-amber-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const handleMoreDetails = () => {
    toast({
      title: "Value Analysis",
      description: `This £${productPrice} product offers a value score of ${Math.round(result.valueScore)}/100 based on cost per day and longevity.`,
      duration: 5000
    });
  };

  return (
    <div className="space-y-4 max-w-full mx-auto">
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Product Price</span>
          <span className="text-sm font-medium">£{productPrice}</span>
        </div>
        <Slider
          min={10}
          max={200}
          step={5}
          value={[productPrice]}
          onValueChange={(value) => setProductPrice(value[0])}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Budget</span>
          <span>Premium</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Usage Frequency</span>
          <span className="text-sm font-medium">
            {usageFrequency} {usageFrequency === 1 ? "time" : "times"} per day
          </span>
        </div>
        <Slider
          min={1}
          max={3}
          step={1}
          value={[usageFrequency]}
          onValueChange={(value) => setUsageFrequency(value[0])}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Once daily</span>
          <span>Multiple times</span>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center">
            <DollarSign className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs text-blue-600 mb-1">Cost per Day</div>
            <div className="font-medium text-sm">£{result.costPerDay.toFixed(2)}</div>
          </div>
          
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center">
            <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs text-blue-600 mb-1">Days Lasting</div>
            <div className="font-medium text-sm">{result.daysLasting}</div>
          </div>
          
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center">
            <TrendingUp className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs text-blue-600 mb-1">Value Score</div>
            <div className="font-medium text-sm">
              <Badge className={`font-normal px-1.5 ${getValueScoreColor()}`}>
                {Math.round(result.valueScore)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs w-full"
          onClick={handleMoreDetails}
        >
          <Calculator className="h-3.5 w-3.5 mr-1.5" />
          Get Detailed Analysis
        </Button>
      </div>
    </div>
  );
};

export default QuickValueCalculator;
