
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const handleLifespanChange = (id: string, value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    
    setProducts(products.map(product => 
      product.id === id ? { ...product, estimatedLifespan: numValue } : product
    ));
  };

  const getLifespanColorClass = (days: number) => {
    if (days <= 14) return "text-red-600";
    if (days <= 30) return "text-yellow-600";
    return "text-green-600";
  };
  
  const handleSaveChanges = () => {
    // In a real implementation, this would save to Gadget.dev backend
    toast({
      title: "Changes saved",
      description: "Product lifespan data has been updated",
    });
  };

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </div>
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border rounded p-2 w-full md:w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
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
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50">
                  <TableCell>
                    <img src={product.image} alt={product.title} className="w-10 h-10 rounded" />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={product.estimatedLifespan}
                        onChange={(e) => handleLifespanChange(product.id, e.target.value)}
                        className="w-20"
                      />
                      <span className={getLifespanColorClass(product.estimatedLifespan)}>
                        {product.estimatedLifespan <= 14 && "⚠️ "}
                        {product.estimatedLifespan} days
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{product.suggestedSubscription}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No products found matching your criteria
                </TableCell>
              </TableRow>
            )}
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
