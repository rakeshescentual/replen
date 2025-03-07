import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Documentation from "@/pages/Documentation";
import InternetDataCrawling from "@/pages/InternetDataCrawling";
import InternetDataAnalysis from "@/pages/InternetDataAnalysis";
import AISentimentAnalysis from "@/pages/AISentimentAnalysis";
import ValueComparison from "@/pages/ValueComparison";
import CustomerMyReplenishments from "@/pages/CustomerMyReplenishments";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import ProductImageScanner from "@/pages/ProductImageScanner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/internet-data-crawling" element={<InternetDataCrawling />} />
        <Route path="/internet-data-analysis" element={<InternetDataAnalysis />} />
        <Route path="/ai-sentiment-analysis" element={<AISentimentAnalysis />} />
        <Route path="/value-comparison" element={<ValueComparison />} />
        <Route path="/my-replenishments" element={<CustomerMyReplenishments />} />
        <Route path="/product-scanner" element={<ProductImageScanner />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
