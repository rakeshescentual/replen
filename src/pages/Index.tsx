
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppNavigation from '@/components/AppNavigation';
import PersonalizedValueRecommendations from '@/components/PersonalizedValueRecommendations';
import ValueBundleRecommendations from '@/components/ValueBundleRecommendations';
import SubscriptionValueCalculator from '@/components/SubscriptionValueCalculator';
import { ArrowRight, LineChart, Layers, RefreshCw, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-64 p-6 border-r bg-white">
        <AppNavigation />
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Escentual Value Optimization Platform</h1>
            <p className="text-gray-500 mt-2">
              Showcase the true value of premium products through advanced metrics
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="md:col-span-2 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Enhance Customer Value Perception</CardTitle>
                <CardDescription className="text-amber-700">
                  Our value metrics system helps customers understand why premium products are worth the investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-amber-900">
                  The Escentual Value Metrics system analyzes product cost efficiency, performance, 
                  customer satisfaction, and online sentiment to provide a comprehensive value score 
                  that justifies premium pricing through data-driven insights.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center mb-2">
                      <LineChart className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="font-medium">Data-Driven Value</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Combines cost-per-day metrics with customer satisfaction and online sentiment analysis
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200">
                    <div className="flex items-center mb-2">
                      <PackageCheck className="h-5 w-5 text-amber-600 mr-2" />
                      <h3 className="font-medium">Premium Justification</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Helps customers understand why premium products deliver superior long-term value
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-4">
                  <Button asChild variant="default" className="bg-amber-700 hover:bg-amber-800">
                    <Link to="/value-metrics">
                      View Value Metrics System
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-amber-300 text-amber-800">
                    <Link to="/value-comparison">
                      Compare Products
                      <Layers className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mb-8">
            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 w-full max-w-2xl mx-auto">
                <TabsTrigger value="recommendations">Personalized Value</TabsTrigger>
                <TabsTrigger value="bundles">Value Bundles</TabsTrigger>
                <TabsTrigger value="subscription">Subscription Value</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations">
                <PersonalizedValueRecommendations />
              </TabsContent>
              
              <TabsContent value="bundles">
                <ValueBundleRecommendations />
              </TabsContent>
              
              <TabsContent value="subscription">
                <SubscriptionValueCalculator />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-bold mb-4">Revenue Optimization Through Value</h2>
            <p className="text-gray-600 mb-6">
              Our value-driven approach is designed to maximize customer satisfaction while increasing revenue 
              through higher conversion rates on premium products, increased average order value, 
              and improved customer retention.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-blue-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <LineChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">Higher Conversions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Value metrics increase conversion rates on premium products by 24% by justifying the investment
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-green-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <Layers className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-base">Increased Basket Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Value-based bundles increase average order value by 35% through complementary product purchases
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-purple-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <RefreshCw className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-base">Improved Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Optimized subscription intervals increase customer retention by 47% and reduce churn
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="bg-amber-100 rounded-full p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <PackageCheck className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-base">Trust & Authority</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Data-driven value messaging builds customer trust and positions Escentual as an authority
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link to="/documentation">
                  View Implementation Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
