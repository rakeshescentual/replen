
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Calculator, LineChart, DollarSign, Clock } from "lucide-react";

const ValueMetricsOverview = () => {
  return (
    <section className="space-y-6">
      <section>
        <Heading className="text-xl font-semibold mb-3">How Value Metrics Work</Heading>
        <Text className="mb-4">
          Our Value Metrics System combines multiple data sources to give customers a comprehensive
          understanding of product value beyond the initial price tag:
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Heading className="text-lg font-medium mb-1">Cost-Per-Use Calculation</Heading>
                <Text className="text-sm">
                  We calculate the actual cost-per-use based on product lifespan, frequency of use,
                  and amount used per application.
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <Heading className="text-lg font-medium mb-1">Product Longevity</Heading>
                <Text className="text-sm">
                  We track how long products typically last based on customer data, reviews,
                  and internet data mining.
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <LineChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <Heading className="text-lg font-medium mb-1">Comparative Value</Heading>
                <Text className="text-sm">
                  We compare similar products across price points to identify where the true value lies.
                </Text>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <Heading className="text-lg font-medium mb-1">Total Cost of Ownership</Heading>
                <Text className="text-sm">
                  We analyze the complete cost including refills, complementary products, and replacement frequency.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <Heading className="text-xl font-semibold mb-3">Value Metric Factors</Heading>
        <Text className="mb-4">
          Our comprehensive value assessment includes the following factors:
        </Text>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Product Lifespan</span>
            <p className="text-gray-600 mt-1">
              How long the product lasts before needing replacement, measured in days or uses.
            </p>
          </li>
          <li>
            <span className="font-medium">Effectiveness</span>
            <p className="text-gray-600 mt-1">
              How well the product performs its intended function compared to alternatives.
            </p>
          </li>
          <li>
            <span className="font-medium">Usage Efficiency</span>
            <p className="text-gray-600 mt-1">
              How much product is needed per application and how frequently it needs to be applied.
            </p>
          </li>
          <li>
            <span className="font-medium">Secondary Benefits</span>
            <p className="text-gray-600 mt-1">
              Additional benefits beyond the primary function, such as multi-use capabilities.
            </p>
          </li>
          <li>
            <span className="font-medium">Customer Satisfaction</span>
            <p className="text-gray-600 mt-1">
              How satisfied customers are with the product relative to its cost, based on reviews and feedback.
            </p>
          </li>
          <li>
            <span className="font-medium">Internet Sentiment Analysis</span>
            <p className="text-gray-600 mt-1">
              Aggregated opinions and experiences from across the web, forums, and social media.
            </p>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default ValueMetricsOverview;
