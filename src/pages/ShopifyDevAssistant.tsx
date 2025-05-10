
import React from "react";
import { Heading } from "@/components/ui/shadcn";
import ShopifyDevAssistant from "@/components/ShopifyDevAssistant";

export default function ShopifyDevAssistantPage() {
  return (
    <div className="container py-8">
      <Heading className="text-3xl font-bold mb-8 text-center">
        Shopify Developer Assistant Integration
      </Heading>
      <div className="mx-auto max-w-4xl">
        <p className="text-muted-foreground mb-8 text-center">
          Ask questions about payday patterns, value metrics, or request specific actions using the AI-powered Shopify Dev Assistant.
        </p>
        <ShopifyDevAssistant />
        
        <div className="mt-12 bg-muted/50 p-6 rounded-lg">
          <h2 className="font-semibold text-lg mb-4">What can the Shopify Dev Assistant do?</h2>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <span className="font-medium">📊</span>
              <span>Provide insights about payday patterns and detection methods</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">💰</span>
              <span>Explain value metrics and how they benefit customers</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">📅</span>
              <span>Calculate optimal reminder timing based on payday alignment</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">👥</span>
              <span>Suggest customer segmentation strategies based on payday cycles</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium">⚙️</span>
              <span>Execute actions like creating reminders, updating payday info, or analyzing value metrics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
