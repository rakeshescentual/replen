
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { InfoIcon, Settings } from "lucide-react";
import CategorySection from './personalized/CategorySection';
import InfoSection from './personalized/InfoSection';
import { CategoryId } from '@/types/personalized-recommendations';
import { personalizedProducts } from '@/data/personalizedProductsData';

const PersonalizedValueRecommendations: React.FC = () => {
  const { toast } = useToast();
  const [personalizedEnabled, setPersonalizedEnabled] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<CategoryId, boolean>>({
    'skincare': true,
    'haircare': false,
    'makeup': false
  });
  
  const toggleSection = (section: CategoryId) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
  
  const expandAllSections = () => {
    const allExpanded = Object.fromEntries(
      Object.keys(expandedSections).map(key => [key, true])
    ) as Record<CategoryId, boolean>;
    
    setExpandedSections(allExpanded);
  };
  
  const collapseAllSections = () => {
    const allCollapsed = Object.fromEntries(
      Object.keys(expandedSections).map(key => [key, false])
    ) as Record<CategoryId, boolean>;
    
    setExpandedSections(allCollapsed);
  };
  
  const addToCart = (productId: string) => {
    toast({
      title: "Added to cart",
      description: "Product added to your cart successfully",
      duration: 3000
    });
  };
  
  const addToWishlist = (productId: string) => {
    toast({
      title: "Added to wishlist",
      description: "Product added to your wishlist successfully",
      duration: 3000
    });
  };
  
  const subscribeToProduct = (productId: string) => {
    toast({
      title: "Subscription Added",
      description: "This product has been added to your replenishment schedule",
      duration: 3000
    });
  };

  return (
    <Card className="border-blue-100 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-blue-800">Personalized Value Recommendations</CardTitle>
            <CardDescription className="text-gray-700">
              Products selected based on your preferences and usage patterns
            </CardDescription>
          </div>
          <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
            <Label htmlFor="personalization" className="text-sm text-gray-700">Personalized</Label>
            <Switch
              id="personalization"
              checked={personalizedEnabled}
              onCheckedChange={setPersonalizedEnabled}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {!personalizedEnabled ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <InfoIcon className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-lg font-medium text-gray-700 mb-2">Personalized recommendations are disabled</p>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Enable personalization to see products tailored to your preferences based on your
              browsing history, purchase patterns, and beauty profile.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setPersonalizedEnabled(true)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Enable Personalization
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing personalized recommendations based on your preferences and purchase history
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={expandAllSections}
                  className="text-xs"
                >
                  Expand All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={collapseAllSections}
                  className="text-xs"
                >
                  Collapse All
                </Button>
              </div>
            </div>
            
            {Object.keys(personalizedProducts).map(category => (
              <CategorySection
                key={category}
                category={category}
                products={personalizedProducts[category]}
                isExpanded={expandedSections[category as CategoryId]}
                onToggle={() => toggleSection(category as CategoryId)}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onSubscribe={subscribeToProduct}
              />
            ))}
            
            <InfoSection />
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t py-4">
        <p className="text-xs text-gray-500">
          Recommendations are updated daily based on your interactions and preferences. 
          Your data is handled in accordance with our privacy policy and GDPR regulations.
        </p>
      </CardFooter>
    </Card>
  );
};

export default PersonalizedValueRecommendations;
