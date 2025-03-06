
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";
import { AlertCircle, Globe, Database, TrendingUp, Search } from "lucide-react";
import InfoCard from "./InfoCard";
import ValueMetricsBenefits from "./ValueMetricsBenefits";

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
        <InfoCard 
          icon={Search}
          title="Crawling Methodology"
          description="Our web crawlers systematically search beauty forums, review sites, social media, and e-commerce platforms to collect authentic customer experiences and product information."
        />

        <InfoCard 
          icon={Database}
          title="Data Analysis"
          description="We process thousands of data points using natural language processing to extract key insights about product longevity, effectiveness, and customer satisfaction."
        />

        <InfoCard 
          icon={TrendingUp}
          title="Sentiment Analysis"
          description="Our AI analyzes text to determine positive, negative, or neutral sentiment about products, creating a comprehensive view of real customer experiences."
        />

        <InfoCard 
          icon={AlertCircle}
          title="Privacy Compliance"
          description="All data mining follows GDPR and privacy best practices. We only collect publicly available information and anonymize all data to protect privacy."
        />
      </div>

      <ValueMetricsBenefits />
    </div>
  );
};

export default ValueMetricsCrawlingInfo;
