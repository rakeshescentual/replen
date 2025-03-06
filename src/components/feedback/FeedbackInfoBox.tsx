
import React from 'react';
import { LineChart, RefreshCw, UserCheck, Brain } from 'lucide-react';

const FeedbackInfoBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm">
      <h3 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-blue-600" />
        How Customer Feedback Improves Predictions
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="p-1 mt-0.5 bg-blue-100 rounded-full">
            <LineChart className="h-3.5 w-3.5 text-blue-700" />
          </div>
          <p className="text-sm text-blue-700">
            Actual usage data is fed back into our machine learning model
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1 mt-0.5 bg-blue-100 rounded-full">
            <UserCheck className="h-3.5 w-3.5 text-blue-700" />
          </div>
          <p className="text-sm text-blue-700">
            Customer-specific usage patterns are identified for personalized predictions
          </p>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1 mt-0.5 bg-blue-100 rounded-full">
            <RefreshCw className="h-3.5 w-3.5 text-blue-700" />
          </div>
          <p className="text-sm text-blue-700">
            Predictions become more accurate over time as more customers respond
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackInfoBox;
