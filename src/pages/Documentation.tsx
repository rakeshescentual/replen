
import React from "react";
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

const Documentation = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Heading className="text-3xl font-bold mb-4">Documentation</Heading>
            <Text className="text-gray-600">
              Comprehensive guide and resources for the Replenish Reminder app
            </Text>
          </div>

          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <Heading className="text-lg font-semibold mb-2 text-blue-800">Latest Documentation Updates</Heading>
            <ul className="list-disc pl-6 space-y-1">
              <li className="text-sm text-blue-700">
                <span className="font-medium">Gadget.dev Integration Guide:</span> New comprehensive documentation for backend integration
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Technical Specifications:</span> Expanded data models and API documentation
              </li>
              <li className="text-sm text-blue-700">
                <span className="font-medium">Developer Guide:</span> New webhooks and integration points documentation
              </li>
            </ul>
          </div>

          <Tabs defaultValue="product-guide" className="w-full">
            <TabsList className="mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="product-guide">Product Guide</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="integration-points">Integration Points</TabsTrigger>
              <TabsTrigger value="gadget-dev">Gadget.dev Guide</TabsTrigger>
              <TabsTrigger value="technical">Technical Specs</TabsTrigger>
              <TabsTrigger value="developer">Developer Guide</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
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
