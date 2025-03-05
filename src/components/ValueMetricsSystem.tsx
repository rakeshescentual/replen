
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ValueMetricService, ProductValueMetrics } from '@/utils/ValueMetricService';
import { ShopifyMetafieldService, ProductMetafields } from '@/utils/ShopifyMetafieldService';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ProductWithValueMetrics {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  metafields: ProductMetafields;
  valueMetrics: ProductValueMetrics;
}

const ValueMetricsSystem: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  const [products, setProducts] = useState<ProductWithValueMetrics[]>([
    {
      id: "1",
      title: "Premium Moisturizer",
      price: 49.99,
      image: "https://placehold.co/60x60",
      category: "Skincare",
      metafields: {
        average_lifespan: 60,
        cost_per_day: 0.83
      },
      valueMetrics: {
        valueScore: 86,
        costEfficiency: 8.4,
        customerSatisfaction: 9.2,
        sentimentScore: 8.7,
        repurchaseRate: 7.8
      }
    },
    {
      id: "2",
      title: "Daily Face Cream",
      price: 24.99,
      image: "https://placehold.co/60x60",
      category: "Skincare",
      metafields: {
        average_lifespan: 30,
        cost_per_day: 0.83
      },
      valueMetrics: {
        valueScore: 71,
        costEfficiency: 7.2,
        customerSatisfaction: 7.8,
        sentimentScore: 6.5,
        repurchaseRate: 6.2
      }
    },
    {
      id: "3",
      title: "Luxury Anti-Aging Serum",
      price: 89.99,
      image: "https://placehold.co/60x60",
      category: "Skincare",
      metafields: {
        average_lifespan: 45,
        cost_per_day: 2.0
      },
      valueMetrics: {
        valueScore: 79,
        costEfficiency: 6.8,
        customerSatisfaction: 9.5,
        sentimentScore: 9.2,
        repurchaseRate: 8.7
      }
    }
  ]);
  
  // Values for the demo implementation preview
  const [implementHighlight, setImplementHighlight] = useState<string>('product-page');
  
  // Function to generate score color class
  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-blue-100 text-blue-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };
  
  // Function to format metric bar width
  const getMetricBarWidth = (value: number): string => {
    return `${Math.min(Math.max(value * 10, 5), 100)}%`;
  };
  
  // Handle syncing metrics to Shopify
  const handleSyncMetrics = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        products.map(product => 
          ValueMetricService.syncValueMetrics(product.id, product.valueMetrics)
        )
      );
      
      const successCount = results.filter(result => result).length;
      
      toast({
        title: "Metrics Synced",
        description: `Successfully synced value metrics for ${successCount} of ${products.length} products`,
        variant: successCount === products.length ? "default" : "destructive"
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "An error occurred while syncing metrics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Get code snippet based on implementation highlight
  const getImplementationCode = (): string => {
    switch (implementHighlight) {
      case 'product-page':
        return ValueMetricService.generateLiquidSnippet();
      case 'collection-filtering':
        return ValueMetricService.generateCollectionFilterLiquid();
      case 'product-comparison':
        return ValueMetricService.generateProductComparisonLiquid();
      default:
        return ValueMetricService.generateLiquidSnippet();
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Escentual Value Metrics System</CardTitle>
              <CardDescription>
                Showcase premium product value with comprehensive metrics
              </CardDescription>
            </div>
            <Badge variant="outline" className="ml-2">
              Shopify Plus Integration
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="manage">Manage & Sync</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Value Score</CardTitle>
                    <CardDescription>Combined product value metric</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Our proprietary value scoring system combines cost-per-day metrics with customer
                      satisfaction and online sentiment to give shoppers a clear understanding of a product's
                      true value – helping justify premium product purchases.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Customer Benefits</CardTitle>
                    <CardDescription>Why shoppers love it</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Helps justify premium product purchases</li>
                      <li>Makes informed decisions when comparing products</li>
                      <li>Understands value beyond just price</li>
                      <li>Filters collections by value metrics</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Business Impact</CardTitle>
                    <CardDescription>Value for Escentual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Higher conversion rates on premium products</li>
                      <li>Increased average order value</li>
                      <li>Differentiator from competitors</li>
                      <li>Leverages existing review data (Bazaarvoice)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 text-gray-800 rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-medium">Cost Per Day Analysis</h4>
                        <p className="text-sm text-gray-600">
                          We calculate how much a product costs per day based on the average product lifespan, making it
                          easy to compare value across price points.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 text-gray-800 rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-medium">Bazaarvoice Integration</h4>
                        <p className="text-sm text-gray-600">
                          We analyze customer reviews from Bazaarvoice to determine satisfaction scores and extract
                          sentiment on product performance.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 text-gray-800 rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-medium">Online Sentiment Analysis</h4>
                        <p className="text-sm text-gray-600">
                          Our AI scans the web for mentions of each product to gauge overall sentiment and add this
                          broader perspective to our value calculations.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 text-gray-800 rounded-full h-7 w-7 flex items-center justify-center font-bold text-sm">4</div>
                      <div>
                        <h4 className="font-medium">Value Score Calculation</h4>
                        <p className="text-sm text-gray-600">
                          We combine all metrics into a single Value Score that's displayed on product pages, collection
                          pages, and in product comparison tools.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Implementation Tab */}
            <TabsContent value="implementation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Guide</CardTitle>
                  <CardDescription>
                    Add value metrics to your Escentual.com Shopify Plus store
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Access to your Shopify Plus theme code</li>
                        <li>Bazaarvoice integration already set up</li>
                        <li>Product lifespan data already available in metafields</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Metafield Setup</h3>
                      <p className="text-sm mb-2">
                        First, create the required metafield definitions in your Shopify Admin:
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        <li>Go to Settings &gt; Custom data &gt; Product &gt; Add definition</li>
                        <li>Create the following metafields with namespace <code>escentual_value</code>:
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li><code>value_score</code> (Decimal number)</li>
                            <li><code>cost_efficiency</code> (Decimal number)</li>
                            <li><code>customer_satisfaction</code> (Decimal number)</li>
                            <li><code>sentiment_score</code> (Decimal number)</li>
                            <li><code>repurchase_rate</code> (Decimal number, optional)</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Choose Implementation</h3>
                      <div className="flex space-x-4 mt-2">
                        <Button 
                          variant={implementHighlight === 'product-page' ? 'default' : 'outline'}
                          onClick={() => setImplementHighlight('product-page')}
                        >
                          Product Page
                        </Button>
                        <Button 
                          variant={implementHighlight === 'collection-filtering' ? 'default' : 'outline'}
                          onClick={() => setImplementHighlight('collection-filtering')}
                        >
                          Collection Filtering
                        </Button>
                        <Button 
                          variant={implementHighlight === 'product-comparison' ? 'default' : 'outline'}
                          onClick={() => setImplementHighlight('product-comparison')}
                        >
                          Product Comparison
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Code Snippet</h3>
                      <p className="text-sm mb-2">
                        Add this Liquid code to your theme file:
                      </p>
                      <div className="relative">
                        <Textarea 
                          readOnly 
                          className="font-mono text-xs h-[400px] overflow-auto"
                          value={getImplementationCode()}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            navigator.clipboard.writeText(getImplementationCode());
                            toast({
                              title: "Copied!",
                              description: "Code snippet copied to clipboard"
                            });
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Preview Tab */}
            <TabsContent value="preview" className="space-y-4">
              <div className="bg-white border rounded-lg p-6 max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-6 text-center">Value Metric Preview</h2>
                
                {/* Product with value metrics */}
                <div className="escentual-value-metric max-w-lg mx-auto">
                  <div className="flex justify-center mb-5">
                    <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white 
                      ${products[0].valueMetrics.valueScore > 80 ? 'bg-gradient-to-br from-amber-700 to-amber-500' : 
                        products[0].valueMetrics.valueScore > 70 ? 'bg-gradient-to-br from-amber-600 to-amber-400' : 
                        'bg-gradient-to-br from-amber-500 to-amber-300'}`}>
                      <span className="text-2xl font-bold">{Math.round(products[0].valueMetrics.valueScore)}</span>
                      <span className="text-xs">Value Score</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-5">
                    {/* Cost Efficiency */}
                    <div className="flex items-center">
                      <span className="w-1/3 text-sm">Cost Efficiency</span>
                      <div className="w-1/2 h-2 bg-gray-200 rounded overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-700 to-amber-400" 
                          style={{ width: getMetricBarWidth(products[0].valueMetrics.costEfficiency) }}>
                        </div>
                      </div>
                      <span className="w-1/6 text-sm font-semibold text-right">
                        {products[0].valueMetrics.costEfficiency.toFixed(1)}/10
                      </span>
                    </div>
                    
                    {/* Customer Satisfaction */}
                    <div className="flex items-center">
                      <span className="w-1/3 text-sm">Customer Satisfaction</span>
                      <div className="w-1/2 h-2 bg-gray-200 rounded overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-700 to-amber-400" 
                          style={{ width: getMetricBarWidth(products[0].valueMetrics.customerSatisfaction) }}>
                        </div>
                      </div>
                      <span className="w-1/6 text-sm font-semibold text-right">
                        {products[0].valueMetrics.customerSatisfaction.toFixed(1)}/10
                      </span>
                    </div>
                    
                    {/* Online Sentiment */}
                    <div className="flex items-center">
                      <span className="w-1/3 text-sm">Online Sentiment</span>
                      <div className="w-1/2 h-2 bg-gray-200 rounded overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-700 to-amber-400" 
                          style={{ width: getMetricBarWidth(products[0].valueMetrics.sentimentScore) }}>
                        </div>
                      </div>
                      <span className="w-1/6 text-sm font-semibold text-right">
                        {products[0].valueMetrics.sentimentScore.toFixed(1)}/10
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 text-sm">
                    <p>This product has been analyzed based on cost per day, customer reviews, and online sentiment.</p>
                    {products[0].valueMetrics.valueScore > 80 ? (
                      <p className="font-semibold mt-2">
                        <strong>Exceptional value</strong> - This premium product delivers outstanding performance for its price.
                      </p>
                    ) : products[0].valueMetrics.valueScore > 70 ? (
                      <p className="font-semibold mt-2">
                        <strong>Excellent value</strong> - This product offers excellent performance relative to its cost.
                      </p>
                    ) : products[0].valueMetrics.valueScore > 60 ? (
                      <p className="font-semibold mt-2">
                        <strong>Good value</strong> - This product provides good value for money.
                      </p>
                    ) : (
                      <p className="font-semibold mt-2">
                        <strong>Average value</strong> - This product offers standard value for its price point.
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-10 space-y-4 text-center">
                  <h3 className="font-medium">Value Metrics Features</h3>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center w-48">
                      <h4 className="font-medium text-amber-800">Product Comparison</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Compare value metrics across multiple products
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center w-48">
                      <h4 className="font-medium text-amber-800">Collection Filtering</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Filter and sort products by value metrics
                      </p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center w-48">
                      <h4 className="font-medium text-amber-800">Value Explanation</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        Help customers understand premium product value
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Manage & Sync Tab */}
            <TabsContent value="manage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Value Metrics</CardTitle>
                  <CardDescription>View and sync metrics to Shopify</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-update" />
                      <Label htmlFor="auto-update">Auto-update value metrics</Label>
                    </div>
                    <Button onClick={handleSyncMetrics} disabled={loading}>
                      {loading ? "Syncing..." : "Sync to Shopify"}
                    </Button>
                  </div>
                  
                  <Table>
                    <TableCaption>Product value metrics that will be synced to Shopify.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Value Score</TableHead>
                        <TableHead>Cost Efficiency</TableHead>
                        <TableHead>Satisfaction</TableHead>
                        <TableHead>Sentiment</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map(product => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0"></div>
                              <span>{product.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getScoreColorClass(product.valueMetrics.valueScore)}>
                              {Math.round(product.valueMetrics.valueScore)}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.valueMetrics.costEfficiency.toFixed(1)}/10</TableCell>
                          <TableCell>{product.valueMetrics.customerSatisfaction.toFixed(1)}/10</TableCell>
                          <TableCell>{product.valueMetrics.sentimentScore.toFixed(1)}/10</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-500">
                    Last synced: Today at 10:45 AM
                  </p>
                  <Button variant="outline">Generate Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueMetricsSystem;
