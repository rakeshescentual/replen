
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-900 mb-2 text-sm">Why these recommendations?</h3>
      <p className="text-sm text-gray-700 mb-3">
        Our AI analyzes your purchase history, browsing behavior, product reviews, and usage 
        patterns to recommend products with the highest value for your specific needs. 
        We prioritize products that have proven value based on cost efficiency, 
        effectiveness, and customer satisfaction.
      </p>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <h4 className="font-medium text-xs text-gray-700 mb-1">Powered by Gadget.dev</h4>
        <p className="text-xs text-gray-600">
          This recommendation engine seamlessly integrates with your store data through Gadget.dev's 
          API, ensuring real-time updates and synchronized product information across platforms.
        </p>
      </div>
    </div>
  );
};

export default InfoSection;
