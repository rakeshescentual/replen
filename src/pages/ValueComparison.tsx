
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComparedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
  costEfficiency: number;
  customerSatisfaction: number;
  sentimentScore: number;
  repurchaseRate: number;
  costPerDay: number;
  lifespan: number;
}

const ValueComparison = () => {
  const { toast } = useToast();
  const [comparedProducts, setComparedProducts] = useState<ComparedProduct[]>([
    {
      id: "1",
      title: "Premium Anti-Aging Serum",
      image: "https://placehold.co/100x100",
      price: 89.99,
      valueScore: 84,
      costEfficiency: 7.5,
      customerSatisfaction: 9.2,
      sentimentScore: 8.9,
      repurchaseRate: 8.1,
      costPerDay: 1.5,
      lifespan: 60
    },
    {
      id: "2",
      title: "Luxury Night Cream",
      image: "https://placehold.co/100x100",
      price: 65.99,
      valueScore: 79,
      costEfficiency: 7.1,
      customerSatisfaction: 8.6,
      sentimentScore: 8.3,
      repurchaseRate: 7.7,
      costPerDay: 1.1,
      lifespan: 60
    }
  ]);
  
  const [recommendedProducts, setRecommendedProducts] = useState<ComparedProduct[]>([
    {
      id: "3",
      title: "Daily Face Moisturizer",
      image: "https://placehold.co/100x100",
      price: 29.99,
      valueScore: 77,
      costEfficiency: 8.3,
      customerSatisfaction: 7.9,
      sentimentScore: 7.6,
      repurchaseRate: 8.9,
      costPerDay: 0.6,
      lifespan: 45
    },
    {
      id: "4",
      title: "Hydrating Serum",
      image: "https://placehold.co/100x100",
      price: 54.99,
      valueScore: 82,
      costEfficiency: 8.0,
      customerSatisfaction: 8.7,
      sentimentScore: 8.5,
      repurchaseRate: 7.9,
      costPerDay: 0.9,
      lifespan: 60
    }
  ]);
  
  const removeProduct = (id: string) => {
    setComparedProducts(products => products.filter(p => p.id !== id));
  };
  
  const addToComparison = (product: ComparedProduct) => {
    if (comparedProducts.length >= 4) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare a maximum of 4 products at once",
        variant: "destructive"
      });
      return;
    }
    
    if (comparedProducts.some(p => p.id === product.id)) {
      toast({
        description: "This product is already in your comparison"
      });
      return;
    }
    
    setComparedProducts([...comparedProducts, product]);
    toast({
      description: "Product added to comparison"
    });
  };
  
  const addToWishlist = (productId: string) => {
    toast({
      description: "Product added to your wishlist"
    });
  };
  
  // Get color class based on score
  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-blue-100 text-blue-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Value Comparison Tool</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Compare Products</CardTitle>
            </CardHeader>
            <CardContent>
              {comparedProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No products selected for comparison</p>
                  <p className="text-sm">Add products using the suggestions on the right</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-4 pr-4 w-60"></th>
                        {comparedProducts.map(product => (
                          <th key={product.id} className="pb-4 px-4 text-center" style={{ minWidth: '180px' }}>
                            <div className="relative">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={() => removeProduct(product.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Product images and titles */}
                      <tr>
                        <td className="py-2 font-medium">Product</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-2 text-center">
                            <div className="flex flex-col items-center">
                              <img src={product.image} alt={product.title} className="w-20 h-20 object-cover mb-2" />
                              <span className="text-sm font-medium">{product.title}</span>
                              <span className="text-sm text-gray-600">£{product.price.toFixed(2)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Value Score */}
                      <tr className="bg-gray-50">
                        <td className="py-4 font-medium">Value Score</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex justify-center">
                              <Badge className={`text-lg px-3 py-1 ${getScoreColorClass(product.valueScore)}`}>
                                {product.valueScore}
                              </Badge>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Cost Per Day */}
                      <tr>
                        <td className="py-4 font-medium">Cost Per Day</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            £{product.costPerDay.toFixed(2)}
                          </td>
                        ))}
                      </tr>
                      
                      {/* Product Lifespan */}
                      <tr className="bg-gray-50">
                        <td className="py-4 font-medium">Lifespan</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            {product.lifespan} days
                          </td>
                        ))}
                      </tr>
                      
                      {/* Cost Efficiency */}
                      <tr>
                        <td className="py-4 font-medium">Cost Efficiency</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-gradient-to-r from-amber-700 to-amber-400 h-2 rounded-full" 
                                  style={{ width: `${product.costEfficiency * 10}%` }}
                                ></div>
                              </div>
                              <span>{product.costEfficiency.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Customer Satisfaction */}
                      <tr className="bg-gray-50">
                        <td className="py-4 font-medium">Customer Satisfaction</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-gradient-to-r from-amber-700 to-amber-400 h-2 rounded-full" 
                                  style={{ width: `${product.customerSatisfaction * 10}%` }}
                                ></div>
                              </div>
                              <span>{product.customerSatisfaction.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Online Sentiment */}
                      <tr>
                        <td className="py-4 font-medium">Online Sentiment</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-gradient-to-r from-amber-700 to-amber-400 h-2 rounded-full" 
                                  style={{ width: `${product.sentimentScore * 10}%` }}
                                ></div>
                              </div>
                              <span>{product.sentimentScore.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Repurchase Rate */}
                      <tr className="bg-gray-50">
                        <td className="py-4 font-medium">Repurchase Rate</td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="bg-gradient-to-r from-amber-700 to-amber-400 h-2 rounded-full" 
                                  style={{ width: `${product.repurchaseRate * 10}%` }}
                                ></div>
                              </div>
                              <span>{product.repurchaseRate.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Actions */}
                      <tr>
                        <td className="py-4"></td>
                        {comparedProducts.map(product => (
                          <td key={product.id} className="px-4 py-4 text-center">
                            <div className="flex space-x-2 justify-center">
                              <Button>Add to Basket</Button>
                              <Button variant="outline" size="icon" onClick={() => addToWishlist(product.id)}>
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Premium Value Education</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="why-premium">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="why-premium">Why Premium Products</TabsTrigger>
                    <TabsTrigger value="long-term">Long-Term Value</TabsTrigger>
                    <TabsTrigger value="ingredients">Premium Ingredients</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="why-premium" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Why Premium Beauty Products Score Higher</h3>
                      <p>
                        Premium beauty products often score higher in our value metrics due to several factors:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Higher concentration of active ingredients means you need less product per application</li>
                        <li>Superior formulations typically last longer on the skin, requiring fewer applications</li>
                        <li>Advanced research and patented technologies deliver more noticeable results</li>
                        <li>Premium brands often achieve higher customer satisfaction and repurchase rates</li>
                      </ul>
                      <p className="italic text-gray-600">
                        Our value metrics help you see beyond the initial price to understand the true value of your investment.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="long-term" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Understanding Long-Term Value</h3>
                      <p>
                        When considering skincare and beauty products, looking at long-term value often reveals why premium products are worth the investment:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Prevention costs less than correction - premium products with better preventative properties save money over time</li>
                        <li>Targeted solutions mean fewer products needed in your routine</li>
                        <li>Higher quality packaging preserves product efficacy longer</li>
                        <li>Cost per day analysis often shows surprisingly small differences between premium and mass-market options</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ingredients" className="mt-4">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">The Ingredient Difference</h3>
                      <p>
                        Premium products' value scores often reflect their superior ingredient profiles:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Higher percentages of active ingredients deliver better results with less product</li>
                        <li>Patented delivery systems ensure ingredients penetrate where needed</li>
                        <li>Sustainably sourced, high-quality ingredients justify higher costs</li>
                        <li>Advanced preservation systems mean fewer fillers and longer shelf life</li>
                      </ul>
                      <p>
                        Our value metrics factor in ingredient quality and effectiveness based on customer reviews and expert analysis.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h4 className="font-medium text-sm">{product.title}</h4>
                        <div className="flex items-center mt-1">
                          <Badge className={`mr-2 ${getScoreColorClass(product.valueScore)}`}>
                            {product.valueScore}
                          </Badge>
                          <span className="text-sm text-gray-600">£{product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => addToComparison(product)} 
                      className="w-full flex items-center justify-center"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Comparison
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ValueComparison;
