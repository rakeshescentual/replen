
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Globe, Search, Database, Shield, Zap, BarChart } from "lucide-react";
import InfoCard from "./InfoCard";

const InternetDataMiningInfo = () => {
  return (
    <div className="space-y-6">
      <Heading className="text-xl font-semibold mb-3">Internet Data Mining</Heading>
      <Text className="mb-4">
        Our Value Metrics System leverages advanced internet data mining technology to gather and analyze 
        product information across the web, providing customers with accurate, data-driven insights.
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard 
          icon={Globe}
          title="Comprehensive Web Coverage"
          description="Our system crawls thousands of websites, forums, and social media platforms to gather real-world product usage data."
          variant="primary"
        />
        
        <InfoCard 
          icon={Search}
          title="Smart Data Extraction"
          description="Advanced algorithms identify and extract relevant product information from unstructured text and reviews."
          variant="info"
        />
        
        <InfoCard 
          icon={Shield}
          title="Privacy-First Approach"
          description="All data is anonymized and aggregated, with strict adherence to privacy regulations and ethical data practices."
          variant="success"
        />
        
        <InfoCard 
          icon={Zap}
          title="Real-Time Processing"
          description="Continuous data collection and analysis ensures value metrics stay current with market trends and user experiences."
          variant="warning"
        />
      </div>
      
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <Database className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <Heading className="text-lg font-medium mb-1 text-indigo-800">Data Collection Process</Heading>
            <Text className="text-sm text-indigo-700">
              Our systematic approach ensures comprehensive and accurate data collection:
            </Text>
          </div>
        </div>
        
        <ol className="list-decimal pl-8 space-y-2 text-indigo-700 mt-2">
          <li>Product identification and categorization</li>
          <li>Multi-source web crawling with adaptive targeting</li>
          <li>Natural language processing to extract usage patterns</li>
          <li>Sentiment analysis of product reviews and mentions</li>
          <li>Data validation through cross-referencing multiple sources</li>
          <li>Statistical analysis to establish reliable metrics</li>
          <li>Continuous monitoring for data freshness</li>
        </ol>
      </Card>
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
        <div className="flex items-start gap-3 mb-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <BarChart className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <Heading className="text-lg font-medium mb-1 text-amber-800">Data Mining Results</Heading>
            <Text className="text-sm text-amber-700">
              Our internet data mining provides key insights that traditional value assessment methods miss:
            </Text>
          </div>
        </div>
        
        <ul className="list-disc pl-6 space-y-2 text-amber-700 mt-2">
          <li>Actual product longevity compared to manufacturer claims</li>
          <li>Common usage patterns across different customer segments</li>
          <li>Real-world effectiveness for different skin types and conditions</li>
          <li>Unexpected benefits or drawbacks not mentioned in official descriptions</li>
          <li>Comparative performance against similar products in the market</li>
          <li>Optimum usage quantities for maximum effectiveness</li>
        </ul>
      </div>
    </div>
  );
};

export default InternetDataMiningInfo;
