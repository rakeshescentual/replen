
import { ProductsByCategory } from '@/types/personalized-recommendations';

export const personalizedProducts: ProductsByCategory = {
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
