
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
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
  
  const addToCart = (productId: string) => {
    toast({
      description: "Product added to your cart"
    });
  };
  
  const addToWishlist = (productId: string) => {
    toast({
      description: "Product added to your wishlist"
    });
  };
  
  const subscribeToProduct = (productId: string) => {
    toast({
      title: "Subscription Added",
      description: "This product has been added to your replenishment schedule"
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personalized Value Recommendations</CardTitle>
            <CardDescription>
              Products selected based on your preferences and usage patterns
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="personalization"
              checked={personalizedEnabled}
              onCheckedChange={setPersonalizedEnabled}
            />
            <Label htmlFor="personalization">Personalized</Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!personalizedEnabled ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">Personalized recommendations are disabled</p>
            <p className="text-sm">Enable personalization to see products tailored to your preferences</p>
          </div>
        ) : (
          <div className="space-y-6">
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
    </Card>
  );
};

export default PersonalizedValueRecommendations;
