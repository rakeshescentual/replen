
import React from "react";
import { Heading } from "@/components/ui/shadcn";

const ValueMetricsBenefits = () => {
  return (
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
  );
};

export default ValueMetricsBenefits;
