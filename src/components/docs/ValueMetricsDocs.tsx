
import React from 'react';
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Calculator, Lightbulb, LineChart, ShoppingBag, Wallet } from "lucide-react";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Value Metrics System</Heading>
        <Text className="mb-6">
          The Value Metrics System analyzes Escentual.com products to provide customers with detailed information 
          about cost efficiency, value comparisons, and subscription recommendations.
        </Text>

        <Alert className="bg-amber-50 border-amber-200 mb-6">
          <BarChart className="h-5 w-5 text-amber-600" />
          <AlertDescription className="text-amber-800">
            All Escentual.com products are automatically analyzed to calculate cost-per-day metrics, value scores, 
            and subscription recommendations to help customers make informed purchasing decisions.
          </AlertDescription>
        </Alert>

        <section className="mb-8">
          <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-blue-600" />
            Cost Analysis Metrics
          </Heading>
          <div className="mb-6">
            <Text className="mb-3">
              The Value Metrics System calculates several key metrics for each Escentual.com product:
            </Text>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Cost Per Day:</span> The daily cost of using a product based on price and estimated lifespan</li>
              <li><span className="font-medium">Value Score:</span> A proprietary score (0-100) combining price, quality, and lifespan</li>
              <li><span className="font-medium">Cost Efficiency:</span> How efficiently the product delivers its intended benefits</li>
              <li><span className="font-medium">Subscription Savings:</span> Potential savings from subscribing vs. one-time purchases</li>
              <li><span className="font-medium">Internet Data Score:</span> Aggregated value assessment based on internet reviews and sentiment</li>
            </ul>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Heading className="text-lg font-medium mb-3">Calculation Methodology</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead>Calculation Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Cost Per Day</TableCell>
                  <TableCell>Product Price ÷ Estimated Lifespan (days)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Value Score</TableCell>
                  <TableCell>Weighted algorithm combining cost efficiency, customer satisfaction, and internet data</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cost Efficiency</TableCell>
                  <TableCell>Comparative metric against category average (higher is better)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Subscription ROI</TableCell>
                  <TableCell>Annual savings from subscription ÷ Annual cost of one-time purchases</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <section className="mb-8">
          <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-green-600" />
            Product Value Comparison
          </Heading>
          <div className="mb-4">
            <Text className="mb-3">
              The system enables meaningful comparisons between similar Escentual.com products:
            </Text>
            <ul className="list-disc pl-6 space-y-2">
              <li>Side-by-side comparisons of similar products by value metrics</li>
              <li>Category benchmarks to identify exceptional value products</li>
              <li>Price-to-quality ratio assessments</li>
              <li>Lifespan-adjusted price comparisons</li>
              <li>Bundle value analysis for complementary products</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <Heading className="text-lg font-medium mb-3 text-green-800">Value Identification Benefits</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Heading className="text-base font-medium mb-2 text-green-700">For Customers</Heading>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>Make more informed purchasing decisions</li>
                  <li>Understand the true cost of products over time</li>
                  <li>Identify the best values within product categories</li>
                  <li>Optimize spending on recurring purchases</li>
                </ul>
              </div>
              <div>
                <Heading className="text-base font-medium mb-2 text-green-700">For Escentual.com</Heading>
                <ul className="list-disc pl-6 space-y-1 text-green-700">
                  <li>Highlight competitive advantages of products</li>
                  <li>Increase subscription conversion rates</li>
                  <li>Improve customer satisfaction and loyalty</li>
                  <li>Enhance product recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-purple-600" />
            Subscription Recommendations
          </Heading>
          <div className="mb-4">
            <Text className="mb-3">
              Based on value metrics, the system provides intelligent subscription recommendations:
            </Text>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-medium">Optimal Interval:</span> AI-calculated ideal subscription frequency based on usage patterns</li>
              <li><span className="font-medium">Value Threshold:</span> Automatic recommendations when subscription offers significant value</li>
              <li><span className="font-medium">Annual Savings:</span> Projected yearly savings from subscription vs. one-time purchases</li>
              <li><span className="font-medium">Payday Alignment:</span> Subscription billing aligned with customer payday schedule</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Heading className="text-lg font-medium mb-3 text-purple-800 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600" />
              Smart Subscription Algorithm
            </Heading>
            <Text className="text-purple-700 mb-3">
              The system intelligently determines when to recommend subscriptions:
            </Text>
            <ol className="list-decimal pl-6 space-y-1 text-purple-700">
              <li>Analyzes customer purchase history to identify repurchase frequency</li>
              <li>Compares against AI-predicted product lifespan</li>
              <li>Calculates potential savings based on subscription discount</li>
              <li>Considers customer payday schedule for optimal billing timing</li>
              <li>Identifies complementary products for bundle subscriptions</li>
              <li>Continuously refines recommendations based on customer feedback</li>
            </ol>
          </div>
        </section>

        <section>
          <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            Cost-Per-Day Analysis
          </Heading>
          <div className="mb-4">
            <Text className="mb-3">
              The Cost-Per-Day analysis provides a standardized way to evaluate product value:
            </Text>
            <ul className="list-disc pl-6 space-y-2">
              <li>Breaks down products by their daily usage cost</li>
              <li>Enables "apples-to-apples" comparisons across different products</li>
              <li>Highlights exceptional values that may have higher upfront costs but lower daily costs</li>
              <li>Personalizes calculations based on individual usage patterns</li>
              <li>Integrates with payday reminder system for budget-conscious replenishment</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Heading className="text-lg font-medium mb-3 text-blue-800">Implementation Examples</Heading>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Type</TableHead>
                  <TableHead>Example Daily Cost Range</TableHead>
                  <TableHead>Insights</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Luxury Skincare Serums</TableCell>
                  <TableCell>£0.50 - £3.00 per day</TableCell>
                  <TableCell>Higher priced products often have more concentrated formulas requiring less product per use</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fragrances</TableCell>
                  <TableCell>£0.20 - £1.50 per day</TableCell>
                  <TableCell>Eau de Parfum typically offers better value than Eau de Toilette despite higher upfront cost</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hair Care</TableCell>
                  <TableCell>£0.10 - £0.80 per day</TableCell>
                  <TableCell>Professional brands often have lower daily costs due to higher concentration and longer product lifespan</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
