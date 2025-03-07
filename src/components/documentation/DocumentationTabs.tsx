
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Info, 
  ShoppingCart, 
  Layers, 
  Server, 
  Settings, 
  FileCode, 
  MessageSquare,
  Calculator 
} from "lucide-react";
import ProductGuideDocs from "@/components/docs/ProductGuideDocs";
import IntegrationDocs from "@/components/docs/IntegrationDocs";
import TechnicalSpecsDocs from "@/components/docs/TechnicalSpecsDocs";
import FAQDocs from "@/components/docs/FAQDocs";
import DeveloperDocs from "@/components/docs/DeveloperDocs";
import IntegrationPointsDocs from "@/components/docs/IntegrationPointsDocs";
import GadgetDevDocs from "@/components/docs/GadgetDevDocs";
import ValueMetricsDocs from "@/components/docs/ValueMetricsDocs";

interface DocumentationTabsProps {
  defaultTab: string;
}

const DocumentationTabs: React.FC<DocumentationTabsProps> = ({ defaultTab }) => {
  const navigate = useNavigate();

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    navigate(`/documentation?tab=${value}`, { replace: true });
  };

  return (
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
  );
};

export default DocumentationTabs;
