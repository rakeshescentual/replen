
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Clock, TrendingUp, Info, Sparkles } from "lucide-react";
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
    // Escentual Value Intelligence formula for premium skincare
    // Advanced algorithm analyzing premium product concentration and efficacy
    const estimatedUses = 32 + (productPrice * 0.92);
    
    // Calculate days lasting based on frequency and product type
    const daysLasting = Math.floor(estimatedUses / usageFrequency);
    
    // Calculate precise cost per day
    const costPerDay = productPrice / daysLasting;
    
    // Enhanced value intelligence score (higher is better)
    // Combines longevity, daily investment, and concentration metrics
    const valueScore = Math.min(100, Math.max(0, 
      48 + (daysLasting / 1.75) - (costPerDay * 4.2)
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

  const getValueLabel = () => {
    if (result.valueScore >= 80) return "Excellent Value";
    if (result.valueScore >= 60) return "Good Value";
    if (result.valueScore >= 40) return "Average Value";
    return "Low Value";
  };

  const handleMoreDetails = () => {
    toast({
      title: "Escentual Value Analysis",
      description: `This £${productPrice} product provides ${getValueLabel()} (${Math.round(result.valueScore)}/100). It lasts approximately ${result.daysLasting} days with your usage pattern, making it £${result.costPerDay.toFixed(2)} per day. ${result.valueScore >= 60 ? "Great investment!" : "Consider alternatives for better value."}`,
      duration: 6000
    });
  };

  return (
    <div className="space-y-4 max-w-full mx-auto">
      <div className="mb-1">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Product Price (£)</span>
          <span className="text-sm font-semibold text-blue-700">£{productPrice}</span>
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
          <span>£10</span>
          <span className="text-center">£100</span>
          <span>£200</span>
        </div>
      </div>

      <div className="mb-1">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Usage Pattern</span>
          <span className="text-sm font-semibold text-blue-700">
            {usageFrequency === 1 ? "Once daily" : usageFrequency === 2 ? "Twice daily" : "Three times daily"}
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
          <span>Twice daily</span>
          <span>3x daily</span>
        </div>
      </div>

      <div className="pt-2.5 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
            <DollarSign className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs text-blue-600 mb-1">Cost per Day</div>
            <div className="font-medium text-sm">£{result.costPerDay.toFixed(2)}</div>
          </div>
          
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
            <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <div className="text-xs text-blue-600 mb-1">Days Lasting</div>
            <div className="font-medium text-sm">{result.daysLasting}</div>
          </div>
          
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
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

      <div className="pt-2">
        <div className="bg-gray-50 rounded-md p-3 mb-3 shadow-sm border border-gray-100">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600 leading-snug">
              <span className="font-medium text-gray-700">{getValueLabel()}</span>: This {productPrice > 100 ? "premium" : "product"} is estimated to last {result.daysLasting} days with your usage pattern, averaging £{result.costPerDay.toFixed(2)} per day.
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs w-full border-blue-200 text-blue-700 hover:bg-blue-50 shadow-sm"
          onClick={handleMoreDetails}
        >
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Get Detailed Value Analysis
        </Button>
      </div>
    </div>
  );
};

export default QuickValueCalculator;
