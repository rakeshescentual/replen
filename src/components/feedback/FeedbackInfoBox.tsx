
import React from 'react';
import { LineChart, RefreshCw, UserCheck, Brain, ArrowRightCircle, Server, Database, CalendarClock, GitMerge, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FeedbackInfoBox: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-blue-600" />
          <h3 className="text-base font-semibold text-blue-800">How Customer Feedback Improves Predictions</h3>
        </div>
        <Badge className="bg-green-50 text-green-700 border-green-100">
          Latest Gadget.dev AI
        </Badge>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <LineChart className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Enhanced Data Model</p>
            <p className="text-xs text-blue-600">
              Actual usage data is fed back into our machine learning model to improve accuracy for Escentual.com products
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
              Customer-specific usage patterns are identified for tailored product recommendations from Escentual.com
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="p-1.5 mt-0.5 bg-blue-100 rounded-full">
            <CalendarClock className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-0.5">Payday Optimized Reminders</p>
            <p className="text-xs text-blue-600">
              We time your replenishment emails to arrive just after your monthly payday for maximum convenience
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
              Reminder schedules adapt to match actual customer usage cycles and payday preferences
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-blue-100">
        <div className="flex items-center mb-2">
          <Server className="h-4 w-4 text-blue-600 mr-2" />
          <h4 className="font-medium text-xs text-blue-700">Gadget.dev Backend Processing</h4>
        </div>
        
        <div className="bg-indigo-50 p-3 rounded-md mb-3">
          <div className="flex items-start space-x-2">
            <GitMerge className="h-3.5 w-3.5 text-indigo-600 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-indigo-700">Environment Variable Groups</p>
              <p className="text-xs text-indigo-600">
                Our system uses environment-specific configuration for development, staging, and production to ensure optimal performance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-start space-x-2 mb-2">
          <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-blue-700">Type-Safe API Integration</p>
            <p className="text-xs text-blue-500">
              Feedback data is processed in real-time using Gadget.dev's type-safe API routes, 
              ensuring accurate data processing and immediate updates to prediction models.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Database className="h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-blue-700">Secure Data Storage</p>
            <p className="text-xs text-blue-500">
              All customer feedback and usage data is securely stored in Gadget.dev's database, 
              ensuring data integrity and compliance with privacy regulations.
            </p>
          </div>
        </div>
        
        <div className="mt-2 text-right">
          <a 
            href="/documentation?tab=gadget-dev" 
            className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800"
          >
            Learn more about our technical infrastructure
            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedbackInfoBox;
