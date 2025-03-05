
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock product data - in a real app this would come from the Shopify API via Gadget.dev
const initialProducts = [
  {
    id: "1",
    title: "Daily Face Moisturizer",
    category: "Skincare",
    estimatedLifespan: 30, // days
    suggestedSubscription: "1 month",
    image: "https://placehold.co/40x40"
  },
  {
    id: "2",
    title: "Anti-Aging Serum",
    category: "Skincare",
    estimatedLifespan: 60,
    suggestedSubscription: "2 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "3",
    title: "Vitamin C Supplements",
    category: "Supplements",
    estimatedLifespan: 90,
    suggestedSubscription: "3 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "4",
    title: "Shampoo",
    category: "Hair Care",
    estimatedLifespan: 45,
    suggestedSubscription: "1.5 months",
    image: "https://placehold.co/40x40"
  },
  {
    id: "5",
    title: "Toothpaste",
    category: "Oral Care",
    estimatedLifespan: 30,
    suggestedSubscription: "1 month",
    image: "https://placehold.co/40x40"
  }
];

const ProductLifespanTable = () => {
  const [products, setProducts] = useState(initialProducts);
  
  const handleLifespanChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    setProducts(products.map(product => 
      product.id === id ? { ...product, estimatedLifespan: numValue } : product
    ));
  };
  
  const handleSaveChanges = () => {
    // In a real implementation, this would save to Gadget.dev backend
    toast({
      title: "Changes saved",
      description: "Product lifespan data has been updated",
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Est. Lifespan (days)</TableHead>
              <TableHead>Suggested Subscription</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.title} className="w-10 h-10 rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    value={product.estimatedLifespan}
                    onChange={(e) => handleLifespanChange(product.id, e.target.value)}
                    className="w-20"
                  />
                </TableCell>
                <TableCell>{product.suggestedSubscription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProductLifespanTable;
