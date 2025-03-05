
import React, { useState, useEffect } from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PredictiveAnalysisService, ProductPrediction } from "@/utils/PredictiveAnalysisService";
import { CustomerDataCollectionService } from "@/utils/CustomerDataCollectionService";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  category: string;
  estimatedLifespan: number;
  suggestedSubscription: string;
  image: string;
}

// Initial product data (same as in ProductLifespanTable)
const initialProducts = [
  {
    id: "1",
    title: "Daily Face Moisturizer",
    category: "Skincare",
    estimatedLifespan: 30,
    suggestedSubscription: "1 month",
    image: "https://placehold.co/40x40"
  },
  {
    id: "2",
    title: "Anti-Aging Serum",
    category: "Skincare",
    estimatedLifespan: 60,
    suggestedSubscription: "2 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "3",
    title: "Vitamin C Supplements",
    category: "Supplements",
    estimatedLifespan: 90,
    suggestedSubscription: "3 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "4",
    title: "Shampoo",
    category: "Hair Care",
    estimatedLifespan: 45,
    suggestedSubscription: "1.5 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "5",
    title: "Toothpaste",
    category: "Oral Care",
    estimatedLifespan: 30,
    suggestedSubscription: "1 month",
    image: "https://placehold.co/40x40"
  }
];

const AIProductLifespanRecommendations = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [predictions, setPredictions] = useState<Map<string, ProductPrediction>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [externalDataLoaded, setExternalDataLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryInsights, setCategoryInsights] = useState<any>(null);
  
  // Initialize data collection and load predictions on component mount
  useEffect(() => {
    const initializeAI = async () => {
      try {
        // Initialize customer data collection
        await CustomerDataCollectionService.initialize();
        
        // Load initial predictions
        await loadPredictions();
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing AI system:", error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to initialize AI recommendation system",
          variant: "destructive"
        });
      }
    };
    
    initializeAI();
  }, []);
  
  // Load predictions for all products
  const loadPredictions = async () => {
    const newPredictions = new Map<string, ProductPrediction>();
    
    for (const product of products) {
      try {
        const prediction = await PredictiveAnalysisService.getPredictionForProduct(product.id);
        newPredictions.set(product.id, prediction);
      } catch (error) {
        console.error(`Error loading prediction for product ${product.id}:`, error);
      }
    }
    
    setPredictions(newPredictions);
  };
  
  // Apply AI recommendations to all products
  const applyAllRecommendations = () => {
    const updatedProducts = [...products];
    
    for (const product of updatedProducts) {
      const prediction = predictions.get(product.id);
      if (prediction) {
        product.estimatedLifespan = prediction.predictedLifespan;
        product.suggestedSubscription = prediction.recommendedSubscriptionInterval;
      }
    }
    
    setProducts(updatedProducts);
    
    toast({
      title: "AI Recommendations Applied",
      description: "All product lifespans updated with AI predictions",
    });
  };
  
  // Apply a single recommendation
  const applySingleRecommendation = (productId: string) => {
    const prediction = predictions.get(productId);
    if (!prediction) return;
    
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { 
            ...product, 
            estimatedLifespan: prediction.predictedLifespan,
            suggestedSubscription: prediction.recommendedSubscriptionInterval
          }
        : product
    );
    
    setProducts(updatedProducts);
    
    toast({
      title: "Recommendation Applied",
      description: `Updated lifespan for ${products.find(p => p.id === productId)?.title}`,
    });
  };
  
  // Load external data for a specific category
  const loadExternalDataForCategory = async (category: string) => {
    setSelectedCategory(category);
    setCategoryInsights(null);
    
    try {
      // First get market trends
      const trendData = await PredictiveAnalysisService.fetchInternetTrendsForCategory(category);
      
      // Then get external lifespan data
      const lifespanData = await PredictiveAnalysisService.enrichPredictionsWithExternalData(category);
      
      // Combine the data
      setCategoryInsights({
        ...trendData,
        ...lifespanData
      });
      
      setExternalDataLoaded(true);
      
      toast({
        title: "External Data Loaded",
        description: `AI has analyzed market data for ${category} products`,
      });
    } catch (error) {
      console.error(`Error loading external data for ${category}:`, error);
      toast({
        title: "Error",
        description: `Failed to load external data for ${category}`,
        variant: "destructive"
      });
    }
  };
  
  // Get confidence color class based on score
  const getConfidenceColorClass = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.5) return "text-yellow-600";
    return "text-red-600";
  };
  
  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Reset external data panel
  const closeInsightsPanel = () => {
    setSelectedCategory(null);
    setCategoryInsights(null);
  };

  return (
    <div className="space-y-6">
      {/* Main heading */}
      <div className="flex justify-between items-center">
        <div>
          <Heading className="text-xl font-medium">AI-Powered Lifespan Recommendations</Heading>
          <Text className="text-gray-500 mb-4">
            Our machine learning model analyzes purchase patterns, brand data, and market trends to recommend optimal product lifespans
          </Text>
        </div>
        
        <Button 
          onClick={applyAllRecommendations}
          disabled={isLoading || predictions.size === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Apply All Recommendations
        </Button>
      </div>
      
      {isLoading ? (
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
            <Text>Initializing AI prediction system...</Text>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product recommendations table */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Product</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Est.</TableHead>
                      <TableHead>AI Recommendation</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => {
                      const prediction = predictions.get(product.id);
                      const hasDifference = prediction && prediction.predictedLifespan !== product.estimatedLifespan;
                      
                      return (
                        <TableRow key={product.id} className={hasDifference ? "bg-blue-50" : ""}>
                          <TableCell>
                            <img src={product.image} alt={product.title} className="w-10 h-10 rounded" />
                          </TableCell>
                          <TableCell className="font-medium">{product.title}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="cursor-pointer hover:bg-gray-100"
                              onClick={() => loadExternalDataForCategory(product.category)}
                            >
                              {product.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{product.estimatedLifespan} days</TableCell>
                          <TableCell>
                            {prediction ? (
                              <span className={hasDifference ? "font-semibold" : ""}>
                                {prediction.predictedLifespan} days
                                {hasDifference && (
                                  <span className={
                                    prediction.predictedLifespan > product.estimatedLifespan 
                                      ? "text-green-600 ml-1" 
                                      : "text-red-600 ml-1"
                                  }>
                                    ({prediction.predictedLifespan > product.estimatedLifespan ? "+" : ""}
                                    {prediction.predictedLifespan - product.estimatedLifespan})
                                  </span>
                                )}
                              </span>
                            ) : (
                              <span className="text-gray-400">Loading...</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {prediction && (
                              <div className="flex items-center gap-2">
                                <Progress value={prediction.confidenceScore * 100} className="w-16 h-2" />
                                <span className={getConfidenceColorClass(prediction.confidenceScore)}>
                                  {Math.round(prediction.confidenceScore * 100)}%
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {prediction && hasDifference && (
                              <Button 
                                onClick={() => applySingleRecommendation(product.id)}
                                size="sm"
                                variant="outline"
                              >
                                Apply
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
            
            <div className="mt-2 text-xs text-gray-500">
              <p>* Highlighted rows indicate where AI recommendations differ from current settings</p>
              <p>* Click on a category name to see market insights and trends</p>
            </div>
          </div>
          
          {/* Category insights panel */}
          <div className="lg:col-span-1">
            <Card className="h-full p-5">
              {selectedCategory ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Heading className="text-lg font-medium">{selectedCategory} Insights</Heading>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={closeInsightsPanel}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  {categoryInsights ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Average Lifespan</h3>
                        <div className="flex items-center">
                          <span className="text-2xl font-bold">{categoryInsights.averageLifespan}</span>
                          <span className="ml-1 text-gray-500">days</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Based on {categoryInsights.dataPoints.toLocaleString()} data points
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Standard Deviation</h3>
                        <p>±{categoryInsights.standardDeviation} days</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Repurchase Rate</h3>
                        <div className="flex items-center">
                          <span className="text-xl font-bold">
                            {Math.round(categoryInsights.avgRepurchaseRate * 100)}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Popular Products</h3>
                        <ul className="text-sm list-disc pl-5">
                          {categoryInsights.topProducts.map((product: string, idx: number) => (
                            <li key={idx}>{product}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Market Trends</h3>
                        <ul className="text-sm list-disc pl-5">
                          {categoryInsights.marketTrends.map((trend: string, idx: number) => (
                            <li key={idx}>{trend}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2">
                        <Text className="text-xs text-gray-500 italic">
                          Data reliability score: {Math.round(categoryInsights.reliabilityScore * 100)}%
                        </Text>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mb-4"></div>
                      <Text className="text-sm">Loading insights for {selectedCategory}...</Text>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="rounded-full bg-blue-100 p-3 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <Heading className="text-lg font-medium mb-2">Category Insights</Heading>
                  <Text className="text-gray-500 text-sm">
                    Click on a category name in the table to view market trends and AI insights for that product category.
                  </Text>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
      
      {/* AI methodology explanation */}
      <Card className="p-5 bg-gray-50">
        <Heading className="text-lg font-medium mb-2">How Our AI Works</Heading>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            Our AI system combines multiple data sources to generate accurate product lifespan predictions:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Historical customer purchase patterns</li>
            <li>Product category benchmarks</li>
            <li>Brand manufacturer specifications</li>
            <li>Market trend analysis</li>
            <li>Individual usage pattern adjustments</li>
          </ul>
          <p className="mt-2">
            As more customers use the system, our predictions become increasingly accurate. The confidence score 
            indicates the reliability of each prediction based on available data.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default AIProductLifespanRecommendations;
