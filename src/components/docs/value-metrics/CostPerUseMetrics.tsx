
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";

const CostPerUseMetrics = () => {
  return (
    <section className="space-y-6">
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
    </section>
  );
};

export default CostPerUseMetrics;
