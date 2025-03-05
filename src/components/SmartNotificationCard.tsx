
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle, Bell, BellOff, CheckCircle, CircleAlert, RefreshCw, LineChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useGadgetAPI } from '@/hooks/useGadgetAPI';
import { useKlaviyoIntegration } from '@/utils/KlaviyoIntegrationService';
import { useSentimentAnalysis } from '@/utils/AISentimentAnalysisService';
import { syncProductSubscriptionData } from '@/utils/ShopifyMetafieldService';

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
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResults, setAnalysisResults] = React.useState<Record<string, number>>({});
  
  const { syncWithShopify } = useGadgetAPI();
  const { triggerReminder } = useKlaviyoIntegration();
  const { analyzeProduct } = useSentimentAnalysis();
  
  useEffect(() => {
    // This would load handled products from local storage or user preferences in a real app
    const loadHandledProducts = async () => {
      // In a real implementation, this might load from a database via Gadget.dev
      console.log("Loading previously handled products...");
    };
    
    loadHandledProducts();
  }, []);
  
  if (products.length === 0) return null;
  
  const activeProducts = products.filter(p => !handledProducts.includes(p.id));
  const criticalProducts = activeProducts.filter(p => p.daysRemaining <= 7);
  const displayProducts = priorityLevel === 'critical' ? criticalProducts : activeProducts;
  
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    // In a real implementation, this would update user preferences in Gadget.dev
    
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
    
    // In a real implementation, this would update status in Gadget.dev
    
    toast({
      title: "Product marked as handled",
      description: "This item will no longer appear in your notifications",
    });
  };
  
  const resetHandledProducts = () => {
    setHandledProducts([]);
    
    // In a real implementation, this would clear status in Gadget.dev
    
    toast({
      title: "Notifications reset",
      description: "All products will now appear in your notifications",
    });
  };
  
  const handleReorder = async (productId: string) => {
    // Call the parent's onReorder function
    onReorder(productId);
    
    // In a real implementation, track this event in Klaviyo via Gadget.dev
    const product = products.find(p => p.id === productId);
    if (product) {
      try {
        // This would be a real email in production
        await triggerReminder("customer@example.com", productId, product.daysRemaining);
        
        toast({
          title: "Reorder tracking",
          description: "Reorder event has been tracked in analytics",
        });
      } catch (error) {
        console.error("Failed to track reorder event:", error);
      }
    }
  };
  
  const handleSubscribe = async (productId: string) => {
    // Call the parent's onSubscribe function
    onSubscribe(productId);
    
    const product = products.find(p => p.id === productId);
    if (product) {
      try {
        // Calculate optimal subscription interval based on product usage
        const optimalInterval = Math.max(25, product.daysRemaining - 5);
        
        // Sync this data to Shopify metafields
        await syncProductSubscriptionData(
          productId,
          optimalInterval,
          product.daysRemaining
        );
        
        // Update product in Gadget.dev
        await syncWithShopify();
        
        toast({
          title: "Subscription data synced",
          description: "Product subscription data has been updated in Shopify",
        });
      } catch (error) {
        console.error("Failed to sync subscription data:", error);
        toast({
          title: "Sync failed",
          description: "Could not update subscription data in Shopify",
          variant: "destructive"
        });
      }
    }
  };
  
  const runSentimentAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Analyze each product and store results
      const results: Record<string, number> = {};
      
      for (const product of displayProducts) {
        const analysis = await analyzeProduct(product.id);
        if (analysis) {
          results[product.id] = analysis.score;
        }
      }
      
      setAnalysisResults(results);
      
      toast({
        title: "Analysis complete",
        description: `Analyzed sentiment for ${Object.keys(results).length} products`,
      });
    } catch (error) {
      console.error("Sentiment analysis failed:", error);
      toast({
        title: "Analysis failed",
        description: "Could not complete sentiment analysis",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runSentimentAnalysis}
                  disabled={isAnalyzing || displayProducts.length === 0}
                  className="flex items-center gap-1"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <LineChart className="h-3 w-3" />
                      <span>Analyze Sentiment</span>
                    </>
                  )}
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
                        <div className="flex items-center">
                          <p className={`text-sm ${product.daysRemaining <= 7 ? 'text-red-600 font-semibold' : 'text-orange-500'}`}>
                            {product.daysRemaining <= 3 
                              ? `Only ${product.daysRemaining} ${product.daysRemaining === 1 ? 'day' : 'days'} remaining!` 
                              : `${product.daysRemaining} ${product.daysRemaining === 1 ? 'day' : 'days'} remaining`}
                          </p>
                          
                          {analysisResults[product.id] !== undefined && (
                            <Badge 
                              variant="outline" 
                              className={`ml-2 ${
                                analysisResults[product.id] > 0.7 
                                  ? 'bg-green-50 text-green-700 border-green-200' 
                                  : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }`}
                            >
                              {(analysisResults[product.id] * 100).toFixed(0)}% positive
                            </Badge>
                          )}
                        </div>
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
                        onClick={() => handleReorder(product.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Reorder
                      </button>
                      <button
                        onClick={() => handleSubscribe(product.id)}
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
