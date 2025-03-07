
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Globe, Webhook, Calculator } from "lucide-react";
import GadgetIntegration from "./developer/GadgetIntegration";
import ApiReference from "./developer/ApiReference";
import WebhookIntegration from "./developer/WebhookIntegration";
import ValueMetricsImplementation from "./developer/ValueMetricsImplementation";

const DeveloperDocs = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6 shadow-md border-blue-100">
        <div className="mb-6">
          <Badge className="mb-2 bg-blue-100 text-blue-800 border-blue-200">
            For Developers
          </Badge>
          <Heading className="text-2xl font-bold mb-3 text-blue-900">Developer Documentation</Heading>
          <Text className="mb-6 text-gray-600 max-w-3xl">
            Technical documentation for developers working with the Escentual Value Optimization Platform, including API references,
            Gadget.dev integration, and implementation guides for value metrics.
          </Text>
        </div>

        <Tabs defaultValue="gadget" className="w-full">
          <TabsList className="mb-6 bg-gray-100 p-1 flex flex-wrap">
            <TabsTrigger value="gadget" className="flex items-center text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-900">
              <Database className="h-4 w-4" />
              <span>Gadget.dev Integration</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-900">
              <Globe className="h-4 w-4" />
              <span>API Reference</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-900">
              <Webhook className="h-4 w-4" />
              <span>Webhooks</span>
            </TabsTrigger>
            <TabsTrigger value="value-metrics" className="flex items-center text-sm gap-1.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-900">
              <Calculator className="h-4 w-4" />
              <span>Value Metrics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gadget" className="p-1">
            <GadgetIntegration />
          </TabsContent>

          <TabsContent value="api" className="p-1">
            <ApiReference />
          </TabsContent>

          <TabsContent value="webhooks" className="p-1">
            <WebhookIntegration />
          </TabsContent>

          <TabsContent value="value-metrics" className="p-1">
            <ValueMetricsImplementation />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DeveloperDocs;
