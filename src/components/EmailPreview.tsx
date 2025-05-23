
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmailPreview = () => {
  const [emailType, setEmailType] = useState("replenishment");

  return (
    <div>
      <Tabs defaultValue="replenishment" onValueChange={setEmailType} className="mb-4">
        <TabsList>
          <TabsTrigger value="replenishment">Replenishment Reminder</TabsTrigger>
          <TabsTrigger value="feedback">Depletion Feedback</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md overflow-hidden">
        {/* Email Header */}
        <div className="bg-gray-100 p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">From: Your Store <span className="text-gray-400">&lt;notifications@yourstore.com&gt;</span></p>
              <p className="text-sm text-gray-500">To: Customer <span className="text-gray-400">&lt;customer@example.com&gt;</span></p>
              <p className="text-sm text-gray-500">
                Subject: {emailType === "replenishment" 
                  ? "Time to Replenish Your Daily Face Moisturizer"
                  : "Is Your Daily Face Moisturizer Running Low?"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Email Body */}
        <div className="p-6 bg-white">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            {/* Store Logo */}
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-gray-200 rounded">
                <span className="text-lg font-semibold">YOUR STORE</span>
              </div>
            </div>
            
            {/* Email Content */}
            {emailType === "replenishment" ? (
              // Replenishment Email Content
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Hello Sarah,</h2>
                  <p className="mb-4">We noticed you might be running low on your <strong>Daily Face Moisturizer</strong>.</p>
                  <p className="mb-4">Based on your purchase from 28 days ago, we estimate you'll need a refill soon to maintain your skincare routine.</p>
                </div>
                
                {/* Product */}
                <div className="border rounded-md p-4 mb-6 flex items-center">
                  <div className="mr-4">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Daily Face Moisturizer</h3>
                    <p className="text-sm text-gray-600 mb-2">50ml | Hydrating Formula</p>
                    <p className="text-sm text-gray-600">Estimated to last: 30 days</p>
                  </div>
                </div>
                
                {/* CTA Button */}
                <div className="text-center mb-6">
                  <button className="bg-blue-600 text-white px-8 py-3 rounded font-semibold">Reorder Now</button>
                </div>
                
                {/* Product Usage Tip */}
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold mb-2">Product Tip</h4>
                  <p className="text-sm">For best results, apply a pea-sized amount morning and night after cleansing for continuous hydration and skin barrier support.</p>
                </div>
                
                {/* Subscription Option */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold mb-2">Never Run Out Again</h4>
                  <p className="text-sm mb-3">Subscribe to this product and enjoy automatic delivery every month, plus save 10% on each order.</p>
                  <button className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold">Start Subscription</button>
                </div>
              </>
            ) : (
              // Feedback Email Content
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Hello Sarah,</h2>
                  <p className="mb-4">We want to make sure you never run out of your favorite products.</p>
                  <p className="mb-4">Based on your purchase of <strong>Daily Face Moisturizer</strong> from 28 days ago, we think you might be running low.</p>
                  <p className="mb-4"><strong>Are you close to running out?</strong> Your feedback helps us improve our predictions and provide timely reminders.</p>
                </div>
                
                {/* Product */}
                <div className="border rounded-md p-4 mb-6 flex items-center">
                  <div className="mr-4">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Daily Face Moisturizer</h3>
                    <p className="text-sm text-gray-600 mb-2">50ml | Hydrating Formula</p>
                    <p className="text-sm text-gray-600">Purchased on: May 1, 2023</p>
                  </div>
                </div>
                
                {/* Feedback Buttons */}
                <div className="text-center mb-6 flex justify-center space-x-4">
                  <button className="bg-green-600 text-white px-6 py-3 rounded font-semibold">Yes, almost empty</button>
                  <button className="bg-yellow-500 text-white px-6 py-3 rounded font-semibold">Not yet, but soon</button>
                  <button className="bg-red-500 text-white px-6 py-3 rounded font-semibold">No, still plenty left</button>
                </div>
                
                <div className="text-center text-sm text-gray-500 mb-6">
                  <p>Your feedback helps us learn your unique usage patterns and provide better service.</p>
                </div>
                
                {/* Reorder Option */}
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h4 className="font-semibold mb-2">Ready to Reorder?</h4>
                  <p className="text-sm mb-3">If you're running low, you can easily reorder with one click.</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold">Reorder Now</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
