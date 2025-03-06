
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";

const ValueComparisonAnalysis = () => {
  return (
    <section className="space-y-6">
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
    </section>
  );
};

export default ValueComparisonAnalysis;
