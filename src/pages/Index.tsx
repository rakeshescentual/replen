
import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Replenish Reminder</h1>
            <p className="text-xl text-gray-600">
              A Shopify app for automated product replenishment reminders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">For Merchants</h2>
              <p className="text-gray-600 mb-6">
                Drive recurring revenue and increase customer loyalty with timely replenishment reminders.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated email reminders via Klaviyo</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Intelligent product lifespan estimation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Increased subscription conversion rates</span>
                </li>
              </ul>
              <Link
                to="/dashboard"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Go to Merchant Dashboard
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">For Customers</h2>
              <p className="text-gray-600 mb-6">
                Never run out of essential products again with personalized replenishment reminders.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Timely reminders for replenishment</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Track product usage and run-out dates</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Easy one-click reordering</span>
                </li>
              </ul>
              <Link
                to="/my-replenishments"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Customer Experience
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Smart Tracking</h3>
                <p className="text-sm text-gray-600">
                  Our app calculates when products will run out based on purchase history and product data
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Timely Reminders</h3>
                <p className="text-sm text-gray-600">
                  Customers receive personalized reminders via email just before products run out
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Easy Replenishment</h3>
                <p className="text-sm text-gray-600">
                  One-click reordering or subscription sign-up for a seamless replenishment experience
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to explore the app?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Merchant Dashboard
              </Link>
              <Link
                to="/settings"
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                App Settings
              </Link>
              <Link
                to="/my-replenishments"
                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Customer View
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Replenish Reminder - A Shopify App powered by Gadget.dev</p>
        </div>
      </footer>
    </div>
  );
}
