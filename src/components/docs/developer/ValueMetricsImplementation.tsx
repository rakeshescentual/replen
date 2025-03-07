
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";

const ValueMetricsImplementation = () => {
  return (
    <div className="space-y-6">
      <section>
        <Heading className="text-xl font-semibold mb-4">Value Metrics Implementation</Heading>
        <Text className="mb-4">
          The Escentual Value Optimization Platform uses a sophisticated algorithm to calculate and represent product value.
        </Text>

        <Heading className="text-lg font-semibold mb-3">Value Score Algorithm</Heading>
        <div className="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
          <pre className="text-sm whitespace-pre-wrap">
{`// Core Value Intelligence Algorithm (VIA)
function calculateValueScore(product, usageFrequency) {
  // Step 1: Calculate estimated total uses
  const estimatedUses = 32 + (product.price * 0.92);
  
  // Step 2: Calculate days lasting based on usage frequency
  const daysLasting = Math.floor(estimatedUses / usageFrequency);
  
  // Step 3: Calculate cost per day
  const costPerDay = product.price / daysLasting;
  
  // Step 4: Calculate value score (higher is better)
  const valueScore = Math.min(100, Math.max(0, 
    48 + (daysLasting / 1.75) - (costPerDay * 4.2)
  ));
  
  // Step 5: Determine value label
  let valueLabel = "Low Value";
  if (valueScore >= 80) valueLabel = "Excellent Value";
  else if (valueScore >= 60) valueLabel = "Good Value";
  else if (valueScore >= 40) valueLabel = "Average Value";
  
  return {
    costPerDay,
    daysLasting,
    valueScore,
    valueLabel,
    estimatedUses
  };
}`}
          </pre>
        </div>

        <Heading className="text-lg font-semibold mb-3">Value Metrics Components</Heading>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Metric</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Description</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Calculation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2 px-4 text-sm font-medium">Cost Per Day</td>
                <td className="py-2 px-4 text-sm">Daily investment in the product</td>
                <td className="py-2 px-4 text-sm font-mono">productPrice / daysLasting</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm font-medium">Days Lasting</td>
                <td className="py-2 px-4 text-sm">Expected product longevity</td>
                <td className="py-2 px-4 text-sm font-mono">estimatedUses / usageFrequency</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm font-medium">Value Score</td>
                <td className="py-2 px-4 text-sm">Overall value rating (0-100)</td>
                <td className="py-2 px-4 text-sm font-mono">48 + (daysLasting / 1.75) - (costPerDay * 4.2)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm font-medium">Estimated Uses</td>
                <td className="py-2 px-4 text-sm">Total applications per container</td>
                <td className="py-2 px-4 text-sm font-mono">32 + (productPrice * 0.92)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Heading className="text-lg font-semibold mb-3">Frontend Implementation Guide</Heading>
        <Text className="mb-4">
          The Value Calculator can be implemented on the Escentual.com product pages in several ways:
        </Text>

        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <p className="text-sm font-medium mb-2">1. Direct Component Integration</p>
            <p className="text-sm text-gray-600 mb-2">
              Embed the QuickValueCalculator component directly in product pages:
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
              &lt;QuickValueCalculator productId="123456" initialPrice={49.99} /&gt;
            </div>
          </div>
          
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <p className="text-sm font-medium mb-2">2. API Integration</p>
            <p className="text-sm text-gray-600 mb-2">
              Connect to the Value Metrics API for real-time calculations:
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm font-mono overflow-x-auto">
              fetch(`https://escentual-value-metrics.gadget.app/api/products/${productId}/value`)
            </div>
          </div>
          
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <p className="text-sm font-medium mb-2">3. Value Badge Integration</p>
            <p className="text-sm text-gray-600 mb-2">
              Display simplified value badges on product listings:
            </p>
            <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
              &lt;ValueScoreBadge score={76} label="Good Value" /&gt;
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValueMetricsImplementation;
