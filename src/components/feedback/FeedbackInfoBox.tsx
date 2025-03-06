
import React from 'react';
import { LineChart, RefreshCw, UserCheck, Brain, ArrowRightCircle } from 'lucide-react';

const FeedbackInfoBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <h3 className="text-base font-semibold text-blue-800 mb-4 flex items-center">
        <Brain className="h-5 w-5 mr-2 text-blue-600" />
        How Customer Feedback Improves Predictions
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <LineChart className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Enhanced Data Model</p>
            <p className="text-xs text-blue-600">
              Actual usage data is fed back into our machine learning model to improve accuracy
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <UserCheck className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Personalized Patterns</p>
            <p className="text-xs text-blue-600">
              Customer-specific usage patterns are identified for tailored product recommendations
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <RefreshCw className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Continuous Improvement</p>
            <p className="text-xs text-blue-600">
              Predictions become more accurate over time as the system learns from customer responses
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <ArrowRightCircle className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Adaptive Timing</p>
            <p className="text-xs text-blue-600">
              Reminder schedules adapt to match actual customer usage cycles and preferences
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-blue-100">
        <p className="text-xs text-blue-500 italic">
          The feedback loop created between customers and our AI system ensures that replenishment 
          recommendations become increasingly relevant over time.
        </p>
      </div>
    </div>
  );
};

export default FeedbackInfoBox;
