
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Search, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";
import { InternetDataService } from '@/utils/InternetDataService';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  estimatedLifespan: number;
}

const InternetDataAnalyzer = () => {
  const [productName, setProductName] = useState('');
  const [specificUrl, setSpecificUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<{
    sentimentScore?: number;
    averageLifespan?: number;
    confidenceScore?: number;
    dataSource?: string;
    valueScore?: number;
    enhancedLifespan?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Mock product database - in a real app, this would come from Shopify API
  const mockProducts: ProductInfo[] = [
    { id: 'prod_123', name: 'Luxury Face Serum', price: 85, estimatedLifespan: 60 },
    { id: 'prod_456', name: 'Hydrating Moisturizer', price: 45, estimatedLifespan: 45 },
    { id: 'prod_789', name: 'Vitamin C Cream', price: 65, estimatedLifespan: 50 },
    { id: 'prod_012', name: 'Anti-Aging Night Cream', price: 95, estimatedLifespan: 75 },
  ];
  
  const handleAnalyze = async () => {
    if (!productName.trim()) {
      setError("Please enter a product name to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(10);
    setError(null);
    setAnalysisResult(null);
    
    try {
      // Find product in mock database
      const matchingProduct = mockProducts.find(p => 
        p.name.toLowerCase().includes(productName.toLowerCase())
      );
      
      if (!matchingProduct) {
        throw new Error("Product not found in database. Try a different product name.");
      }
      
      setProgress(30);
      
      // First, mine the internet data
      const internetData = await InternetDataService.mineInternetData(
        matchingProduct.id,
        matchingProduct.name,
        specificUrl || undefined
      );
      
      setProgress(70);
      
      if (!internetData.success) {
        throw new Error("Failed to retrieve internet data for this product");
      }
      
      // Then, enhance the value metrics with the internet data
      const enhancedMetrics = await InternetDataService.enhanceValueMetrics(
        matchingProduct.id,
        matchingProduct.name,
        matchingProduct.price,
        matchingProduct.estimatedLifespan
      );
      
      setProgress(100);
      
      // Combine results
      setAnalysisResult({
        sentimentScore: internetData.sentimentScore,
        averageLifespan: internetData.averageLifespan,
        confidenceScore: internetData.confidenceScore,
        dataSource: internetData.dataSource,
        valueScore: enhancedMetrics.enhancedValueScore,
        enhancedLifespan: enhancedMetrics.enhancedLifespan
      });
      
    } catch (error) {
      console.error("Analysis error:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-600" />
          Internet Data Mining Analysis
        </CardTitle>
        <CardDescription>
          Analyze online sentiment, reviews, and usage data to enhance product value metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <Input
              id="productName"
              placeholder="Enter product name (e.g., Luxury Face Serum)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Try: Luxury Face Serum, Hydrating Moisturizer, Vitamin C Cream, or Anti-Aging Night Cream
            </p>
          </div>
          
          <div>
            <label htmlFor="specificUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Specific URL to Analyze (Optional)
            </label>
            <Input
              id="specificUrl"
              placeholder="https://example.com/product-reviews"
              value={specificUrl}
              onChange={(e) => setSpecificUrl(e.target.value)}
              className="w-full"
            />
          </div>
          
          {isAnalyzing && (
            <div className="py-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Analyzing internet data...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {analysisResult && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-blue-800">Analysis Complete</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Internet Data Results</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Sentiment Score:</span>
                      <span className="font-medium">{analysisResult.sentimentScore ? 
                        `${(analysisResult.sentimentScore * 100).toFixed(0)}%` : 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Average Lifespan:</span>
                      <span className="font-medium">{analysisResult.averageLifespan ? 
                        `${analysisResult.averageLifespan} days` : 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Confidence Level:</span>
                      <span className="font-medium">{analysisResult.confidenceScore ? 
                        `${(analysisResult.confidenceScore * 100).toFixed(0)}%` : 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Data Source:</span>
                      <span className="font-medium">{analysisResult.dataSource || 'N/A'}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Enhanced Value Metrics</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Value Score:</span>
                      <span className="font-medium">{analysisResult.valueScore ? 
                        `${analysisResult.valueScore.toFixed(0)}/100` : 'N/A'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Enhanced Lifespan:</span>
                      <span className="font-medium">{analysisResult.enhancedLifespan ? 
                        `${analysisResult.enhancedLifespan} days` : 'N/A'}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 flex items-center text-sm text-blue-700">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Data has been synced to Shopify metafields for this product</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !productName.trim()} 
          className="w-full"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Internet Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InternetDataAnalyzer;
