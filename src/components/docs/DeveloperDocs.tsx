
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GadgetIntegration from "./developer/GadgetIntegration";
import ApiReference from "./developer/ApiReference";
import WebhookIntegration from "./developer/WebhookIntegration";
import ValueMetricsImplementation from "./developer/ValueMetricsImplementation";

const DeveloperDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <Heading className="text-2xl font-bold mb-4">Developer Guide</Heading>
        <Text className="mb-6">
          Technical documentation for developers working with the Escentual Value Optimization Platform, including API references,
          Gadget.dev integration, and implementation guides for value metrics.
        </Text>

        <Tabs defaultValue="gadget" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="gadget">Gadget.dev Integration</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="value-metrics">Value Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="gadget">
            <GadgetIntegration />
          </TabsContent>

          <TabsContent value="api">
            <ApiReference />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhookIntegration />
          </TabsContent>

          <TabsContent value="value-metrics">
            <ValueMetricsImplementation />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DeveloperDocs;
