
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PurchaseHistory {
  date: string;
  quantity: number;
}

interface Replenishment {
  id: string;
  productTitle: string;
  purchaseDate: string;
  estimatedRunOutDate: string;
  daysRemaining: number;
  isSubscription: boolean;
  nextDeliveryDate: string | null;
  usagePattern: string;
  purchaseHistory: PurchaseHistory[];
}

interface ProductTimelineProps {
  replenishments: Replenishment[];
}

const ProductTimeline = ({ replenishments }: ProductTimelineProps) => {
  const [timeframe, setTimeframe] = useState<'30days' | '90days' | '6months'>('30days');
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  
  // Get current date for reference line
  const today = new Date();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Transform data for timeline chart
  const timelineData = replenishments.map(item => {
    // Calculate days since purchase
    const purchaseDate = new Date(item.purchaseDate);
    const daysSincePurchase = Math.round((today.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate total timeline duration in days
    const estimatedRunOutDate = new Date(item.estimatedRunOutDate);
    const totalDuration = Math.round((estimatedRunOutDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate when the next delivery will arrive (if subscribed)
    let nextDeliveryDays = null;
    if (item.nextDeliveryDate) {
      const nextDelivery = new Date(item.nextDeliveryDate);
      nextDeliveryDays = Math.round((nextDelivery.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    return {
      name: item.productTitle,
      purchased: 0, // Start point
      currentDay: daysSincePurchase,
      runOut: totalDuration,
      nextDelivery: nextDeliveryDays,
      isSubscription: item.isSubscription,
      purchaseDateFormatted: formatDate(item.purchaseDate),
      runOutDateFormatted: formatDate(item.estimatedRunOutDate),
      nextDeliveryFormatted: item.nextDeliveryDate ? formatDate(item.nextDeliveryDate) : null,
      fullPurchaseDate: formatFullDate(item.purchaseDate),
      fullRunOutDate: formatFullDate(item.estimatedRunOutDate),
      fullNextDeliveryDate: item.nextDeliveryDate ? formatFullDate(item.nextDeliveryDate) : null,
      usagePattern: item.usagePattern,
      daysRemaining: item.daysRemaining,
      id: item.id
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Purchased: {data.fullPurchaseDate}</p>
          <p className="text-sm text-gray-600">Runs out: {data.fullRunOutDate}</p>
          {data.isSubscription && data.fullNextDeliveryDate && (
            <p className="text-sm text-blue-600">Delivery: {data.fullNextDeliveryDate}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">Usage pattern: {data.usagePattern}</p>
        </div>
      );
    }
    return null;
  };

  const selectedProduct = timelineData[selectedProductIndex];
  
  const handlePrevProduct = () => {
    setSelectedProductIndex(prev => 
      prev > 0 ? prev - 1 : timelineData.length - 1
    );
  };
  
  const handleNextProduct = () => {
    setSelectedProductIndex(prev => 
      prev < timelineData.length - 1 ? prev + 1 : 0
    );
  };
  
  const getStatusColor = (daysRemaining: number) => {
    if (daysRemaining <= 7) return "text-red-600";
    if (daysRemaining <= 14) return "text-orange-500";
    return "text-green-600";
  };
  
  const getStatusText = (daysRemaining: number, isSubscription: boolean) => {
    if (isSubscription) {
      return "Subscription active";
    }
    
    if (daysRemaining <= 7) {
      return "Critical - reorder soon";
    }
    
    if (daysRemaining <= 14) {
      return "Running low";
    }
    
    return "Good stock level";
  };

  return (
    <Card className="mb-8 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
        <h3 className="font-medium">Product Timeline</h3>
        <Tabs defaultValue="30days" onValueChange={(value) => setTimeframe(value as any)}>
          <TabsList>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
            <TabsTrigger value="6months">6 Months</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handlePrevProduct}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 text-center">
            <h4 className="font-semibold">{selectedProduct?.name}</h4>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className={`text-sm ${getStatusColor(selectedProduct?.daysRemaining)}`}>
                {getStatusText(selectedProduct?.daysRemaining, selectedProduct?.isSubscription)}
              </span>
              
              {selectedProduct?.isSubscription && (
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Next delivery scheduled for {selectedProduct?.fullNextDeliveryDate}</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleNextProduct}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={[selectedProduct]}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis 
                type="number" 
                domain={[0, 'dataMax']} 
                tickFormatter={(value) => {
                  const date = new Date(today);
                  date.setDate(date.getDate() + (value - selectedProduct.currentDay));
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip content={<CustomTooltip />} />
              
              <Bar dataKey="runOut" stackId="a" fill="#d1d5db" />
              
              {/* Show markers for current day */}
              <ReferenceLine 
                x={selectedProduct?.currentDay || 0} 
                stroke="#000"
                strokeWidth={2}
                label={{ value: 'Today', position: 'top', fill: '#000' }}
              />
              
              {/* Show marker for run out date */}
              <ReferenceLine 
                x={selectedProduct?.runOut || 0} 
                stroke="#ef4444"
                strokeWidth={2}
                label={{ value: 'Runs Out', position: 'top', fill: '#ef4444' }}
              />
              
              {/* Markers for next deliveries */}
              {selectedProduct?.nextDelivery && (
                <ReferenceLine 
                  x={selectedProduct.nextDelivery} 
                  stroke="#3b82f6"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  isFront={true}
                  label={{ 
                    value: 'Delivery', 
                    position: 'top', 
                    fill: '#3b82f6',
                  }}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Purchased</div>
              <div className="font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {selectedProduct?.fullPurchaseDate}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Estimated Run Out</div>
              <div className={`font-medium flex items-center gap-1 ${getStatusColor(selectedProduct?.daysRemaining)}`}>
                <Calendar className="h-4 w-4" />
                {selectedProduct?.fullRunOutDate}
              </div>
            </div>
            
            {selectedProduct?.isSubscription && selectedProduct?.fullNextDeliveryDate && (
              <div>
                <div className="text-sm text-gray-500">Next Delivery</div>
                <div className="font-medium text-blue-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedProduct?.fullNextDeliveryDate}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-8 mt-2 p-4 bg-gray-50 border-t text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-black rounded-full mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span>Next Delivery</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Runs Out</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductTimeline;
