
import React, { useState } from "react";
import AppNavigation from "@/components/AppNavigation";
import { WebCrawlerForm } from "@/components/crawling/WebCrawlerForm";
import { CrawlResults } from "@/components/crawling/CrawlResults";
import { 
  Card, 
  Heading, 
  Text 
} from "@/components/ui/shadcn";
import { Spider, Globe, Search, Database } from "lucide-react";

interface CrawlData {
  url: string;
  results: any;
  timestamp: Date;
}

const InternetDataCrawling = () => {
  const [crawlHistory, setCrawlHistory] = useState<CrawlData[]>([]);
  const [selectedCrawl, setSelectedCrawl] = useState<CrawlData | null>(null);
  
  const handleCrawlComplete = (url: string, results: any) => {
    const newCrawl = {
      url,
      results,
      timestamp: new Date()
    };
    
    setCrawlHistory(prev => [newCrawl, ...prev]);
    setSelectedCrawl(newCrawl);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Spider className="h-6 w-6 text-purple-700" />
            </div>
            <div>
              <Heading className="text-3xl font-bold">Internet Data Crawling</Heading>
              <Text className="text-gray-600">
                Extract product data and customer insights from the web to enhance predictions
              </Text>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-blue-600" />
                <Heading className="text-xl font-semibold">Web Crawler</Heading>
              </div>
              
              <Text className="text-gray-600 mb-6">
                Analyze beauty websites, forums, and review platforms to gather insights about Escentual.com products.
              </Text>
              
              <WebCrawlerForm onCrawlComplete={handleCrawlComplete} />
            </Card>
            
            {crawlHistory.length > 0 && (
              <Card className="p-5 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="h-5 w-5 text-green-600" />
                  <Heading className="text-xl font-semibold">Crawl History</Heading>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {crawlHistory.map((crawl, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedCrawl === crawl ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCrawl(crawl)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="truncate flex-1">
                          <p className="font-medium truncate">{crawl.url}</p>
                          <p className="text-sm text-gray-500">
                            {crawl.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <CrawlResults selectedCrawl={selectedCrawl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternetDataCrawling;
