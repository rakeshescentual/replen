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
import ValueMetricsDocs from "@/components/docs/ValueMetricsDocs";
import { 
  CalendarClock, 
  Sparkles, 
  Zap, 
  Server, 
  ShoppingCart, 
  MessageSquare, 
  FileCode, 
  Settings, 
  Info, 
  Layers, 
  Clock,
  BarChart,
  Calculator
} from "lucide-react";

const Documentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const defaultTab = tabParam || "product-guide";
  
  // If a tab is specified in URL params, use it as default tab
  useEffect(() => {
    if (tabParam && tabParam !== defaultTab) {
      const tabTrigger = document.querySelector(`[data-state="inactive"][value="${tabParam}"]`) as HTMLElement | null;
      if (tabTrigger && 'click' in tabTrigger) {
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

          <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-lg border border-purple-100">
            <Heading className="text-lg font-semibold mb-3 text-purple-800 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
              AI-Powered Replenishment Predictions
            </Heading>
            <Text className="text-purple-700 mb-4">
              Replenish Reminder automates product replenishment for Escentual.com customers through sophisticated AI analysis:
            </Text>
            <ol className="list-decimal pl-6 space-y-2 text-purple-700">
              <li>
                <span className="font-medium">Advanced prediction engine</span> combines purchase history, product usage data, and internet data mining
              </li>
              <li>
                <span className="font-medium">Tailored to individual usage patterns</span> for highly accurate run-out date predictions
              </li>
              <li>
                <span className="font-medium">Continuous improvement through machine learning</span> that adapts to customer feedback and behavior
              </li>
              <li>
                <span className="font-medium">Internet crawling for product reviews and usage information</span> to enhance prediction accuracy
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
                  Our unique approach sends replenishment emails timed with customer paydays for maximum convenience and conversion
                </Text>
              </div>
            </div>
            <div className="pl-0 md:pl-12">
              <ul className="list-disc pl-6 space-y-1 text-green-700">
                <li>Reminders arrive shortly after customers receive their monthly pay when funds are available</li>
                <li>AI prediction ensures products won't run out before the next payday cycle</li>
                <li>Customers maintain their essential Escentual.com products without manual reordering</li>
                <li>One-click reordering for seamless replenishment experience</li>
                <li>Flexible scheduling adapts to each customer's specific payday schedule</li>
              </ul>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 p-5 rounded-lg border border-amber-100">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <BarChart className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <Heading className="text-lg font-semibold text-amber-800">Value Metrics</Heading>
                <Text className="text-amber-700">
                  Our system analyzes product value and cost efficiency for Escentual.com customers:
                </Text>
              </div>
            </div>
            <div className="pl-0 md:pl-12">
              <ul className="list-disc pl-6 space-y-1 text-amber-700">
                <li>Calculate cost-per-day metrics for all Escentual.com products</li>
                <li>Compare value across similar products for intelligent recommendations</li>
                <li>Identify highest-value items based on customer usage patterns</li>
                <li>Suggest subscription options for frequently replenished products</li>
                <li>Internet data mining enhances value assessment accuracy</li>
              </ul>
            </div>
          </div>

          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <Heading className="text-lg font-semibold mb-2 text-blue-800">Latest Documentation Updates</Heading>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-sm text-blue-700">
                <span className="font-medium">Enhanced AI Prediction Engine:</span> Improved documentation on internet data mining and machine learning algorithms
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Gadget.dev Integration Guide:</span> Updated comprehensive documentation for backend integration with Escentual.com
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Payday Reminder System:</span> Expanded documentation on aligning replenishment with customer payday cycles
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Technical Specifications:</span> Refined data models and API documentation for Escentual.com integration
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
              <TabsTrigger value="value-metrics" className="flex items-center gap-1.5">
                <Calculator size={16} />
                <span>Value Metrics</span>
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

            <TabsContent value="value-metrics">
              <ValueMetricsDocs />
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
