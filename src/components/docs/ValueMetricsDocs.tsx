
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart, BarChart, DollarSign, Clock, Sparkles, BarChartHorizontal, Star, Info } from "lucide-react";
import ValueMetricsCrawlingInfo from "./value-metrics/ValueMetricsCrawlingInfo";
import ValueMetricsOverview from "./value-metrics/ValueMetricsOverview";
import CostPerUseMetrics from "./value-metrics/CostPerUseMetrics";
import ProductLongevityMetrics from "./value-metrics/ProductLongevityMetrics";
import ValueComparisonAnalysis from "./value-metrics/ValueComparisonAnalysis";
import ValueMetricsBenefits from "./value-metrics/ValueMetricsBenefits";
import ValueMetricsRealWorldExamples from "./value-metrics/ValueMetricsRealWorldExamples";
import InteractiveValueCalculator from "./value-metrics/InteractiveValueCalculator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6 border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <Heading className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
            Value Metrics System
          </Heading>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Info className="h-3.5 w-3.5 mr-1.5" />
            AI-Enhanced
          </Badge>
        </div>
        
        <Text className="mb-6 text-gray-600 max-w-3xl">
          The Value Metrics System helps Escentual.com customers understand the true value of premium beauty products
          through sophisticated metrics that go beyond price tags. Our calculations combine real-world data with actual customer usage patterns.
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <ValueMetricsBenefits />
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <InteractiveValueCalculator />
          </div>
        </div>

        <div className="mb-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <ValueMetricsCrawlingInfo />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
              <BarChartHorizontal size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="cost-per-use" className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
              <Calculator size={16} />
              <span>Cost-Per-Use</span>
            </TabsTrigger>
            <TabsTrigger value="longevity" className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
              <Clock size={16} />
              <span>Product Longevity</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
              <LineChart size={16} />
              <span>Value Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md">
              <Star size={16} />
              <span>Real Examples</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in">
            <ValueMetricsOverview />
          </TabsContent>

          <TabsContent value="cost-per-use" className="animate-fade-in">
            <CostPerUseMetrics />
          </TabsContent>

          <TabsContent value="longevity" className="animate-fade-in">
            <ProductLongevityMetrics />
          </TabsContent>

          <TabsContent value="comparison" className="animate-fade-in">
            <ValueComparisonAnalysis />
          </TabsContent>
          
          <TabsContent value="examples" className="animate-fade-in">
            <ValueMetricsRealWorldExamples />
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <Button 
            variant="outline" 
            className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            onClick={() => window.open('/internet-data-analysis', '_blank')}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Try Internet Data Mining
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
