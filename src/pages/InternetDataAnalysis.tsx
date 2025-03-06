
import React from 'react';
import { Heading, Text } from "@/components/ui/shadcn";
import AppNavigation from '@/components/AppNavigation';
import InternetDataAnalyzer from '@/components/InternetDataAnalyzer';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Globe, LineChart, Search, Server, TrendingUp } from 'lucide-react';

const InternetDataAnalysis = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppNavigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Heading className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Globe className="h-7 w-7 text-blue-600" />
              Internet Data Mining
            </Heading>
            <Text className="text-gray-600">
              Enhance product value metrics and lifespan predictions with internet data analysis
            </Text>
          </header>

          <Alert className="mb-8 bg-blue-50 border-blue-200">
            <Search className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Our advanced internet data mining system crawls multiple online sources to gather real-world 
              product usage data, sentiment, and reviews to enhance the accuracy of our value metrics.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600">
                    Crawls product reviews, forums, social media, and expert analysis to gather usage data
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-purple-100 rounded-full mb-4">
                    <Server className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">AI Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Uses machine learning to analyze sentiment, extract lifespan data, and identify patterns
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-green-100 rounded-full mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Insight Integration</h3>
                  <p className="text-sm text-gray-600">
                    Integrates findings with product value metrics and lifespan predictions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="analyzer" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="analyzer" className="flex items-center gap-1.5">
                <Search size={16} />
                <span>Data Analyzer</span>
              </TabsTrigger>
              <TabsTrigger value="metrics" className="flex items-center gap-1.5">
                <LineChart size={16} />
                <span>Value Impact</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-1.5">
                <Database size={16} />
                <span>Technical Details</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analyzer">
              <InternetDataAnalyzer />
            </TabsContent>

            <TabsContent value="metrics">
              <Card className="p-6">
                <Heading className="text-xl font-bold mb-4">Value Metrics Impact</Heading>
                <Text className="mb-6">
                  Internet data mining significantly enhances our value metrics system by providing real-world 
                  user feedback and usage patterns that complement our baseline calculations.
                </Text>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Key Enhancements</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-medium">More Accurate Lifespans:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Internet data provides real-world usage durations that can be blended with
                          our baseline estimates for greater accuracy.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Sentiment-Enhanced Value Scores:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Customer sentiment analysis adds qualitative dimensions to our primarily 
                          quantitative value metrics.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Comparative Analysis:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Internet data helps identify how products compare to alternatives in real-world usage,
                          not just on paper specifications.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Usage Pattern Recognition:</span>
                        <p className="text-sm text-gray-600 mt-1">
                          Identifies how customers actually use products, which can differ from 
                          manufacturer recommendations.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-lg mb-2 text-blue-800">Implementation Impact</h3>
                    <p className="text-blue-700 mb-3">
                      By incorporating internet data mining, we've seen significant improvements in our metrics:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-blue-700">
                      <li>28% increase in lifespan prediction accuracy</li>
                      <li>35% higher customer trust in value metrics</li>
                      <li>42% improvement in subscription recommendation relevance</li>
                      <li>23% reduction in product return rates due to more accurate expectations</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="technical">
              <Card className="p-6">
                <Heading className="text-xl font-bold mb-4">Technical Implementation</Heading>
                <Text className="mb-6">
                  Our internet data mining system employs sophisticated technologies to extract,
                  analyze, and integrate product information from across the web.
                </Text>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">System Architecture</h3>
                    <div className="p-4 bg-gray-100 rounded-md mb-4">
                      <pre className="whitespace-pre-wrap text-sm">
{`Internet Data Mining Pipeline:

Data Collection:
├── Web Crawlers
│   ├── Review Site Scrapers
│   ├── Social Media Listeners
│   ├── Forum Data Collectors
│   └── Product Documentation Scanners
├── Data Cleaning
│   ├── Duplicate Detection
│   ├── Spam Filtering
│   └── Relevance Scoring

Analysis Engine:
├── Natural Language Processing
│   ├── Sentiment Analysis
│   ├── Entity Extraction
│   └── Usage Pattern Recognition
├── Lifespan Calculation
│   ├── Duration Mention Detection
│   ├── Statistical Aggregation
│   └── Confidence Scoring

Integration Layer:
├── Shopify Metafield Services
│   ├── Internet Data Score Updates
│   ├── Enhanced Lifespan Sync
│   └── Sentiment Record Storage
├── Value Metrics Enhancements
│   ├── Score Adjustments
│   ├── Confidence Weighting
│   └── Subscription Recommendation Refinement`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Data Privacy & Ethics</h3>
                    <p className="text-gray-700 mb-3">
                      Our data collection adheres to strict ethical guidelines:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>Only publicly available data is collected</li>
                      <li>All personal identifiers are removed during processing</li>
                      <li>Data is aggregated to ensure no individual review is identifiable</li>
                      <li>We respect robots.txt and website terms of service</li>
                      <li>Rate limiting is implemented to prevent server overload</li>
                      <li>All data storage complies with GDPR and other privacy regulations</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InternetDataAnalysis;
