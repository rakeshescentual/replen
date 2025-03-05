
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, Bell, BellOff, CheckCircle, CircleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

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
  const [expanded, setExpanded] = React.useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [priorityLevel, setPriorityLevel] = React.useState<'all' | 'critical'>('all');
  const [handledProducts, setHandledProducts] = React.useState<string[]>([]);
  
  if (products.length === 0) return null;
  
  const activeProducts = products.filter(p => !handledProducts.includes(p.id));
  const criticalProducts = activeProducts.filter(p => p.daysRemaining <= 7);
  const displayProducts = priorityLevel === 'critical' ? criticalProducts : activeProducts;
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? "Notifications disabled" : "Notifications enabled",
      description: notificationsEnabled ? 
        "You will no longer receive alerts for low products" : 
        "You will now receive alerts for low products",
    });
  };
  
  const handlePriorityChange = (level: 'all' | 'critical') => {
    setPriorityLevel(level);
    toast({
      title: "Display settings updated",
      description: `Now showing ${level === 'critical' ? 'critical items only' : 'all low items'}`,
    });
  };
  
  const markAsHandled = (productId: string) => {
    setHandledProducts(prev => [...prev, productId]);
    toast({
      title: "Product marked as handled",
      description: "This item will no longer appear in your notifications",
    });
  };
  
  const resetHandledProducts = () => {
    setHandledProducts([]);
    toast({
      title: "Notifications reset",
      description: "All products will now appear in your notifications",
    });
  };
  
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="bg-red-50 border-red-200 p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-red-800">Products Running Low</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="outline" className="bg-red-50">
                  {activeProducts.length === 1 
                    ? "1 product needs attention" 
                    : `${activeProducts.length} products need attention`}
                </Badge>
                {criticalProducts.length > 0 && (
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                    {criticalProducts.length} critical
                  </Badge>
                )}
                {handledProducts.length > 0 && (
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                    {handledProducts.length} handled
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {notificationsEnabled ? <Bell className="h-4 w-4 text-red-600" /> : <BellOff className="h-4 w-4 text-gray-400" />}
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={toggleNotifications} 
              />
            </div>
            <button 
              className="text-sm text-red-600 hover:text-red-800"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Collapse' : 'Expand'}
            </button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <>
          <div className="p-4 border-b bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={priorityLevel === 'all' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handlePriorityChange('all')}
                >
                  All Items ({activeProducts.length})
                </Button>
                <Button 
                  variant={priorityLevel === 'critical' ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => handlePriorityChange('critical')}
                  className={criticalProducts.length > 0 ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  Critical Only ({criticalProducts.length})
                </Button>
              </div>
              
              {handledProducts.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetHandledProducts} 
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  Reset Handled
                </Button>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {displayProducts.length > 0 ? (
                displayProducts.map(product => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border">
                    <div className="flex items-center space-x-3">
                      {product.daysRemaining <= 3 ? (
                        <CircleAlert className="w-4 h-4 text-red-600 mr-1 flex-shrink-0" />
                      ) : null}
                      <img src={product.image} alt={product.productTitle} className="w-10 h-10 rounded object-cover" />
                      <div>
                        <p className="font-medium">{product.productTitle}</p>
                        <p className={`text-sm ${product.daysRemaining <= 7 ? 'text-red-600 font-semibold' : 'text-orange-500'}`}>
                          {product.daysRemaining <= 3 
                            ? `Only ${product.daysRemaining} ${product.daysRemaining === 1 ? 'day' : 'days'} remaining!` 
                            : `${product.daysRemaining} ${product.daysRemaining === 1 ? 'day' : 'days'} remaining`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => markAsHandled(product.id)}
                        className="p-1 text-gray-500 hover:text-green-600 transition-colors"
                        title="Mark as handled"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
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
                ))
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-10 w-10 mx-auto text-green-500 mb-2" />
                  <p className="text-gray-700 font-medium">All caught up!</p>
                  <p className="text-sm text-gray-500">
                    {handledProducts.length > 0 
                      ? "You've handled all low stock notifications" 
                      : "No products matching the selected filter"}
                  </p>
                  {handledProducts.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetHandledProducts}
                      className="mt-3"
                    >
                      Reset Handled Items
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-red-700 bg-red-50 p-3 rounded">
              <p>Set up auto-replenishment to never run out again. Subscribe to save time and money!</p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default SmartNotificationCard;
