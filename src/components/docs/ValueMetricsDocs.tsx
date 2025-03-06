
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  TrendingUp, 
  DollarSign, 
  CalendarDays, 
  BarChart2, 
  Globe, 
  Search
} from "lucide-react";

const ValueMetricsDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Value Metrics System</Heading>
        <Text className="mb-6">
          The Value Metrics System helps Escentual.com customers understand the true value of products through sophisticated cost and usage analysis.
        </Text>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calculations">Calculations</TabsTrigger>
            <TabsTrigger value="internet-data">Internet Data Mining</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600" />
                  Value Metrics Overview
                </Heading>
                <Text className="mb-4">
                  The Value Metrics System calculates and presents clear value metrics for beauty products, helping Escentual.com customers make
                  informed purchasing decisions based on cost efficiency and product lifespan.
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-2">Core Value Metrics</h3>
                    <ul className="list-disc pl-6 space-y-1 text-blue-700">
                      <li>Cost-per-day calculation for all Escentual.com products</li>
                      <li>Estimated product lifespan based on usage patterns</li>
                      <li>Value score comparative ranking system</li>
                      <li>Cost efficiency over time analysis</li>
                      <li>Value-for-money percentile ranking within categories</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h3 className="font-semibold text-purple-800 mb-2">Key Benefits</h3>
                    <ul className="list-disc pl-6 space-y-1 text-purple-700">
                      <li>Objective cost-effectiveness comparisons</li>
                      <li>Transparent product lifetime valuations</li>
                      <li>Internet-data enhanced accuracy</li>
                      <li>Personalized value recommendations</li>
                      <li>Informed replenishment scheduling</li>
                      <li>Subscription value analysis</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                  <Heading className="text-lg font-medium mb-3 text-amber-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                    How Value Metrics Improve the Customer Experience
                  </Heading>
                  <Text className="text-amber-700 mb-4">
                    Value Metrics provide Escentual.com customers with transparent information that helps them:
                  </Text>
                  <ol className="list-decimal pl-6 space-y-2 text-amber-700">
                    <li>
                      <span className="font-medium">Make informed purchasing decisions</span> based on true cost over time, not just purchase price
                    </li>
                    <li>
                      <span className="font-medium">Compare similar products objectively</span> using standardized value measurements
                    </li>
                    <li>
                      <span className="font-medium">Understand the real value of premium products</span> that may last longer or require less product per application
                    </li>
                    <li>
                      <span className="font-medium">Identify the most cost-effective products</span> for their specific needs and usage patterns
                    </li>
                    <li>
                      <span className="font-medium">Plan replenishment timing</span> based on accurate product lifespan predictions
                    </li>
                    <li>
                      <span className="font-medium">Evaluate subscription options</span> with clear understanding of the value benefits
                    </li>
                  </ol>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="calculations">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Value Calculation Methodology
                </Heading>
                <Text className="mb-4">
                  Our value metrics are calculated using a sophisticated methodology that considers multiple factors 
                  beyond the simple retail price of Escentual.com products.
                </Text>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                  <Heading className="text-lg font-medium mb-3">Core Value Metrics Formulas</Heading>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">1. Cost Per Day</h3>
                      <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                        Cost Per Day = Product Price / Estimated Lifespan (in days)
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This fundamental metric shows the daily cost of using a product, enabling comparisons
                        across different price points and product sizes.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">2. Value Score</h3>
                      <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                        Value Score = (1 - (Cost Per Day / Category Average Cost Per Day)) * 50 + 50
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        The Value Score provides a normalized score from 0-100, with 50 representing average value
                        for the category. Scores above 50 indicate better than average value.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">3. Enhanced Value Score with Internet Data</h3>
                      <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                        Enhanced Value Score = Base Value Score * 0.7 + Internet Data Value Score * 0.3
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        We enhance our value calculations using internet-mined data, including sentiment analysis
                        and real-world usage patterns for greater accuracy.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">4. Subscription Value Benefit</h3>
                      <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                        Subscription Value Benefit = ((Regular Cost Per Day - Subscription Cost Per Day) / Regular Cost Per Day) * 100
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This shows the percentage savings gained through a subscription model compared to one-time purchases.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <Heading className="text-lg font-medium mb-3 text-green-800 flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-green-600" />
                    Product Lifespan Estimation
                  </Heading>
                  <Text className="text-green-700 mb-4">
                    Accurate product lifespan estimation is critical for meaningful value metrics. Our system:
                  </Text>
                  <ul className="list-disc pl-6 space-y-2 text-green-700">
                    <li>
                      <span className="font-medium">Starts with manufacturer guidelines</span> but improves upon them with real-world data
                    </li>
                    <li>
                      <span className="font-medium">Analyzes historical purchase frequency</span> from customer repurchase patterns
                    </li>
                    <li>
                      <span className="font-medium">Incorporates internet-mined usage data</span> from product reviews and beauty forums
                    </li>
                    <li>
                      <span className="font-medium">Adjusts for product category benchmarks</span> within specific beauty segments
                    </li>
                    <li>
                      <span className="font-medium">Accounts for personalized usage patterns</span> based on customer-specific behaviors
                    </li>
                    <li>
                      <span className="font-medium">Continuously refines estimates</span> through machine learning from ongoing data
                    </li>
                  </ul>
                </div>
              </section>
              
              <section>
                <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                  Value Comparison Methodologies
                </Heading>
                <Text className="mb-4">
                  Our system enables meaningful comparisons between Escentual.com products to help customers find the best value options.
                </Text>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 border text-left">Comparison Type</th>
                        <th className="py-2 px-4 border text-left">Methodology</th>
                        <th className="py-2 px-4 border text-left">Benefits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-4 border font-medium">Within-Category Comparison</td>
                        <td className="py-2 px-4 border">
                          Products are ranked by Value Score within their specific category (e.g., facial moisturizers)
                        </td>
                        <td className="py-2 px-4 border">
                          Allows customers to find the best value among directly comparable products
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">Price Tier Comparison</td>
                        <td className="py-2 px-4 border">
                          Products are compared within similar price brackets to determine best value at each price point
                        </td>
                        <td className="py-2 px-4 border">
                          Helps customers maximize value while staying within their budget constraints
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">Size-Adjusted Comparison</td>
                        <td className="py-2 px-4 border">
                          Products are normalized by volume/weight to ensure fair comparison regardless of packaging size
                        </td>
                        <td className="py-2 px-4 border">
                          Reveals hidden value in larger sizes or exposes poor value in mini/travel sizes
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">Ingredient-Based Comparison</td>
                        <td className="py-2 px-4 border">
                          Products with similar active ingredients are compared to identify best value for specific formulations
                        </td>
                        <td className="py-2 px-4 border">
                          Helps customers find cost-effective alternatives to premium-priced products
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 border font-medium">Subscription vs. One-Time</td>
                        <td className="py-2 px-4 border">
                          Compares the value metrics of subscription purchases against one-time purchases
                        </td>
                        <td className="py-2 px-4 border">
                          Quantifies the long-term value benefit of subscription options
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="internet-data">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  Internet Data Mining System
                </Heading>
                <Text className="mb-4">
                  Our Internet Data Mining System enhances value metrics by gathering and analyzing real-world 
                  product usage information from across the web.
                </Text>
                
                <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
                  <Heading className="text-lg font-medium mb-3 text-indigo-800">Data Sources</Heading>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-indigo-900 mb-2">Product Reviews</h3>
                      <p className="text-sm">
                        We analyze thousands of product reviews from retail sites, beauty blogs, and review platforms
                        to extract usage duration, application frequency, and satisfaction metrics.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-indigo-900 mb-2">Beauty Forums</h3>
                      <p className="text-sm">
                        Discussions on beauty forums provide valuable insights into how long products last in real-world
                        usage and how consumers evaluate cost-effectiveness.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-indigo-900 mb-2">Social Media</h3>
                      <p className="text-sm">
                        Social media platforms offer a wealth of user-generated content about product usage patterns,
                        empties posts, and repurchase decisions.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-indigo-900 mb-2">Beauty Influencers</h3>
                      <p className="text-sm">
                        Content from beauty influencers often includes detailed product usage information, application techniques,
                        and comparisons that inform our value metrics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Heading className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Search className="h-5 w-5 text-purple-600" />
                      Data Extraction Techniques
                    </Heading>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <span className="font-medium">Natural Language Processing</span>: Extracts product usage information from unstructured text
                      </li>
                      <li>
                        <span className="font-medium">Sentiment Analysis</span>: Assesses positive/negative opinions about product value
                      </li>
                      <li>
                        <span className="font-medium">Pattern Recognition</span>: Identifies common usage durations across multiple sources
                      </li>
                      <li>
                        <span className="font-medium">Entity Extraction</span>: Identifies product names, sizes, and prices for accurate matching
                      </li>
                      <li>
                        <span className="font-medium">Usage Pattern Mining</span>: Extracts application frequency and amount information
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <Heading className="text-lg font-medium mb-3 text-blue-800">Data Integration Process</Heading>
                    <ol className="list-decimal pl-6 space-y-2 text-blue-700">
                      <li>
                        <span className="font-medium">Data Collection</span>: Crawl web sources for relevant product mentions
                      </li>
                      <li>
                        <span className="font-medium">Text Processing</span>: Extract and normalize product usage information
                      </li>
                      <li>
                        <span className="font-medium">Data Validation</span>: Filter for relevance and remove outliers
                      </li>
                      <li>
                        <span className="font-medium">Insight Generation</span>: Calculate average usage durations and patterns
                      </li>
                      <li>
                        <span className="font-medium">Confidence Scoring</span>: Assign reliability ratings based on source and consensus
                      </li>
                      <li>
                        <span className="font-medium">Metric Enhancement</span>: Integrate insights with existing value metrics
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                  <Heading className="text-lg font-medium mb-3 text-green-800">Value Metric Enhancements</Heading>
                  <Text className="text-green-700 mb-4">
                    Internet data significantly enhances our value metrics in several ways:
                  </Text>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-green-800 mb-2">Improved Lifespan Accuracy</h3>
                      <p className="text-sm text-green-700">
                        Real-world usage data provides more accurate product lifespan estimates than manufacturer claims or theoretical calculations.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-green-800 mb-2">Sentiment-Enhanced Value</h3>
                      <p className="text-sm text-green-700">
                        Customer sentiment analysis adds a qualitative dimension to our value metrics, balancing pure cost calculations.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <h3 className="font-medium text-green-800 mb-2">Usage Pattern Insights</h3>
                      <p className="text-sm text-green-700">
                        Internet data reveals how products are actually used, including application frequency and amount per use.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="implementation">
            <div className="space-y-6">
              <section>
                <Heading className="text-xl font-semibold mb-4">Implementation Guide</Heading>
                <Text className="mb-4">
                  This section explains how the Value Metrics System is implemented within the Escentual.com ecosystem.
                </Text>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                  <Heading className="text-lg font-medium mb-3">System Architecture</Heading>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">1. Data Collection Layer</h3>
                      <ul className="list-disc pl-6 text-gray-700">
                        <li>Shopify product and order data API integration</li>
                        <li>Internet data mining system for external data</li>
                        <li>Customer purchase history analysis</li>
                        <li>Product metadata management</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">2. Processing Layer</h3>
                      <ul className="list-disc pl-6 text-gray-700">
                        <li>Value metric calculation engine</li>
                        <li>Machine learning for prediction refinement</li>
                        <li>Sentiment analysis processing</li>
                        <li>Comparative analysis algorithms</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">3. Storage Layer</h3>
                      <ul className="list-disc pl-6 text-gray-700">
                        <li>Shopify metafields for product-level metrics</li>
                        <li>Customer-specific value profiles</li>
                        <li>Historical value trend data</li>
                        <li>Category benchmark repository</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">4. Presentation Layer</h3>
                      <ul className="list-disc pl-6 text-gray-700">
                        <li>Storefront value metric displays</li>
                        <li>Customer personalized value dashboards</li>
                        <li>Value comparison tools</li>
                        <li>Merchant analytics dashboard</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
                  <Heading className="text-lg font-medium mb-3 text-blue-800">Gadget.dev Implementation</Heading>
                  <Text className="text-blue-700 mb-4">
                    The Value Metrics System is built on Gadget.dev, providing:
                  </Text>
                  <ul className="list-disc pl-6 space-y-2 text-blue-700">
                    <li>Scalable serverless infrastructure for value calculations</li>
                    <li>Scheduled jobs for data updates and periodic recalculations</li>
                    <li>API endpoints for Shopify and third-party integrations</li>
                    <li>Secure data storage for value metrics and benchmarks</li>
                    <li>Efficient processing for real-time value comparisons</li>
                    <li>Webhooks for event-driven updates to value metrics</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <Heading className="text-lg font-medium mb-3">Implementation Timeline</Heading>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-blue-700 font-medium mt-0.5 flex-shrink-0">1</div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Phase 1: Foundation (Completed)</h3>
                        <p className="text-sm text-gray-600">
                          Basic value metrics implementation with cost-per-day calculations and category comparisons
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-blue-700 font-medium mt-0.5 flex-shrink-0">2</div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Phase 2: Internet Data Integration (Current)</h3>
                        <p className="text-sm text-gray-600">
                          Implementation of internet data mining system and enhanced value metrics
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-blue-700 font-medium mt-0.5 flex-shrink-0">3</div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Phase 3: Personalization (Upcoming)</h3>
                        <p className="text-sm text-gray-600">
                          Customer-specific value profiles and personalized value recommendations
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center text-blue-700 font-medium mt-0.5 flex-shrink-0">4</div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">Phase 4: Advanced Analytics (Future)</h3>
                        <p className="text-sm text-gray-600">
                          Machine learning optimization and predictive value modeling
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ValueMetricsDocs;
