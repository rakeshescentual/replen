
import React from 'react';
import { Info, Sparkles, TrendingUp, Settings } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-start space-x-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-full">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-medium text-gray-900 text-base">Why these recommendations?</h3>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Our AI analyzes multiple data points from your shopping behavior to provide the most 
        relevant recommendations:
      </p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Purchase History:</span> We analyze what you've bought and when
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Usage Patterns:</span> We estimate when products will run out
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <Settings className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Product Affinity:</span> We identify complementary items you might enjoy
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center mb-2">
          <svg className="h-4 w-4 text-indigo-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L12 15L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h4 className="font-medium text-xs text-indigo-700">Powered by Gadget.dev</h4>
        </div>
        <p className="text-xs text-gray-600 pl-6 leading-relaxed">
          This recommendation engine seamlessly integrates with your store data through Gadget.dev's 
          API, ensuring real-time updates and synchronized product information across platforms.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;
