
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { DollarSign, Clock } from "lucide-react";

// Mock product data with analytics - in a real app, this would come from the PredictiveAnalysisService
const productAnalytics = [
  {
    id: "1",
    title: "Daily Face Moisturizer",
    category: "Skincare",
    averageLifespan: 32,
    pricePerUnit: 24.99,
    costPerDay: 0.78,
    reviewScore: 4.7
  },
  {
    id: "2",
    title: "Anti-Aging Serum",
    category: "Skincare",
    averageLifespan: 58,
    pricePerUnit: 49.99,
    costPerDay: 0.86,
    reviewScore: 4.5
  },
  {
    id: "3",
    title: "Vitamin C Supplements",
    category: "Supplements",
    averageLifespan: 89,
    pricePerUnit: 29.99,
    costPerDay: 0.34,
    reviewScore: 4.8
  },
  {
    id: "4",
    title: "Shampoo",
    category: "Hair Care",
    averageLifespan: 42,
    pricePerUnit: 18.99,
    costPerDay: 0.45,
    reviewScore: 4.6
  },
  {
    id: "5",
    title: "Toothpaste",
    category: "Oral Care",
    averageLifespan: 32,
    pricePerUnit: 5.99,
    costPerDay: 0.19,
    reviewScore: 4.4
  }
];

const ProductAnalytics = () => {
  return (
    <div>
      <Heading className="text-xl font-medium mb-6">Product Value Analytics</Heading>
      <Text className="mb-6">
        This data shows the average lifespan of products based on customer usage patterns, along with the calculated cost per day. 
        This information can be published on your website product pages to help customers make informed purchasing decisions.
      </Text>
      
      <Card className="mb-6 p-4 border border-dashed border-blue-300 bg-blue-50">
        <div className="flex items-start">
          <div className="mr-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </div>
          <div>
            <Text className="text-sm font-medium text-blue-600">Website Integration</Text>
            <Text className="text-sm text-blue-800">
              Add the following code snippet to your Shopify product template to display this information on your product pages. 
              This data helps customers understand the value of your products and can increase conversion rates.
            </Text>
          </div>
        </div>
      </Card>
      
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Avg. Lifespan</span>
                </div>
              </TableHead>
              <TableHead>Price</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <DollarSign size={16} />
                  <span>Cost Per Day</span>
                </div>
              </TableHead>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productAnalytics.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.averageLifespan} days</TableCell>
                <TableCell>${product.pricePerUnit.toFixed(2)}</TableCell>
                <TableCell>${product.costPerDay.toFixed(2)}</TableCell>
                <TableCell>
                  <button
                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    onClick={() => window.open(`/preview-widget/${product.id}`, '_blank')}
                  >
                    Preview Widget
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-8">
        <Heading className="text-lg font-medium mb-4">Example Website Widget</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-sm">
            <Heading className="text-base font-medium mb-3">Basic Widget</Heading>
            <div className="p-4 border rounded-md">
              <div className="mb-4">
                <div className="text-lg font-medium">Daily Face Moisturizer</div>
                <div className="text-sm text-gray-500">Skincare</div>
              </div>
              <div className="flex justify-between items-center border-t pt-3">
                <div className="flex items-center">
                  <Clock size={18} className="text-purple-600 mr-2" />
                  <span>Lasts approximately <strong>32 days</strong></span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={18} className="text-green-600 mr-2" />
                  <span>Only <strong>$0.78</strong> per day</span>
                </div>
              </div>
            </div>
            <Text className="text-xs text-gray-500 mt-2">
              This simple widget displays the average lifespan and cost per day metrics in a clean, easy-to-understand format.
            </Text>
          </Card>

          <Card className="p-6 shadow-sm">
            <Heading className="text-base font-medium mb-3">Advanced Widget</Heading>
            <div className="p-4 border rounded-md bg-gradient-to-br from-purple-50 to-blue-50">
              <div className="mb-4">
                <div className="text-lg font-medium">Daily Face Moisturizer</div>
                <div className="text-sm text-gray-500">Skincare</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Average Lifespan</div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-purple-600 mr-2" />
                    <span className="text-lg font-medium">32 days</span>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">Cost Per Day</div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="text-green-600 mr-2" />
                    <span className="text-lg font-medium">$0.78</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-center bg-blue-100 p-2 rounded-md">
                Based on data from 1,432 customers
              </div>
            </div>
            <Text className="text-xs text-gray-500 mt-2">
              This premium widget includes additional context and styling to enhance your product pages.
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
