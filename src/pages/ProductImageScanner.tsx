
import React from "react";
import { Page, Heading, Text } from "@/components/ui/shadcn";
import AppNavigation from "@/components/AppNavigation";
import ProductImageAnalyzer from "@/components/ProductImageAnalyzer";
import { toast } from "@/hooks/use-toast";

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
          <Heading className="text-2xl font-bold mb-2">Product Scanner</Heading>
          <Text className="text-gray-600">
            Take a photo of your nearly empty products to get personalized replenishment recommendations
          </Text>
        </header>

        <div className="grid grid-cols-1 gap-6">
          <ProductImageAnalyzer 
            onReorder={handleReorder}
            onSubscribe={handleSubscribe}
          />
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <Heading className="text-xl font-semibold mb-4">How Our AI Product Scanner Works</Heading>
            <div className="space-y-4">
              <p className="text-gray-700">
                Our advanced AI technology analyzes images of your beauty products to identify them and estimate how much product remains.
              </p>
              
              <h3 className="font-medium text-lg">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Product Recognition:</span> Our AI identifies your products even when labels are partially visible
                </li>
                <li>
                  <span className="font-medium">Usage Estimation:</span> Advanced algorithms calculate how much product remains
                </li>
                <li>
                  <span className="font-medium">Purchase History Integration:</span> Automatically matches with products you've purchased
                </li>
                <li>
                  <span className="font-medium">Personalized Recommendations:</span> Get timing suggestions based on your usage patterns
                </li>
                <li>
                  <span className="font-medium">One-Click Reordering:</span> Easily reorder or subscribe to your essentials
                </li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
                <h3 className="text-blue-800 font-medium mb-2">Privacy & Security</h3>
                <p className="text-blue-700 text-sm">
                  Your photos are processed securely and aren't stored permanently. Our image analysis happens on-device 
                  whenever possible to ensure your data stays private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ProductImageScanner;
