
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";

const ProductLongevityMetrics = () => {
  return (
    <section className="space-y-6">
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
    </section>
  );
};

export default ProductLongevityMetrics;
