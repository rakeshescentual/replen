
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { AlertCircle, Globe, Database, TrendingUp, Search } from "lucide-react";

const ValueMetricsCrawlingInfo = () => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
      <Heading className="text-xl font-semibold mb-3 text-blue-800 flex items-center">
        <Globe className="h-5 w-5 mr-2 text-blue-600" />
        Internet Data Mining
      </Heading>
      <Text className="text-blue-700 mb-4">
        Our sophisticated data mining technology crawls the internet to collect and analyze product information from various sources:
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4 bg-white/80 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Heading className="text-lg font-medium mb-1">Crawling Methodology</Heading>
              <Text className="text-sm">
                Our web crawlers systematically search beauty forums, review sites, social media, and e-commerce platforms to collect authentic customer experiences and product information.
              </Text>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Heading className="text-lg font-medium mb-1">Data Analysis</Heading>
              <Text className="text-sm">
                We process thousands of data points using natural language processing to extract key insights about product longevity, effectiveness, and customer satisfaction.
              </Text>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Heading className="text-lg font-medium mb-1">Sentiment Analysis</Heading>
              <Text className="text-sm">
                Our AI analyzes text to determine positive, negative, or neutral sentiment about products, creating a comprehensive view of real customer experiences.
              </Text>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <Heading className="text-lg font-medium mb-1">Privacy Compliance</Heading>
              <Text className="text-sm">
                All data mining follows GDPR and privacy best practices. We only collect publicly available information and anonymize all data to protect privacy.
              </Text>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-white/80 p-4 rounded-lg border border-blue-200">
        <Heading className="text-lg font-medium mb-2">How Data Mining Enhances Value Metrics</Heading>
        <ul className="list-disc pl-6 space-y-1 text-blue-700">
          <li>
            <span className="font-medium">Accurate Lifespan Estimation:</span> Real-world usage data provides more accurate product lifespan estimates than manufacturer claims alone
          </li>
          <li>
            <span className="font-medium">Satisfaction Verification:</span> Verifies customer satisfaction claims across multiple platforms and sources
          </li>
          <li>
            <span className="font-medium">Usage Pattern Recognition:</span> Identifies how customers actually use products in their routines
          </li>
          <li>
            <span className="font-medium">Comparative Analysis:</span> Helps compare similar products based on aggregated internet sentiment and reported results
          </li>
          <li>
            <span className="font-medium">Trend Identification:</span> Spots emerging trends in product usage and effectiveness over time
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ValueMetricsCrawlingInfo;
