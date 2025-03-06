
import React from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { Brain, Lightbulb, Sparkles, LineChart, TrendingUp } from "lucide-react";

const ValueIntelligenceSystem = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="bg-purple-100 p-2 rounded-full">
          <Brain className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <Heading className="text-xl font-semibold mb-1 text-purple-800">Value Intelligence System</Heading>
          <Text className="text-purple-700">
            Our AI-powered Value Intelligence System evaluates products across multiple dimensions to determine true value.
          </Text>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
          <Heading className="text-lg font-medium mb-3 flex items-center gap-2 text-purple-800">
            <Lightbulb className="h-5 w-5 text-purple-600" />
            AI Analysis Components
          </Heading>
          
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div>
                <span className="font-medium text-purple-800">Natural Language Processing</span>
                <p className="text-sm text-purple-700">Extracts meaningful insights from unstructured text data in reviews and forums</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div>
                <span className="font-medium text-purple-800">Sentiment Analysis</span>
                <p className="text-sm text-purple-700">Evaluates emotional tone of product mentions to gauge customer satisfaction</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div>
                <span className="font-medium text-purple-800">Pattern Recognition</span>
                <p className="text-sm text-purple-700">Identifies usage trends and product performance patterns across datasets</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-purple-100 p-1 rounded-full mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div>
                <span className="font-medium text-purple-800">Predictive Modeling</span>
                <p className="text-sm text-purple-700">Forecasts long-term value based on historical data and usage patterns</p>
              </div>
            </li>
          </ul>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <Heading className="text-lg font-medium mb-3 flex items-center gap-2 text-blue-800">
            <LineChart className="h-5 w-5 text-blue-600" />
            Value Metrics Intelligence
          </Heading>
          
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-blue-800">Cost Efficiency Index</span>
                <p className="text-sm text-blue-700">Calculates optimal price-to-performance ratio across similar products</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-blue-800">Longevity Prediction</span>
                <p className="text-sm text-blue-700">Uses statistical models to estimate true product lifespan based on usage data</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-blue-800">Effectiveness Scoring</span>
                <p className="text-sm text-blue-700">Quantifies product performance based on aggregated customer results</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-blue-800">Satisfaction Rating</span>
                <p className="text-sm text-blue-700">Combines explicit ratings with sentiment analysis for holistic assessment</p>
              </div>
            </li>
          </ul>
        </Card>
      </div>
      
      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <Heading className="text-lg font-medium mb-2 text-green-800">Continuous Learning System</Heading>
        <Text className="text-sm text-green-700 mb-3">
          Our Value Intelligence System continuously improves through:
        </Text>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/70 p-3 rounded-md border border-green-100">
            <div className="font-medium text-green-800 mb-1">Data Feedback Loops</div>
            <div className="text-xs text-green-700">Real-time integration of new product data and customer feedback</div>
          </div>
          <div className="bg-white/70 p-3 rounded-md border border-green-100">
            <div className="font-medium text-green-800 mb-1">Model Refinement</div>
            <div className="text-xs text-green-700">Regular updates to prediction algorithms based on accuracy metrics</div>
          </div>
          <div className="bg-white/70 p-3 rounded-md border border-green-100">
            <div className="font-medium text-green-800 mb-1">Expanded Data Sources</div>
            <div className="text-xs text-green-700">Continuous addition of new web sources and data platforms</div>
          </div>
          <div className="bg-white/70 p-3 rounded-md border border-green-100">
            <div className="font-medium text-green-800 mb-1">Advanced Analytics</div>
            <div className="text-xs text-green-700">Implementation of cutting-edge analytical techniques</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueIntelligenceSystem;
