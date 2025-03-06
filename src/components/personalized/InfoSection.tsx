
import React from 'react';
import { Info, Sparkles, TrendingUp, Settings, Server } from 'lucide-react';

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
          <Server className="h-4 w-4 text-indigo-600 mr-2" />
          <h4 className="font-medium text-xs text-indigo-700">Powered by Gadget.dev</h4>
        </div>
        <p className="text-xs text-gray-600 pl-6 leading-relaxed">
          This recommendation engine leverages Gadget.dev's powerful backend services for real-time 
          data processing and machine learning. The system seamlessly integrates with your store data, 
          ensuring accurate product information and personalized recommendations.
        </p>
        
        <div className="mt-3 pl-6">
          <a 
            href="/documentation?tab=gadget-dev" 
            className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            Learn more about our Gadget.dev integration
            <svg className="ml-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
