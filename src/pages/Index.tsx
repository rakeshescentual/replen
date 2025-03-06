
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppNavigation from '@/components/AppNavigation';
import PersonalizedValueRecommendations from '@/components/PersonalizedValueRecommendations';
import ValueBundleRecommendations from '@/components/ValueBundleRecommendations';
import SubscriptionValueCalculator from '@/components/SubscriptionValueCalculator';
import { ArrowRight, LineChart, Layers, RefreshCw, PackageCheck, Home, Settings, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 md:p-6 md:border-r md:bg-white md:shadow-sm">
        <div className="mb-8">
          <h2 className="font-bold text-xl text-blue-600 mb-1">Escentual Value</h2>
          <p className="text-xs text-gray-500">Optimization Platform</p>
        </div>
        <nav className="space-y-1">
          <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
            <Home className="mr-3 h-5 w-5 text-blue-500" />
            Dashboard
          </Link>
          <Link to="/value-metrics" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <LineChart className="mr-3 h-5 w-5 text-gray-400" />
            Value Metrics
          </Link>
          <Link to="/value-comparison" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <Layers className="mr-3 h-5 w-5 text-gray-400" />
            Compare Products
          </Link>
          <Link to="/my-replenishments" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <User className="mr-3 h-5 w-5 text-gray-400" />
            My Replenishments
          </Link>
          <Link to="/documentation" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <BookOpen className="mr-3 h-5 w-5 text-gray-400" />
            Documentation
          </Link>
          <Link to="/settings" className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
            <Settings className="mr-3 h-5 w-5 text-gray-400" />
            Settings
          </Link>
        </nav>
      </div>

      <div className="flex-1">
        {/* Mobile navigation bar */}
        <div className="md:hidden">
          <AppNavigation />
        </div>
        
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              Escentual Value Optimization Platform
            </h1>
            <p className="text-gray-500 mt-2">
              Showcase the true value of premium products through advanced metrics
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="md:col-span-2 overflow-hidden border-0 shadow-lg bg-gradient-to-r from-amber-50 to-amber-100">
              <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 bg-amber-300 rounded-full opacity-10 -mt-16 -mr-16"></div>
              <CardHeader>
                <CardTitle className="text-amber-800 text-xl md:text-2xl">Enhance Customer Value Perception</CardTitle>
                <CardDescription className="text-amber-700">
                  Our value metrics system helps customers understand why premium products are worth the investment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-amber-900 mb-6">
                  The Escentual Value Metrics system analyzes product cost efficiency, performance, 
                  customer satisfaction, and online sentiment to provide a comprehensive value score 
                  that justifies premium pricing through data-driven insights.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-amber-100 rounded-full mr-3">
                        <LineChart className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Data-Driven Value</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-11">
                      Combines cost-per-day metrics with customer satisfaction and online sentiment analysis
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-amber-100 rounded-full mr-3">
                        <PackageCheck className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="font-medium">Premium Justification</h3>
                    </div>
                    <p className="text-sm text-gray-600 pl-11">
                      Helps customers understand why premium products deliver superior long-term value
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="default" className="bg-amber-700 hover:bg-amber-800 shadow-sm">
                    <Link to="/value-metrics">
                      View Value Metrics System
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-amber-300 text-amber-800 hover:bg-amber-100">
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
              <TabsList className="grid grid-cols-3 mb-6 w-full max-w-2xl mx-auto bg-gray-100 p-1">
                <TabsTrigger value="recommendations" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Personalized Value
                </TabsTrigger>
                <TabsTrigger value="bundles" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Value Bundles
                </TabsTrigger>
                <TabsTrigger value="subscription" className="text-sm rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Subscription Value
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recommendations" className="border-0 p-0">
                <PersonalizedValueRecommendations />
              </TabsContent>
              
              <TabsContent value="bundles" className="border-0 p-0">
                <ValueBundleRecommendations />
              </TabsContent>
              
              <TabsContent value="subscription" className="border-0 p-0">
                <SubscriptionValueCalculator />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Revenue Optimization Through Value</h2>
            <p className="text-gray-600 mb-6">
              Our value-driven approach is designed to maximize customer satisfaction while increasing revenue 
              through higher conversion rates on premium products, increased average order value, 
              and improved customer retention.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border hover:shadow-md transition-shadow">
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
              
              <Card className="border hover:shadow-md transition-shadow">
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
              
              <Card className="border hover:shadow-md transition-shadow">
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
              
              <Card className="border hover:shadow-md transition-shadow">
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
              <Button asChild variant="outline" className="hover:bg-gray-50">
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
