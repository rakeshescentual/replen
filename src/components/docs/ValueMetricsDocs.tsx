import React from "react";
import { Card, Heading, Texttypescript
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, LineChart, BarChart, DollarSign, Clock } from "lucide-react";
import ValueMetricsCrawlingInfo from "./ValueMetricsCrawlingInfo";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Value Metrics System</Heading>
        <Text className="mb-6">
          The Value Metrics System helps Escentual.com customers understand the true value of premium beauty products
          through sophisticated metrics that go beyond price tags.
        </Text>

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
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="cost-per-use" className="space-y-6">
            <section>
              <Heading className="text-xl font-semibold mb-3">Cost-Per-Use Metrics</Heading>
              <Text className="mb-4">
                Understand the true cost of your beauty products with our cost-per-use analysis.
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Calculation Factors</Heading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Product Price</li>
                    <li>Estimated Lifespan (days)</li>
                    <li>Average Uses Per Week</li>
                    <li>Amount Used Per Application</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Example Calculation</Heading>
                  <Text className="text-sm">
                    Product Price: $50
                    <br />
                    Estimated Lifespan: 90 days
                    <br />
                    Average Uses Per Week: 7
                    <br />
                    Amount Used Per Application: 2ml
                    <br />
                    <br />
                    Cost Per Use: $0.56
                  </Text>
                </Card>
              </div>
            </section>

            <section>
              <Heading className="text-xl font-semibold mb-3">Benefits of Cost-Per-Use Analysis</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Informed Purchase Decisions</span>
                  <p className="text-gray-600 mt-1">
                    Make smarter buying choices based on long-term value, not just initial price.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Budget Optimization</span>
                  <p className="text-gray-600 mt-1">
                    Allocate your beauty budget more effectively by identifying the most cost-efficient products.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Value Discovery</span>
                  <p className="text-gray-600 mt-1">
                    Uncover hidden value in premium products that offer a lower cost-per-use than cheaper alternatives.
                  </p>
                </li>
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="longevity" className="space-y-6">
            <section>
              <Heading className="text-xl font-semibold mb-3">Product Longevity Metrics</Heading>
              <Text className="mb-4">
                Understand how long your beauty products will last with our longevity metrics.
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Tracking Methods</Heading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Customer Purchase History</li>
                    <li>Product Usage Data</li>
                    <li>Internet Data Mining</li>
                    <li>Expert Reviews</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Example Longevity Data</Heading>
                  <Text className="text-sm">
                    Foundation: 3-6 months
                    <br />
                    Mascara: 2-3 months
                    <br />
                    Serum: 1-2 months
                    <br />
                    Moisturizer: 2-4 months
                  </Text>
                </Card>
              </div>
            </section>

            <section>
              <Heading className="text-xl font-semibold mb-3">Benefits of Longevity Metrics</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Accurate Replenishment Planning</span>
                  <p className="text-gray-600 mt-1">
                    Plan your purchases more accurately based on how long products typically last.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Subscription Optimization</span>
                  <p className="text-gray-600 mt-1">
                    Optimize subscription frequencies to ensure you never run out of your favorite products.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Waste Reduction</span>
                  <p className="text-gray-600 mt-1">
                    Reduce product waste by understanding when products are likely to expire.
                  </p>
                </li>
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <section>
              <Heading className="text-xl font-semibold mb-3">Value Comparison Analysis</Heading>
              <Text className="mb-4">
                Compare the value of similar products to make informed purchase decisions.
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Comparison Factors</Heading>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Price</li>
                    <li>Product Lifespan</li>
                    <li>Customer Ratings</li>
                    <li>Internet Sentiment</li>
                    <li>Cost-Per-Use</li>
                  </ul>
                </Card>

                <Card className="p-4">
                  <Heading className="text-lg font-medium mb-2">Example Comparison</Heading>
                  <Text className="text-sm">
                    Product A: $40, 4 months lifespan, 4.5 stars
                    <br />
                    Product B: $30, 2 months lifespan, 4 stars
                    <br />
                    <br />
                    Value Analysis: Product A offers better long-term value.
                  </Text>
                </Card>
              </div>
            </section>

            <section>
              <Heading className="text-xl font-semibold mb-3">Benefits of Value Comparison</Heading>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Smart Spending</span>
                  <p className="text-gray-600 mt-1">
                    Ensure you're getting the best value for your money by comparing similar products.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Informed Choices</span>
                  <p className="text-gray-600 mt-1">
                    Make informed decisions based on a comprehensive value analysis.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Long-Term Savings</span>
                  <p className="text-gray-600 mt-1">
                    Identify products that offer better long-term value and save you money over time.
                  </p>
                </li>
              </ul>
            </section>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
