
import React from 'react';

const SubscriptionBenefits: React.FC = () => {
  return (
    <div className="text-sm text-gray-600">
      <p className="font-medium mb-1">Why subscribe?</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Save up to 15% on premium products</li>
        <li>Personalized replenishment prevents running out or product expiration</li>
        <li>Optimal timing maximizes product effectiveness</li>
        <li>Reduce waste by receiving products when you actually need them</li>
      </ul>
    </div>
  );
};

export default SubscriptionBenefits;
