
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGuideDocs from "@/components/docs/ProductGuideDocs";
import IntegrationDocs from "@/components/docs/IntegrationDocs";
import TechnicalSpecsDocs from "@/components/docs/TechnicalSpecsDocs";
import FAQDocs from "@/components/docs/FAQDocs";
import DeveloperDocs from "@/components/docs/DeveloperDocs";
import IntegrationPointsDocs from "@/components/docs/IntegrationPointsDocs";
import GadgetDevDocs from "@/components/docs/GadgetDevDocs";
import { CalendarClock, Sparkles, Zap, Server, ShoppingCart, MessageSquare, FileCode, Settings, Info, Layers } from "lucide-react";

const Documentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const defaultTab = tabParam || "product-guide";
  
  // If a tab is specified in URL params, use it as default tab
  useEffect(() => {
    if (tabParam && tabParam !== defaultTab) {
      const tabTrigger = document.querySelector(`[data-state="inactive"][value="${tabParam}"]`);
      if (tabTrigger) {
        tabTrigger.click();
      }
    }
  }, [tabParam, defaultTab]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    navigate(`/documentation?tab=${value}`, { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Heading className="text-3xl font-bold mb-4">Documentation</Heading>
            <Text className="text-gray-600">
              Comprehensive guide and resources for the Replenish Reminder app for Escentual.com
            </Text>
          </div>

          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100">
            <Heading className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              Core Application Purpose
            </Heading>
            <Text className="text-blue-700 mb-4">
              The Replenish Reminder app is designed to automate product replenishment for Escentual.com customers by:
            </Text>
            <ol className="list-decimal pl-6 space-y-2 text-blue-700">
              <li>
                <span className="font-medium">Predicting when customers will run out of products</span> based on purchase history, AI analysis, and internet data mining
              </li>
              <li>
                <span className="font-medium">Sending monthly payday replenishment emails</span> with personalized product recommendations timed to arrive when customers have funds available
              </li>
              <li>
                <span className="font-medium">Enabling one-click reordering</span> for a seamless replenishment experience
              </li>
              <li>
                <span className="font-medium">Learning from customer behavior</span> to continuously improve prediction accuracy
              </li>
            </ol>
          </div>
          
          <div className="mb-8 bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-lg border border-green-100">
            <div className="flex items-start md:items-center gap-3 mb-3 flex-col md:flex-row">
              <div className="bg-green-100 p-2 rounded-full">
                <CalendarClock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Heading className="text-lg font-semibold text-green-800">Monthly Payday Reminders</Heading>
                <Text className="text-green-700">
                  Our unique approach sends replenishment emails timed with customer paydays for maximum convenience
                </Text>
              </div>
            </div>
            <div className="pl-0 md:pl-12">
              <ul className="list-disc pl-6 space-y-1 text-green-700">
                <li>Reminders are strategically timed to arrive shortly after customers receive their monthly pay</li>
                <li>Predictions ensure products won't run out before the next payday cycle</li>
                <li>Customers maintain their essential Escentual.com products without manual reordering</li>
                <li>Flexible scheduling adapts to each customer's specific payday schedule</li>
              </ul>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <Heading className="text-lg font-semibold mb-2 text-blue-800">Latest Documentation Updates</Heading>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-sm text-blue-700">
                <span className="font-medium">Gadget.dev Integration Guide:</span> New comprehensive documentation for backend integration with Escentual.com
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Payday Reminder System:</span> Documentation on aligning replenishment with customer payday cycles
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Technical Specifications:</span> Expanded data models and API documentation for Escentual.com integration
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Developer Guide:</span> New webhooks and integration points documentation for Escentual.com
              </li>
            </ul>
          </div>

          <Tabs defaultValue={defaultTab} className="w-full" onValueChange={handleTabChange}>
            <TabsList className="mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="product-guide" className="flex items-center gap-1.5">
                <Info size={16} />
                <span>Product Guide</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-1.5">
                <ShoppingCart size={16} />
                <span>Escentual Integration</span>
              </TabsTrigger>
              <TabsTrigger value="integration-points" className="flex items-center gap-1.5">
                <Layers size={16} />
                <span>Integration Points</span>
              </TabsTrigger>
              <TabsTrigger value="gadget-dev" className="flex items-center gap-1.5">
                <Server size={16} />
                <span>Gadget.dev Guide</span>
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-1.5">
                <Settings size={16} />
                <span>Technical Specs</span>
              </TabsTrigger>
              <TabsTrigger value="developer" className="flex items-center gap-1.5">
                <FileCode size={16} />
                <span>Developer Guide</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-1.5">
                <MessageSquare size={16} />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="product-guide">
              <ProductGuideDocs />
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationDocs />
            </TabsContent>

            <TabsContent value="integration-points">
              <IntegrationPointsDocs />
            </TabsContent>
            
            <TabsContent value="gadget-dev">
              <GadgetDevDocs />
            </TabsContent>

            <TabsContent value="technical">
              <TechnicalSpecsDocs />
            </TabsContent>

            <TabsContent value="developer">
              <DeveloperDocs />
            </TabsContent>

            <TabsContent value="faq">
              <FAQDocs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
