
import React from 'react';
import { Heading } from "@/components/ui/shadcn";

const FeedbackInfoBox: React.FC = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
      <Heading className="text-sm font-medium text-blue-800 mb-2">How Customer Feedback Improves Predictions</Heading>
      <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
        <li>Actual usage data is fed back into our machine learning model</li>
        <li>Customer-specific usage patterns are identified for personalized predictions</li>
        <li>Product category benchmarks are refined based on real-world data</li>
        <li>Predictions become more accurate over time as more customers respond</li>
      </ul>
    </div>
  );
};

export default FeedbackInfoBox;
