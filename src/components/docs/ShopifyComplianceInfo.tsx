
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Shield, Check, AlertTriangle, Info } from "lucide-react";

/**
 * Component that provides information about Shopify compliance requirements
 * for the Built for Shopify certification program
 */
const ShopifyComplianceInfo = () => {
  return (
    <div className="space-y-6">
      <Card className="p-5 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-full">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <Heading className="text-xl font-semibold text-green-800">
            Built for Shopify Compliance
          </Heading>
        </div>
        
        <Text className="mb-6 text-green-700">
          This application is designed to meet all requirements for the Built for Shopify certification program,
          ensuring merchants receive a premium, reliable experience that follows Shopify's best practices.
        </Text>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-base font-medium mb-3 text-gray-800">App Experience Requirements</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Polaris design system</p>
                  <p className="text-sm text-gray-600">Implements Shopify's Polaris components and design patterns</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Onboarding experience</p>
                  <p className="text-sm text-gray-600">Step-by-step onboarding with clear merchant value proposition</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Responsive design</p>
                  <p className="text-sm text-gray-600">Fully responsive across all device sizes</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">App performance</p>
                  <p className="text-sm text-gray-600">Optimized performance with page load times under 400ms</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-base font-medium mb-3 text-gray-800">Technical Requirements</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">App Bridge 3.0+</p>
                  <p className="text-sm text-gray-600">Integrated with latest App Bridge version</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Session token authentication</p>
                  <p className="text-sm text-gray-600">Uses JWT-based authentication flows</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">WCAG 2.1 Level AA</p>
                  <p className="text-sm text-gray-600">Implements accessibility standards with proper ARIA attributes</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Proper API usage</p>
                  <p className="text-sm text-gray-600">Follows GraphQL best practices with proper rate limiting</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-base font-medium mb-3 text-gray-800">Security & Privacy Requirements</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Data security</p>
                <p className="text-sm text-gray-600">Implements secure data storage with encryption and TLS 1.2+</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">Privacy policy</p>
                <p className="text-sm text-gray-600">Provides clear privacy policy detailing data usage and retention</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">API scope minimization</p>
                <p className="text-sm text-gray-600">Uses only required API access scopes for functionality</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-700">GDPR compliance</p>
                <p className="text-sm text-gray-600">Supports data export and deletion requests</p>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3 mb-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800">Plus Certification Requirements</h3>
            <p className="text-sm text-blue-700">
              This app is also eligible for Shopify Plus certification, meeting additional requirements for enterprise merchants:
            </p>
          </div>
        </div>
        <ul className="pl-10 mt-3 space-y-2">
          <li className="text-sm text-blue-700 flex items-center">
            <span className="bg-blue-200 rounded-full w-1.5 h-1.5 mr-2"></span>
            Enhanced performance for high-volume stores (10,000+ products)
          </li>
          <li className="text-sm text-blue-700 flex items-center">
            <span className="bg-blue-200 rounded-full w-1.5 h-1.5 mr-2"></span>
            Multi-store management capabilities for enterprise accounts
          </li>
          <li className="text-sm text-blue-700 flex items-center">
            <span className="bg-blue-200 rounded-full w-1.5 h-1.5 mr-2"></span>
            Priority support with guaranteed SLAs for Plus merchants
          </li>
          <li className="text-sm text-blue-700 flex items-center">
            <span className="bg-blue-200 rounded-full w-1.5 h-1.5 mr-2"></span>
            Advanced customization options for enterprise needs
          </li>
        </ul>
      </div>
      
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Certification Process</h3>
            <p className="text-sm text-amber-700 mb-2">
              The Built for Shopify certification process involves several steps:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-amber-700">
              <li>Submit application through Shopify Partners dashboard</li>
              <li>Complete app review questionnaire</li>
              <li>Undergo technical review by Shopify team</li>
              <li>Address any feedback from reviewer</li>
              <li>Receive certification upon approval</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopifyComplianceInfo;
