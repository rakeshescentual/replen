
import React from 'react';

interface SavingsSummaryProps {
  totalYearlySavings: number;
}

const SavingsSummary: React.FC<SavingsSummaryProps> = ({ totalYearlySavings }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">Total Yearly Savings</div>
          <div className="text-sm text-gray-600 mt-1">By subscribing at optimal intervals</div>
        </div>
        <div className="text-xl font-bold text-green-600">
          £{totalYearlySavings.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default SavingsSummary;
