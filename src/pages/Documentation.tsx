
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavigation from "@/components/AppNavigation";
import { Card } from "@/components/ui/shadcn";
import { 
  CalendarClock, 
  Sparkles, 
  Zap, 
  Server, 
  ShoppingCart, 
  MessageSquare, 
  FileCode, 
  Settings, 
  Info, 
  Layers, 
  Clock,
  BarChart,
  Calculator
} from "lucide-react";
import DocumentationHeader from "@/components/documentation/DocumentationHeader";
import FeatureHighlight from "@/components/documentation/FeatureHighlight";
import UpdatesPanel from "@/components/documentation/UpdatesPanel";
import DocumentationTabs from "@/components/documentation/DocumentationTabs";

const Documentation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get('tab');
  const defaultTab = tabParam || "product-guide";
  
  // If a tab is specified in URL params, use it as default tab
  useEffect(() => {
    if (tabParam && tabParam !== defaultTab) {
      const tabTrigger = document.querySelector(`[data-state="inactive"][value="${tabParam}"]`) as HTMLElement | null;
      if (tabTrigger && 'click' in tabTrigger) {
        tabTrigger.click();
      }
    }
  }, [tabParam, defaultTab]);
  
  // AI prediction features
  const aiPredictionItems = [
    "Advanced prediction engine: combines purchase history, product usage data, and internet data mining",
    "Tailored to individual usage patterns: for highly accurate run-out date predictions",
    "Continuous improvement through machine learning: that adapts to customer feedback and behavior",
    "Internet crawling for product reviews and usage information: to enhance prediction accuracy"
  ];

  // Payday reminder features
  const paydayReminderItems = [
    "Reminders arrive shortly after customers receive their monthly pay when funds are available",
    "AI prediction ensures products won't run out before the next payday cycle",
    "Customers maintain their essential Escentual.com products without manual reordering",
    "One-click reordering for seamless replenishment experience",
    "Flexible scheduling adapts to each customer's specific payday schedule"
  ];

  // Value metrics features
  const valueMetricsItems = [
    "Calculate cost-per-day metrics for all Escentual.com products",
    "Compare value across similar products for intelligent recommendations",
    "Identify highest-value items based on customer usage patterns",
    "Suggest subscription options for frequently replenished products",
    "Internet data mining enhances value assessment accuracy"
  ];

  // Documentation updates
  const updatesItems = [
    {
      title: "Enhanced AI Prediction Engine:",
      description: "Improved documentation on internet data mining and machine learning algorithms"
    },
    {
      title: "Gadget.dev Integration Guide:",
      description: "Updated comprehensive documentation for backend integration with Escentual.com"
    },
    {
      title: "Payday Reminder System:",
      description: "Expanded documentation on aligning replenishment with customer payday cycles"
    },
    {
      title: "Technical Specifications:",
      description: "Refined data models and API documentation for Escentual.com integration"
    },
    {
      title: "Developer Guide:",
      description: "New webhooks and integration points documentation for Escentual.com"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppNavigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <DocumentationHeader 
            title="Documentation" 
            description="Comprehensive guide and resources for the Replenish Reminder app for Escentual.com" 
          />

          <FeatureHighlight 
            icon={Sparkles}
            title="AI-Powered Replenishment Predictions"
            description="Replenish Reminder automates product replenishment for Escentual.com customers through sophisticated AI analysis:"
            items={aiPredictionItems}
            variant="purple"
          />
          
          <FeatureHighlight 
            icon={CalendarClock}
            title="Monthly Payday Reminders"
            description="Our unique approach sends replenishment emails timed with customer paydays for maximum convenience and conversion"
            items={paydayReminderItems}
            variant="green"
          />

          <FeatureHighlight 
            icon={BarChart}
            title="Value Metrics"
            description="Our system analyzes product value and cost efficiency for Escentual.com customers:"
            items={valueMetricsItems}
            variant="amber"
          />

          <UpdatesPanel items={updatesItems} />

          <DocumentationTabs defaultTab={defaultTab} />
        </div>
      </div>
    </div>
  );
};

export default Documentation;
