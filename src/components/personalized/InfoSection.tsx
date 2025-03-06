
import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-sm">
      <p className="font-medium mb-2">Why these recommendations?</p>
      <p>
        Our AI analyzes your purchase history, browsing behavior, product reviews, and usage 
        patterns to recommend products with the highest value for your specific needs. 
        We prioritize products that have proven value based on cost efficiency, 
        effectiveness, and customer satisfaction.
      </p>
    </div>
  );
};

export default InfoSection;
