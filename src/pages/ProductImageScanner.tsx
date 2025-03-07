
import React from "react";
import { Page, Heading, Text } from "@/components/ui/shadcn";
import AppNavigation from "@/components/AppNavigation";
import ProductImageAnalyzer from "@/components/ProductImageAnalyzer";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Camera, RefreshCw, ShoppingCart } from "lucide-react";

const ProductImageScanner = () => {
  const handleReorder = (productId: string) => {
    toast({
      title: "Product Added to Cart",
      description: `Product ID ${productId} has been added to your cart.`
    });
  };

  const handleSubscribe = (productId: string, interval: number) => {
    toast({
      title: "Subscription Created",
      description: `You've subscribed to product ID ${productId}. It will be delivered every ${interval} days.`
    });
  };

  return (
    <Page className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Heading className="text-2xl font-bold">AI Product Scanner</Heading>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Sparkles className="h-3 w-3 mr-1.5" />
              New Feature
            </Badge>
          </div>
          <Text className="text-gray-600 max-w-2xl">
            Take a photo of your nearly empty products to get personalized replenishment recommendations
            and never run out of your essentials again.
          </Text>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <ProductImageAnalyzer 
            onReorder={handleReorder}
            onSubscribe={handleSubscribe}
          />
          
          <Card className="bg-white p-6 rounded-lg border shadow-sm">
            <Heading className="text-xl font-semibold mb-4">How Our AI Product Scanner Works</Heading>
            <div className="space-y-4">
              <p className="text-gray-700">
                Our advanced AI technology analyzes images of your beauty products to identify them and estimate how much product remains.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 text-blue-700 p-3 rounded-full mb-3">
                    <Camera size={24} />
                  </div>
                  <h3 className="font-medium mb-2">Product Recognition</h3>
                  <p className="text-sm text-gray-700">
                    Our AI identifies your products even when labels are partially visible or damaged
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 text-purple-700 p-3 rounded-full mb-3">
                    <RefreshCw size={24} />
                  </div>
                  <h3 className="font-medium mb-2">Usage Estimation</h3>
                  <p className="text-sm text-gray-700">
                    Advanced algorithms calculate how much product remains and predict when you'll need to reorder
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 text-green-700 p-3 rounded-full mb-3">
                    <ShoppingCart size={24} />
                  </div>
                  <h3 className="font-medium mb-2">One-Click Reordering</h3>
                  <p className="text-sm text-gray-700">
                    Easily reorder or subscribe to your essentials with personalized delivery timing
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mt-6">
                <h3 className="text-blue-800 font-medium mb-3">Privacy & Security</h3>
                <p className="text-blue-700 text-sm">
                  Your photos are processed securely and aren't stored permanently. Our image analysis happens on-device 
                  whenever possible to ensure your data stays private. We only use the information to help you manage
                  your beauty essentials more effectively.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default ProductImageScanner;
