
import React, { useState } from "react";
import AppNavigation from "@/components/AppNavigation";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGuideDocs from "@/components/docs/ProductGuideDocs";
import IntegrationDocs from "@/components/docs/IntegrationDocs";
import TechnicalSpecsDocs from "@/components/docs/TechnicalSpecsDocs";
import FAQDocs from "@/components/docs/FAQDocs";
import DeveloperDocs from "@/components/docs/DeveloperDocs";

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

          <Tabs defaultValue="product-guide" className="w-full">
            <TabsList className="mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="product-guide">Product Guide</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
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
