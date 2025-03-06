
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { BarChart, LineChart, PieChart, Database, Search } from "lucide-react";

interface InsightItemProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

const InsightItem: React.FC<InsightItemProps> = ({ 
  title, 
  value, 
  change,
  isPositive = true 
}) => {
  return (
    <div className="p-3 border border-gray-100 rounded-md">
      <Text className="text-xs text-gray-500 uppercase font-medium mb-1">{title}</Text>
      <div className="flex items-end justify-between">
        <Text className="text-xl font-bold">{value}</Text>
        {change && (
          <Text className={`text-xs font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}{change}
          </Text>
        )}
      </div>
    </div>
  );
};

const DataInsightsPanel = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Heading className="text-lg font-medium">Value Metrics Data Insights</Heading>
        <div className="text-sm text-gray-500">Last updated: Today</div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightItem 
          title="Avg. Cost Per Use" 
          value="£0.42" 
          change="12%" 
          isPositive={false} 
        />
        <InsightItem 
          title="Avg. Product Longevity" 
          value="127 days" 
          change="8%" 
          isPositive={true} 
        />
        <InsightItem 
          title="Data Sources Analyzed" 
          value="1,234" 
        />
        <InsightItem 
          title="Value Score" 
          value="86/100" 
          change="4%" 
          isPositive={true} 
        />
      </div>
      
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Database className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <Heading className="text-lg font-medium mb-1 text-blue-800">
              Data Quality Metrics
            </Heading>
            <Text className="text-sm text-blue-700">
              Our internet data mining system collects and analyzes data from multiple sources to ensure reliable value metrics.
            </Text>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="flex items-center gap-2 bg-white/60 p-2 rounded border border-blue-100">
            <Search className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium">3,712</div>
              <div className="text-xs text-gray-500">Product Reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2 rounded border border-blue-100">
            <BarChart className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium">92%</div>
              <div className="text-xs text-gray-500">Data Confidence</div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/60 p-2 rounded border border-blue-100">
            <PieChart className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-sm font-medium">274</div>
              <div className="text-xs text-gray-500">Websites Analyzed</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DataInsightsPanel;
