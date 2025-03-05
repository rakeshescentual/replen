
import React, { useState, useEffect } from 'react';
import { Card, Heading, Text } from '@/components/ui/shadcn';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Loader2, TrendingUp, MessageSquare, Users, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useSentimentAnalysis, SentimentAnalysisResult, SentimentTrend } from '@/utils/AISentimentAnalysisService';
import { AppNavigation } from '@/components/AppNavigation';

// Mock product data
const mockProducts = [
  { id: 'prod_001', name: 'Hydrating Facial Cleanser', category: 'skincare' },
  { id: 'prod_002', name: 'Intensive Repair Night Cream', category: 'skincare' },
  { id: 'prod_003', name: 'Volumizing Shampoo', category: 'haircare' },
  { id: 'prod_004', name: 'Daily Multivitamin', category: 'supplements' }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AISentimentAnalysis = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [sentimentData, setSentimentData] = useState<SentimentAnalysisResult | null>(null);
  const [trendData, setTrendData] = useState<SentimentTrend | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTrend, setIsLoadingTrend] = useState(false);
  const [comparisonData, setComparisonData] = useState<Record<string, number> | null>(null);

  const sentimentService = useSentimentAnalysis();

  // Load sentiment data when product changes
  useEffect(() => {
    const fetchSentimentData = async () => {
      if (!selectedProduct) return;
      
      setIsLoading(true);
      try {
        const result = await sentimentService.analyzeProduct(selectedProduct.id, {
          includeReviews: true,
          includeSocialMedia: true,
          includeWebMentions: true
        });
        
        setSentimentData(result);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
        toast({
          title: 'Failed to load sentiment data',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSentimentData();
  }, [selectedProduct]);

  // Load trend data when product or timeframe changes
  useEffect(() => {
    const fetchTrendData = async () => {
      if (!selectedProduct) return;
      
      setIsLoadingTrend(true);
      try {
        const result = await sentimentService.getSentimentTrend(selectedProduct.id, timeframe);
        setTrendData(result);
      } catch (error) {
        console.error('Error fetching trend data:', error);
      } finally {
        setIsLoadingTrend(false);
      }
    };

    fetchTrendData();
  }, [selectedProduct, timeframe]);

  // Load comparison data
  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const productIds = mockProducts.map(p => p.id);
        const result = await sentimentService.compareProducts(productIds);
        setComparisonData(result);
      } catch (error) {
        console.error('Error fetching comparison data:', error);
      }
    };

    if (activeTab === 'comparison') {
      fetchComparisonData();
    }
  }, [activeTab]);

  // Format data for review distribution chart
  const getReviewDistributionData = () => {
    if (!sentimentData?.reviewSentiment) return [];
    
    const { distribution } = sentimentData.reviewSentiment;
    return [
      { name: 'Excellent', value: distribution.excellent },
      { name: 'Good', value: distribution.good },
      { name: 'Neutral', value: distribution.neutral },
      { name: 'Poor', value: distribution.poor },
      { name: 'Bad', value: distribution.bad }
    ];
  };

  // Format data for social media sentiment
  const getSocialMediaData = () => {
    if (!sentimentData?.socialMediaSentiment) return [];
    
    const { positive, neutral, negative } = sentimentData.socialMediaSentiment;
    return [
      { name: 'Positive', value: positive },
      { name: 'Neutral', value: neutral },
      { name: 'Negative', value: negative }
    ];
  };

  // Format data for comparison chart
  const getComparisonChartData = () => {
    if (!comparisonData) return [];
    
    return mockProducts.map(product => ({
      name: product.name.split(' ').slice(0, 2).join(' '), // Shorten name
      score: comparisonData[product.id] ? Math.round(comparisonData[product.id] * 100) : 0
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <Heading className="text-3xl font-bold">AI Sentiment Analysis</Heading>
          <Text className="text-muted-foreground">
            Understand how customers feel about your products across reviews and social media
          </Text>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <Heading className="text-lg font-medium mb-2">Select Product</Heading>
              <div className="space-y-2">
                {mockProducts.map(product => (
                  <Button
                    key={product.id}
                    variant={selectedProduct.id === product.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </Button>
                ))}
              </div>
              
              {sentimentData && (
                <div className="mt-6 space-y-4">
                  <Separator />
                  <div>
                    <Text className="text-sm text-muted-foreground">Overall Sentiment</Text>
                    <div className="mt-1 flex items-center">
                      <div 
                        className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden"
                        aria-label={`Sentiment score: ${Math.round(sentimentData.score * 100)}%`}
                      >
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-green-500"
                          style={{ width: `${sentimentData.score * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 font-medium">
                        {Math.round(sentimentData.score * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm text-muted-foreground">Data Confidence</Text>
                    <div className="mt-1 flex items-center">
                      <div 
                        className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden"
                        aria-label={`Confidence score: ${Math.round(sentimentData.confidence * 100)}%`}
                      >
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${sentimentData.confidence * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 font-medium">
                        {Math.round(sentimentData.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Text className="text-sm text-muted-foreground">Data Sources</Text>
                    <Text className="font-medium">{sentimentData.sources} sources analyzed</Text>
                  </div>
                  
                  {trendData && (
                    <div>
                      <Text className="text-sm text-muted-foreground">Trend</Text>
                      <div className="flex items-center">
                        <Text className={`font-medium ${trendData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {trendData.changePercent >= 0 ? '+' : ''}{trendData.changePercent}%
                        </Text>
                        <TrendingUp 
                          className={`ml-1 h-4 w-4 ${trendData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Card className="p-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <Text>Analyzing sentiment data...</Text>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <Heading className="text-xl font-bold">{selectedProduct.name}</Heading>
                    <Text className="text-muted-foreground capitalize">
                      Category: {selectedProduct.category}
                    </Text>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="reviews">Reviews</TabsTrigger>
                      <TabsTrigger value="social">Social Media</TabsTrigger>
                      <TabsTrigger value="comparison">Comparison</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="pt-4">
                      {sentimentData ? (
                        <>
                          <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                              <Heading className="text-lg font-medium">Sentiment Over Time</Heading>
                              <div className="flex space-x-2">
                                {['week', 'month', 'quarter', 'year'].map((period) => (
                                  <Button 
                                    key={period}
                                    variant={timeframe === period ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setTimeframe(period as any)}
                                  >
                                    {period.charAt(0).toUpperCase() + period.slice(1)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            {isLoadingTrend ? (
                              <div className="flex justify-center p-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                              </div>
                            ) : trendData?.periods ? (
                              <ResponsiveContainer width="100%" height={250}>
                                <AreaChart
                                  data={trendData.periods}
                                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                                >
                                  <defs>
                                    <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    dataKey="date" 
                                    tickFormatter={(date) => {
                                      const d = new Date(date);
                                      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                                    }}
                                  />
                                  <YAxis 
                                    domain={[0, 1]} 
                                    tickFormatter={(value) => `${Math.round(value * 100)}%`}
                                  />
                                  <Tooltip 
                                    formatter={(value) => [`${Math.round(Number(value) * 100)}%`, 'Sentiment']}
                                    labelFormatter={(label) => {
                                      const d = new Date(label as string);
                                      return d.toLocaleDateString(undefined, { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                      });
                                    }}
                                  />
                                  <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#8884d8" 
                                    fillOpacity={1} 
                                    fill="url(#sentimentGradient)" 
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            ) : (
                              <div className="text-center p-8 text-muted-foreground">
                                No trend data available
                              </div>
                            )}
                          </div>
                          
                          <div className="mb-6">
                            <Heading className="text-lg font-medium mb-2">Key Phrases</Heading>
                            <div className="flex flex-wrap gap-2">
                              {sentimentData.keywords.map((keyword, index) => (
                                <div 
                                  key={index} 
                                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                                >
                                  {keyword}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Heading className="text-lg font-medium mb-4">
                              AI-Generated Description Enhancements
                            </Heading>
                            <Button 
                              variant="outline" 
                              className="mb-4"
                              onClick={async () => {
                                toast({
                                  title: "Generating enhancements",
                                  description: "This may take a moment..."
                                });
                                
                                const enhancements = await sentimentService.enhanceDescription(selectedProduct.id);
                                
                                if (enhancements.length) {
                                  toast({
                                    title: "Generated product description enhancements",
                                    description: "Based on positive customer sentiment"
                                  });
                                }
                              }}
                            >
                              Generate Description Enhancements
                            </Button>
                            
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                              <li>Generate product descriptions based on positive customer sentiment</li>
                              <li>Highlight key benefits mentioned in customer reviews</li>
                              <li>Emphasize top-rated features based on sentiment analysis</li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-8 text-muted-foreground">
                          No sentiment data available for this product
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="pt-4">
                      {sentimentData?.reviewSentiment ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <Heading className="text-lg font-medium mb-2">Review Distribution</Heading>
                              <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                  <Pie
                                    data={getReviewDistributionData()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {getReviewDistributionData().map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value) => [value, 'Reviews']} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div>
                              <Heading className="text-lg font-medium mb-2">Review Analytics</Heading>
                              <div className="space-y-4">
                                <div>
                                  <Text className="text-sm text-muted-foreground">
                                    Average Rating
                                  </Text>
                                  <div className="flex items-center">
                                    <Text className="text-3xl font-bold">
                                      {(sentimentData.reviewSentiment.average * 5).toFixed(1)}
                                    </Text>
                                    <Text className="text-muted-foreground ml-1">/ 5</Text>
                                  </div>
                                </div>
                                
                                <div>
                                  <Text className="text-sm text-muted-foreground">
                                    Total Reviews
                                  </Text>
                                  <Text className="text-3xl font-bold">
                                    {sentimentData.reviewSentiment.count}
                                  </Text>
                                </div>
                                
                                <div>
                                  <Text className="text-sm text-muted-foreground">
                                    Positive Reviews
                                  </Text>
                                  <Text className="text-2xl font-bold text-green-500">
                                    {sentimentData.reviewSentiment.distribution.excellent + 
                                      sentimentData.reviewSentiment.distribution.good}
                                    <span className="text-sm text-muted-foreground font-normal ml-1">
                                      ({Math.round((sentimentData.reviewSentiment.distribution.excellent + 
                                        sentimentData.reviewSentiment.distribution.good) / 
                                        sentimentData.reviewSentiment.count * 100)}%)
                                    </span>
                                  </Text>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Heading className="text-lg font-medium mb-2">Key Topics in Reviews</Heading>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Card className="p-4 border-l-4 border-l-green-500">
                                <Heading className="text-base font-medium mb-1">Most Positive</Heading>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  {sentimentData.keywords.slice(0, 3).map((keyword, idx) => (
                                    <li key={idx}>{keyword}</li>
                                  ))}
                                </ul>
                              </Card>
                              
                              <Card className="p-4 border-l-4 border-l-orange-500">
                                <Heading className="text-base font-medium mb-1">Areas for Improvement</Heading>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Packaging design</li>
                                  <li>Delivery speed</li>
                                  <li>Price point</li>
                                </ul>
                              </Card>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-8 text-muted-foreground">
                          No review data available for this product
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="social" className="pt-4">
                      {sentimentData?.socialMediaSentiment ? (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <Heading className="text-lg font-medium mb-2">Social Media Sentiment</Heading>
                              <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                  <Pie
                                    data={getSocialMediaData()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    <Cell fill="#4ade80" />
                                    <Cell fill="#facc15" />
                                    <Cell fill="#f87171" />
                                  </Pie>
                                  <Tooltip formatter={(value) => [value, 'Mentions']} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            
                            <div>
                              <Heading className="text-lg font-medium mb-2">Social Media Metrics</Heading>
                              <div className="space-y-4">
                                <Card className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="rounded-full bg-blue-100 p-2 mr-3">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                      </div>
                                      <div>
                                        <Text className="font-medium">Total Mentions</Text>
                                        <Text className="text-muted-foreground text-sm">
                                          Across all platforms
                                        </Text>
                                      </div>
                                    </div>
                                    <Text className="text-xl font-bold">
                                      {sentimentData.sources}
                                    </Text>
                                  </div>
                                </Card>
                                
                                <Card className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <div className="rounded-full bg-purple-100 p-2 mr-3">
                                        <Users className="h-5 w-5 text-purple-600" />
                                      </div>
                                      <div>
                                        <Text className="font-medium">Reach</Text>
                                        <Text className="text-muted-foreground text-sm">
                                          Estimated audience
                                        </Text>
                                      </div>
                                    </div>
                                    <Text className="text-xl font-bold">
                                      {(Math.floor(Math.random() * 900) + 100)}K
                                    </Text>
                                  </div>
                                </Card>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Heading className="text-lg font-medium mb-4">Top Social Media Mentions</Heading>
                            <div className="space-y-4">
                              {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-4">
                                  <div className="flex justify-between">
                                    <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                                      <div>
                                        <Text className="font-medium">User123{i}</Text>
                                        <Text className="text-muted-foreground text-sm">
                                          @username{i} · {Math.floor(Math.random() * 24) + 1}h
                                        </Text>
                                      </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <Text className="mt-2">
                                    {[
                                      "Loving my new purchase! This product is amazing and exactly what I was looking for. #recommended",
                                      "Finally found something that works for me. The results are incredible!",
                                      "Great customer service and product quality. Will definitely purchase again."
                                    ][i-1]}
                                  </Text>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center p-8 text-muted-foreground">
                          No social media data available for this product
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="comparison" className="pt-4">
                      {comparisonData ? (
                        <div>
                          <Heading className="text-lg font-medium mb-4">Sentiment Comparison</Heading>
                          
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                              data={getComparisonChartData()}
                              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis tickFormatter={(value) => `${value}%`} />
                              <Tooltip formatter={(value) => [`${value}%`, 'Sentiment Score']} />
                              <Legend />
                              <Bar dataKey="score" fill="#8884d8" name="Sentiment Score (%)" />
                            </BarChart>
                          </ResponsiveContainer>
                          
                          <div className="mt-6">
                            <Heading className="text-lg font-medium mb-2">
                              Sentiment Analysis Insights
                            </Heading>
                            <Text className="mb-4">
                              {selectedProduct.name} is ranked {
                                Object.entries(comparisonData)
                                  .sort((a, b) => b[1] - a[1])
                                  .findIndex(([id]) => id === selectedProduct.id) + 1
                              } out of {Object.keys(comparisonData).length} products in terms of customer sentiment.
                            </Text>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <Card className="p-4">
                                <Heading className="text-base font-medium mb-2">Strengths</Heading>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Strong positive sentiment across review platforms</li>
                                  <li>High engagement on social media</li>
                                  <li>Consistent positive mentions of product efficacy</li>
                                </ul>
                              </Card>
                              
                              <Card className="p-4">
                                <Heading className="text-base font-medium mb-2">Opportunities</Heading>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Highlight positive attributes in marketing materials</li>
                                  <li>Leverage high sentiment for cross-selling opportunities</li>
                                  <li>Use testimonials from positive social media mentions</li>
                                </ul>
                              </Card>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISentimentAnalysis;
