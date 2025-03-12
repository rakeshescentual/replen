
import React from 'react';
import { Info, Sparkles, TrendingUp, Settings, Server, CalendarClock, ShoppingCart, Database, GitMerge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-start space-x-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-full">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 text-base">Why these recommendations?</h3>
          <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-100">
            Powered by Gadget.dev's latest features
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Our AI analyzes multiple data points from your Escentual.com shopping behavior to provide the most 
        relevant recommendations, timed to arrive on your payday:
      </p>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Purchase History:</span> We analyze what you've bought from Escentual.com and when
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Usage Patterns:</span> We estimate when products will run out based on typical usage
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <Settings className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Product Affinity:</span> We identify complementary Escentual.com items you might enjoy
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <CalendarClock className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">Payday Timing:</span> We align recommendations with your monthly payday
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="p-1.5 bg-indigo-50 rounded-full mr-3 mt-0.5">
            <ShoppingCart className="h-3.5 w-3.5 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-700">One-Click Reordering:</span> Easily replenish items before they run out
          </p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center mb-2">
          <Server className="h-4 w-4 text-indigo-600 mr-2" />
          <h4 className="font-medium text-xs text-indigo-700">Powered by Gadget.dev</h4>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md mb-3">
          <div className="flex items-center mb-1">
            <GitMerge className="h-3.5 w-3.5 text-blue-600 mr-1.5" />
            <p className="text-xs font-medium text-blue-700">Using Latest Gadget.dev Features</p>
          </div>
          <p className="text-xs text-blue-600 pl-5">
            Our recommendation engine leverages Environment Variable Groups, Type-Safe Routes, 
            and Enhanced Shopify Connection capabilities for optimal performance.
          </p>
        </div>
        
        <p className="text-xs text-gray-600 pl-6 leading-relaxed">
          This recommendation engine leverages Gadget.dev's powerful backend services for real-time 
          data processing and machine learning. The system seamlessly integrates with your Escentual.com store data, 
          ensuring accurate product information and personalized recommendations delivered on your monthly payday.
        </p>
        
        <div className="flex items-center space-x-2 mt-3 pl-6">
          <Database className="h-3.5 w-3.5 text-indigo-500" />
          <p className="text-xs text-indigo-600">
            Environment-specific configuration for optimal performance
          </p>
        </div>
        
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
