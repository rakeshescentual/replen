
import React from 'react';
import { Info } from 'lucide-react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex items-start space-x-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-full">
          <Info className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="font-medium text-gray-900 text-base">Why these recommendations?</h3>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        Our AI analyzes your purchase history, browsing behavior, product reviews, and usage 
        patterns to recommend products with the highest value for your specific needs. 
        We prioritize products that have proven value based on cost efficiency, 
        effectiveness, and customer satisfaction.
      </p>
      
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
