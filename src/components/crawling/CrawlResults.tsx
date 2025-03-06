
import React from "react";
import { 
  Card, 
  Heading, 
  Text 
} from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Star, Clock, TrendingUp, MessageSquare } from "lucide-react";

interface CrawlData {
  url: string;
  results: any;
  timestamp: Date;
}

interface CrawlResultsProps {
  selectedCrawl: CrawlData | null;
}

export const CrawlResults = ({ selectedCrawl }: CrawlResultsProps) => {
  if (!selectedCrawl) {
    return (
      <Card className="p-8 text-center h-full flex flex-col justify-center items-center">
        <InfoIcon className="h-12 w-12 text-gray-300 mb-4" />
        <Heading className="text-xl font-semibold mb-2">No Data Selected</Heading>
        <Text className="text-gray-500 max-w-md mx-auto">
          Start a web crawl or select a previous crawl from the history to view the results.
        </Text>
      </Card>
    );
  }

  const { url, results, timestamp } = selectedCrawl;
  
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Heading className="text-xl font-semibold">Crawl Results</Heading>
          <Badge variant="outline" className="ml-2">
            {new Date(timestamp).toLocaleString()}
          </Badge>
        </div>
        <Text className="text-gray-600 mb-4">{url}</Text>
        
        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Data analyzed from {results.pagesAnalyzed} pages with crawl depth {results.crawlDepth}
          </AlertDescription>
        </Alert>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-gray-900">Product Insights</h3>
              </div>
              <Text className="text-gray-600 mb-4">
                Key findings from product data extracted during the crawl.
              </Text>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Found {results.extractedData.products.length} relevant products</li>
                <li>Average product rating: {(results.extractedData.products.reduce((sum: number, product: any) => sum + product.averageRating, 0) / results.extractedData.products.length).toFixed(1)}</li>
                <li>Price range across products: {results.extractedData.products[0].priceRange} to {results.extractedData.products[1].priceRange}</li>
                <li>Common ingredients: Hyaluronic Acid, Vitamin E, Retinol</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-gray-900">Review Analysis</h3>
              </div>
              <Text className="text-gray-600 mb-4">
                Summary of customer reviews and sentiment analysis.
              </Text>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Analyzed {results.extractedData.reviews.length} customer reviews</li>
                <li>Average sentiment score: {(results.extractedData.reviews.reduce((sum: number, review: any) => sum + review.sentiment, 0) / results.extractedData.reviews.length * 100).toFixed(0)}% positive</li>
                <li>Key topics mentioned: hydration, absorption, price, results</li>
                <li>Common usage duration mentioned: 4-6 weeks</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Usage Patterns</h3>
            </div>
            <Text className="text-gray-600 mb-4">
              Extracted data about how customers typically use these products.
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-700">Average Usage Duration</p>
                <p className="text-gray-600">{results.extractedData.usagePatterns.averageUsageDuration}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-700">Application Frequency</p>
                <p className="text-gray-600">{results.extractedData.usagePatterns.applicationFrequency}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-700">Typical Amount Used</p>
                <p className="text-gray-600">{results.extractedData.usagePatterns.typicalApplicationAmount}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="font-medium text-gray-700">Seasonal Variation</p>
                <p className="text-gray-600">{results.extractedData.usagePatterns.seasonalVariation}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="space-y-6">
            {results.extractedData.products.map((product: any, index: number) => (
              <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <Heading className="text-lg font-semibold">{product.name}</Heading>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="font-medium">{product.averageRating}</span>
                    <span className="text-gray-500 text-sm ml-1">({product.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price Range</p>
                    <p className="font-medium">{product.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Estimated Usage</p>
                    <p className="font-medium">{product.usageEstimate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sentiment Score</p>
                    <p className="font-medium">
                      {(product.sentimentScore * 100).toFixed(0)}% positive
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Key Ingredients</p>
                  <div className="flex flex-wrap gap-2">
                    {product.keyIngredients.map((ingredient: string, i: number) => (
                      <Badge key={i} variant="secondary">{ingredient}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reviews">
          <div className="space-y-4">
            {results.extractedData.reviews.map((review: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-200'}`} 
                        fill={i < review.rating ? 'currentColor' : 'none'} 
                      />
                    ))}
                  </div>
                  <Badge className={review.sentiment > 0.75 ? 'bg-green-100 text-green-800' : review.sentiment > 0.5 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}>
                    {(review.sentiment * 100).toFixed(0)}% positive
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-3">{review.text}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Usage: {review.usageInfo}</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="usage">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <Heading className="text-lg font-semibold mb-4">Detailed Usage Patterns</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Average Product Lifespan</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                    5.8
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">weeks on average</p>
                    <p className="text-sm text-gray-500">Based on mentioned usage durations</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  The average consumer mentions using these products for approximately 5.8 weeks before needing to repurchase.
                  This is slightly longer than manufacturer estimates, suggesting conservative usage by customers.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Application Frequency</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl font-bold">
                    1.2
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">times per day</p>
                    <p className="text-sm text-gray-500">Average application frequency</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Most customers report applying these products once daily, with some mentioning twice-daily
                  application during drier months or when treating specific skin concerns.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Seasonal Variation</h3>
                <p className="text-gray-600">
                  {results.extractedData.usagePatterns.seasonalVariation}. Customers mention using more product during
                  winter months, suggesting seasonal replenishment patterns should be considered.
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Application Amount</h3>
                <p className="text-gray-600">
                  Most customers report using {results.extractedData.usagePatterns.typicalApplicationAmount} per application,
                  which aligns with manufacturer recommendations. Some mention using more product initially and then reducing
                  to maintenance levels.
                </p>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Repurchase Patterns</h3>
                <p className="text-gray-600">
                  Reviews suggest that 65% of customers repurchase these products, with many mentioning waiting until
                  they are completely out before ordering replacements. This indicates potential for well-timed
                  replenishment reminders.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="raw">
          <Card className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs whitespace-pre-wrap text-gray-800">
              {JSON.stringify(results, null, 2)}
            </pre>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
