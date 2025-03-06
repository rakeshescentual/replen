
import React, { useState } from 'react';
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Globe, Search, Lightbulb } from "lucide-react";
import { ShopifyMetafieldService } from "@/utils/ShopifyMetafieldService";

interface InternetDataResult {
  productId: string;
  productName: string;
  averageLifespan: number;
  sentimentScore: number;
  confidenceScore: number;
  sources: string[];
}

const InternetDataMiningForm = () => {
  const [url, setUrl] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<InternetDataResult | null>(null);

  const simulateInternetDataMining = async () => {
    if (!url || !productId || !productName) {
      toast({
        title: "Missing information",
        description: "Please provide all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Simulate results
      const mockResult: InternetDataResult = {
        productId,
        productName,
        averageLifespan: Math.floor(Math.random() * 60) + 30, // 30-90 days
        sentimentScore: Math.floor(Math.random() * 40) + 60, // 60-100
        confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100
        sources: [
          "beautypedia.com",
          "makeupalley.com",
          "reddit.com/r/SkincareAddiction",
          "productreviews.co.uk"
        ]
      };
      
      setResult(mockResult);
      
      toast({
        title: "Data mining complete",
        description: `Found internet data for ${productName}`,
      });
    } catch (error) {
      console.error("Error in internet data mining:", error);
      toast({
        title: "Mining failed",
        description: "Failed to retrieve internet data. Please try again.",
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setProgress(100);
      setIsLoading(false);
    }
  };
  
  const handleSync = async () => {
    if (!result) return;
    
    try {
      await ShopifyMetafieldService.syncInternetDataInsights(
        result.productId,
        result.sources.join(", "),
        result.sentimentScore,
        result.averageLifespan,
        result.confidenceScore
      );
      
      toast({
        title: "Internet data synced",
        description: `Internet data insights for ${result.productName} saved to Shopify`,
      });
    } catch (error) {
      console.error("Error syncing internet data:", error);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-5 w-5 text-blue-600" />
        <Heading className="text-xl font-semibold">Internet Data Mining</Heading>
      </div>
      
      <Text className="mb-6">
        Find product usage information, reviews, and sentiment analysis from across the internet 
        to enhance prediction accuracy for Escentual.com products.
      </Text>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Product URL to Analyze</label>
              <Input
                placeholder="https://www.escentual.com/product-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the Escentual.com product URL to mine related internet data
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product ID</label>
              <Input
                placeholder="123456789"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <Input
                placeholder="Product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              className="w-full"
              onClick={simulateInternetDataMining}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Search className="h-4 w-4 mr-2 animate-pulse" />
                  Mining Data...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Mine Internet Data
                </span>
              )}
            </Button>
          </div>
          
          {isLoading && (
            <div className="mt-4">
              <Text className="text-sm mb-1">Processing data sources...</Text>
              <Progress value={progress} className="h-2" />
              <Text className="text-xs text-gray-500 mt-1">
                {progress < 100 ? 'Mining product data from multiple sources' : 'Data mining complete'}
              </Text>
            </div>
          )}
        </div>
        
        <div>
          {result && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <Heading className="text-lg font-medium text-blue-800">Internet Data Insights</Heading>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-blue-700">Product:</p>
                  <p className="text-blue-800">{result.productName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-blue-700">Average Lifespan:</p>
                  <p className="text-blue-800">{result.averageLifespan} days</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-blue-700">Sentiment Score:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-blue-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${result.sentimentScore}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-800 text-sm">{result.sentimentScore}/100</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-blue-700">Confidence Score:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-blue-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${result.confidenceScore}%` }}
                      ></div>
                    </div>
                    <span className="text-blue-800 text-sm">{result.confidenceScore}/100</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-blue-700">Data Sources:</p>
                  <ul className="list-disc text-blue-800 text-sm pl-5">
                    {result.sources.map((source, index) => (
                      <li key={index}>{source}</li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-3"
                  onClick={handleSync}
                >
                  Save to Shopify Metafields
                </Button>
              </div>
            </div>
          )}
          
          {!result && !isLoading && (
            <div className="h-full flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p>Internet data mining results will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <Heading className="text-sm font-medium mb-2">How Internet Data Mining Works</Heading>
        <ol className="list-decimal text-sm pl-5 space-y-1 text-gray-700">
          <li>Our system crawls various beauty forums, review sites, and social media for product mentions</li>
          <li>Natural language processing extracts usage patterns and product longevity information</li>
          <li>Sentiment analysis determines customer satisfaction levels</li>
          <li>AI aggregates information to predict average product lifespan</li>
          <li>Results enhance the accuracy of payday-aligned replenishment reminders</li>
        </ol>
      </div>
    </Card>
  );
};

export default InternetDataMiningForm;
