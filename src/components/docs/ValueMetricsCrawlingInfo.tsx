
import React from 'react';
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Bug, Globe, LineChart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ValueMetricsCrawlingInfo = () => {
  return (
    <Card className="p-6 mb-6">
      <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Bug className="h-5 w-5 text-purple-600" />
        Internet Data Mining for Value Metrics
      </Heading>
      
      <Text className="mb-4">
        Our system enhances value metrics by crawling the internet for product information, 
        review data, and customer sentiment. This provides a more comprehensive understanding 
        of product value beyond internal data.
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-800">Web Crawling</span>
          </div>
          <p className="text-sm text-purple-700">
            Extract structured product data from websites, forums, and review platforms to 
            enhance value metrics calculations with real-world usage patterns.
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Search className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Sentiment Analysis</span>
          </div>
          <p className="text-sm text-blue-700">
            Analyze customer reviews and forum discussions to understand perceived value 
            and incorporate emotional factors into value calculations.
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <LineChart className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">Competitive Analysis</span>
          </div>
          <p className="text-sm text-green-700">
            Compare product lifespans, pricing, and value metrics across competitors 
            to position Escentual products effectively in the market.
          </p>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <Bug className="h-4 w-4 text-amber-600" />
            <span className="font-medium text-amber-800">Usage Pattern Discovery</span>
          </div>
          <p className="text-sm text-amber-700">
            Discover how customers actually use products in real-world settings to 
            refine product lifespan estimates and value calculations.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link 
          to="/internet-data-crawling" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Bug className="h-4 w-4" />
          <span>Try Web Crawling Tool</span>
        </Link>
      </div>
    </Card>
  );
};

export default ValueMetricsCrawlingInfo;
