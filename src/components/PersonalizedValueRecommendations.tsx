
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, PackagePlus, Clock, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalizedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  valueScore: number;
  category: string;
  personalizedReason: string;
  matchScore: number;
}

const PersonalizedValueRecommendations: React.FC = () => {
  const { toast } = useToast();
  const [personalizedEnabled, setPersonalizedEnabled] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'skincare': true,
    'haircare': false,
    'makeup': false
  });
  
  const personalizedProducts: Record<string, PersonalizedProduct[]> = {
    'skincare': [
      {
        id: "1",
        title: "Premium Hyaluronic Acid Serum",
        image: "https://placehold.co/80x80",
        price: 59.99,
        valueScore: 87,
        category: "Skincare",
        personalizedReason: "Based on your preference for hydrating products and your skin type",
        matchScore: 94
      },
      {
        id: "2",
        title: "Nightly Retinol Treatment",
        image: "https://placehold.co/80x80",
        price: 75.50,
        valueScore: 84,
        category: "Skincare",
        personalizedReason: "Complements your anti-aging routine and previous purchases",
        matchScore: 91
      }
    ],
    'haircare': [
      {
        id: "3",
        title: "Luxury Hair Mask Treatment",
        image: "https://placehold.co/80x80",
        price: 45.00,
        valueScore: 83,
        category: "Hair Care",
        personalizedReason: "Based on your hair type and treatment history",
        matchScore: 88
      }
    ],
    'makeup': [
      {
        id: "4",
        title: "Long-Lasting Premium Foundation",
        image: "https://placehold.co/80x80",
        price: 48.50,
        valueScore: 86,
        category: "Makeup",
        personalizedReason: "Matches your shade profile and previous brand preferences",
        matchScore: 92
      }
    ]
  };
  
  const toggleSection = (section: string) => {
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
  
  // Function to get color class for match score
  const getMatchColorClass = (score: number): string => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };
  
  // Function to get color class for value score
  const getScoreColorClass = (score: number): string => {
    if (score >= 80) return "bg-amber-100 text-amber-800";
    if (score >= 70) return "bg-amber-50 text-amber-700";
    if (score >= 60) return "bg-yellow-50 text-yellow-700";
    return "bg-gray-100 text-gray-800";
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
              <div key={category} className="border rounded-lg overflow-hidden">
                <div 
                  className="bg-gray-50 p-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection(category)}
                >
                  <h3 className="font-medium capitalize">{category} Recommendations</h3>
                  <Button variant="ghost" size="sm">
                    {expandedSections[category] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                
                {expandedSections[category] && (
                  <div className="p-4 divide-y">
                    {personalizedProducts[category].map(product => (
                      <div key={product.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex">
                          <div className="flex-shrink-0 mr-4">
                            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{product.title}</h4>
                                <div className="flex items-center mt-1 space-x-2">
                                  <Badge className={getScoreColorClass(product.valueScore)}>
                                    {product.valueScore} Value
                                  </Badge>
                                  <Badge variant="outline" className={getMatchColorClass(product.matchScore)}>
                                    {product.matchScore}% Match
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{product.personalizedReason}</p>
                              </div>
                              <span className="font-medium">£{product.price.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex space-x-2 mt-4">
                              <Button onClick={() => addToCart(product.id)}>
                                Add to Cart
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => subscribeToProduct(product.id)}>
                                <Clock className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => addToWishlist(product.id)}>
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <p className="font-medium mb-2">Why these recommendations?</p>
              <p>
                Our AI analyzes your purchase history, browsing behavior, product reviews, and usage 
                patterns to recommend products with the highest value for your specific needs. 
                We prioritize products that have proven value based on cost efficiency, 
                effectiveness, and customer satisfaction.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedValueRecommendations;
