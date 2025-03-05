
import React from 'react';
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
  // Get current date for reference line
  const today = new Date();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
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
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Purchased: {data.purchaseDateFormatted}</p>
          <p className="text-sm text-gray-600">Runs out: {data.runOutDateFormatted}</p>
          {data.isSubscription && data.nextDeliveryFormatted && (
            <p className="text-sm text-blue-600">Delivery: {data.nextDeliveryFormatted}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-8">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500 mb-2">Timeline of your product usage and upcoming deliveries</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={timelineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={0} stroke="#000" />
              <Bar dataKey="runOut" stackId="a" fill="#d1d5db" />
              
              {/* Show markers for current day */}
              <ReferenceLine 
                x={timelineData[0]?.currentDay || 0} 
                stroke="#000"
                strokeWidth={2}
                label={{ value: 'Today', position: 'top', fill: '#000' }}
              />
              
              {/* Markers for next deliveries */}
              {timelineData.map((item, index) => 
                item.nextDelivery && (
                  <ReferenceLine 
                    key={`delivery-${index}`}
                    x={item.nextDelivery} 
                    stroke="#3b82f6"
                    strokeDasharray="3 3"
                    strokeWidth={2}
                    isFront={true}
                    label={{ 
                      value: 'Delivery', 
                      position: 'top', 
                      fill: '#3b82f6',
                      offset: 10 + (index * 15)
                    }}
                  />
                )
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-8 mt-4 text-sm">
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
            <span>Running Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTimeline;
