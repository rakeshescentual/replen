
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart, BarChart, DollarSign, Clock, Sparkles } from "lucide-react";
import ValueMetricsCrawlingInfo from "./value-metrics/ValueMetricsCrawlingInfo";
import ValueMetricsOverview from "./value-metrics/ValueMetricsOverview";
import CostPerUseMetrics from "./value-metrics/CostPerUseMetrics";
import ProductLongevityMetrics from "./value-metrics/ProductLongevityMetrics";
import ValueComparisonAnalysis from "./value-metrics/ValueComparisonAnalysis";
import ValueMetricsBenefits from "./value-metrics/ValueMetricsBenefits";
import ValueMetricsRealWorldExamples from "./value-metrics/ValueMetricsRealWorldExamples";
import InteractiveValueCalculator from "./value-metrics/InteractiveValueCalculator";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Value Metrics System</Heading>
        <Text className="mb-6">
          The Value Metrics System helps Escentual.com customers understand the true value of premium beauty products
          through sophisticated metrics that go beyond price tags.
        </Text>

        <div className="mb-6">
          <ValueMetricsBenefits />
        </div>

        <div className="mb-6">
          <InteractiveValueCalculator />
        </div>

        <ValueMetricsCrawlingInfo />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 bg-gray-100">
            <TabsTrigger value="overview" className="flex items-center gap-1.5">
              <BarChart size={16} />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="cost-per-use" className="flex items-center gap-1.5">
              <Calculator size={16} />
              <span>Cost-Per-Use</span>
            </TabsTrigger>
            <TabsTrigger value="longevity" className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>Product Longevity</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-1.5">
              <LineChart size={16} />
              <span>Value Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-1.5">
              <Sparkles size={16} />
              <span>Real Examples</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ValueMetricsOverview />
          </TabsContent>

          <TabsContent value="cost-per-use">
            <CostPerUseMetrics />
          </TabsContent>

          <TabsContent value="longevity">
            <ProductLongevityMetrics />
          </TabsContent>

          <TabsContent value="comparison">
            <ValueComparisonAnalysis />
          </TabsContent>
          
          <TabsContent value="examples">
            <ValueMetricsRealWorldExamples />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
