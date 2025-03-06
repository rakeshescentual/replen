
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, TrendingUp, Sparkles, DollarSign } from "lucide-react";

const ValueMetricsRealWorldExamples = () => {
  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-medium text-blue-800 flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
        Real-World Value Metrics Examples
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ExampleCard 
          title="Premium Face Serum"
          price="£85.00"
          retailEstimate="30 days"
          actualUsage="45 days"
          costPerUse="£1.89/day"
          dataSources={24}
          confidenceScore={92}
          valueScore={87}
          type="luxury"
        />
        
        <ExampleCard 
          title="Anti-Aging Moisturizer"
          price="£65.00"
          retailEstimate="60 days"
          actualUsage="52 days"
          costPerUse="£1.25/day"
          dataSources={36}
          confidenceScore={89}
          valueScore={78}
          type="premium"
        />
        
        <ExampleCard 
          title="Hydrating Night Cream"
          price="£48.00"
          retailEstimate="45 days"
          actualUsage="60 days"
          costPerUse="£0.80/day"
          dataSources={19}
          confidenceScore={85}
          valueScore={94}
          type="value"
        />
        
        <ExampleCard 
          title="Vitamin C Serum"
          price="£72.00"
          retailEstimate="60 days"
          actualUsage="75 days"
          costPerUse="£0.96/day"
          dataSources={42}
          confidenceScore={96}
          valueScore={91}
          type="best-value"
        />
      </div>
      
      <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded-md border border-blue-100">
        <div className="font-medium mb-1 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1.5" />
          How We Calculate These Metrics:
        </div>
        <ul className="list-disc pl-5 space-y-1">
          <li>We crawl beauty forums, social media, and review sites to gather real-world usage data</li>
          <li>Our AI analyzes thousands of customer reports about how long products actually last</li>
          <li>Sentiment analysis identifies satisfaction levels and perceived value</li>
          <li>Confidence score reflects the amount and consistency of data available</li>
          <li>Value score combines longevity, cost-per-use, and customer satisfaction</li>
        </ul>
      </div>
    </div>
  );
};

interface ExampleCardProps {
  title: string;
  price: string;
  retailEstimate: string;
  actualUsage: string;
  costPerUse: string;
  dataSources: number;
  confidenceScore: number;
  valueScore: number;
  type: 'luxury' | 'premium' | 'value' | 'best-value';
}

const ExampleCard: React.FC<ExampleCardProps> = ({
  title,
  price,
  retailEstimate,
  actualUsage,
  costPerUse,
  dataSources,
  confidenceScore,
  valueScore,
  type
}) => {
  const getBadgeVariant = () => {
    switch(type) {
      case 'luxury': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'premium': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'value': return "bg-green-100 text-green-800 border-green-200";
      case 'best-value': return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getTypeName = () => {
    switch(type) {
      case 'luxury': return "Luxury";
      case 'premium': return "Premium";
      case 'value': return "Great Value";
      case 'best-value': return "Best Value";
      default: return "Standard";
    }
  };
  
  return (
    <Card className="border overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-md font-medium">{title}</CardTitle>
            <p className="text-blue-700 flex items-center mt-1">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="font-medium">{price}</span>
            </p>
          </div>
          <Badge className={`font-normal ${getBadgeVariant()}`}>
            {getTypeName()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-blue-50 rounded p-2">
              <div className="text-xs text-blue-600 mb-1">Manufacturer Claim</div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-700" />
                <span className="font-medium">{retailEstimate}</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded p-2">
              <div className="text-xs text-green-600 mb-1">Actual Usage</div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-green-700" />
                <span className="font-medium">{actualUsage}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs text-gray-500">Cost Per Use</div>
              <div className="text-xs text-gray-500">Value Score</div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calculator className="h-3.5 w-3.5 mr-1.5 text-blue-700" />
                <span className="font-medium">{costPerUse}</span>
              </div>
              <div className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {valueScore}/100
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div>Data sources: {dataSources}</div>
            <div>Confidence: {confidenceScore}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueMetricsRealWorldExamples;
