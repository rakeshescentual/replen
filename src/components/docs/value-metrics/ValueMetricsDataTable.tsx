
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Info, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ValueMetricsDataItem {
  category: string;
  product: string;
  costPerUse: string;
  lifespan: string;
  valueIndex: number;
  dataPoints: number;
}

const sampleData: ValueMetricsDataItem[] = [
  {
    category: "Moisturizer",
    product: "Hydra-Boost Cream",
    costPerUse: "£0.42",
    lifespan: "87 days",
    valueIndex: 92,
    dataPoints: 1256
  },
  {
    category: "Serum",
    product: "Vitamin C Brightening",
    costPerUse: "£0.78",
    lifespan: "62 days",
    valueIndex: 86,
    dataPoints: 978
  },
  {
    category: "Cleanser",
    product: "Gentle Foaming Wash",
    costPerUse: "£0.25",
    lifespan: "112 days",
    valueIndex: 95,
    dataPoints: 1523
  },
  {
    category: "Toner",
    product: "Balancing Hydrator",
    costPerUse: "£0.32",
    lifespan: "94 days",
    valueIndex: 89,
    dataPoints: 1087
  },
  {
    category: "Mask",
    product: "Overnight Repair",
    costPerUse: "£1.12",
    lifespan: "75 days",
    valueIndex: 81,
    dataPoints: 764
  }
];

const ValueMetricsDataTable = () => {
  return (
    <Card className="p-5 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <Heading className="text-lg font-medium">Value Metrics Sample Data</Heading>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-64 text-sm">
                This table shows sample value metrics data collected through our internet data mining system. 
                Actual product data may vary based on real-time analysis.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Cost Per Use</TableHead>
              <TableHead>Lifespan</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Value Index
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3.5 w-3.5 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-48 text-xs">
                          Value Index is a proprietary score from 0-100 that combines cost-effectiveness, 
                          longevity, and performance metrics.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableHead>
              <TableHead>Data Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.costPerUse}</TableCell>
                <TableCell>{item.lifespan}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-14 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.valueIndex > 90 ? 'bg-green-500' : 
                          item.valueIndex > 80 ? 'bg-blue-500' : 
                          item.valueIndex > 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${item.valueIndex}%` }}
                      />
                    </div>
                    <span>{item.valueIndex}</span>
                  </div>
                </TableCell>
                <TableCell>{item.dataPoints.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Text className="text-xs text-gray-500 mt-3">
        Data is collected from multiple internet sources including product reviews, 
        forums, and social media mentions. Updated daily.
      </Text>
    </Card>
  );
};

export default ValueMetricsDataTable;
