
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  productTitle: string;
  daysRemaining: number;
  image: string;
}

interface SmartNotificationCardProps {
  products: Product[];
  onReorder: (productId: string) => void;
  onSubscribe: (productId: string) => void;
}

const SmartNotificationCard = ({ products, onReorder, onSubscribe }: SmartNotificationCardProps) => {
  if (products.length === 0) return null;
  
  return (
    <Card className="p-4 mb-6 bg-red-50 border-red-200">
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-red-100 rounded-full">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-red-800">Products Running Low</h3>
          <p className="text-red-600 mb-4">
            {products.length === 1 
              ? "1 product needs your attention" 
              : `${products.length} products need your attention`}
          </p>
          
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-3">
                  <img src={product.image} alt={product.productTitle} className="w-10 h-10 rounded object-cover" />
                  <div>
                    <p className="font-medium">{product.productTitle}</p>
                    <p className="text-sm text-red-600">Only {product.daysRemaining} days remaining!</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onReorder(product.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Reorder
                  </button>
                  <button
                    onClick={() => onSubscribe(product.id)}
                    className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-red-700">
            <p>Set up auto-replenishment to never run out again. Subscribe to save time and money!</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SmartNotificationCard;
