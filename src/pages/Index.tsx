
import React from "react";
import { Link } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import { Card, Heading, Text } from "@/components/ui/shadcn";

const Index = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading className="text-4xl font-bold mb-4">Welcome to Replenish Reminder</Heading>
            <Text className="text-xl text-gray-600">
              Never run out of your essential products again
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path></svg>
              </div>
              <Heading className="text-xl font-semibold mb-2">For Merchants</Heading>
              <Text className="mb-4">
                Increase repeat purchases and subscription rates by automatically reminding customers when they're about to run out.
              </Text>
              <Link 
                to="/dashboard" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-auto"
              >
                Go to Dashboard
              </Link>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <Heading className="text-xl font-semibold mb-2">For Customers</Heading>
              <Text className="mb-4">
                Never run out of your essential products again. Get timely reminders when it's time to replenish.
              </Text>
              <Link 
                to="/my-replenishments" 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mt-auto"
              >
                My Replenishments
              </Link>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <Heading className="text-xl font-semibold mb-4">How It Works</Heading>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>We track when customers purchase products</li>
              <li>Using product lifespan data, we predict when they'll run out</li>
              <li>Customers receive timely reminder emails just before depletion</li>
              <li>One-click reordering makes replenishment easy</li>
              <li>Customers can view and manage all their replenishments in one place</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
