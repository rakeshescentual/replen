
import React from "react";
import { Heading } from "@/components/ui/shadcn";
import { 
  ExternalLink, 
  Sparkles, 
  LineChart, 
  TrendingUp, 
  Scale, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Database,
  BarChart
} from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
  animationDelay?: number;
  hasExample?: boolean;
  exampleText?: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ 
  title, 
  description, 
  icon,
  highlighted = false,
  animationDelay = 0,
  hasExample = false,
  exampleText
}) => {
  const delayStyle = { animationDelay: `${animationDelay}ms` };
  
  return (
    <li 
      className={`mb-3 animate-fade-in transition-all duration-300 ${highlighted ? 
        "text-indigo-800 bg-indigo-50 p-3 rounded-md -mx-2 border border-indigo-100 shadow-sm hover:shadow hover:bg-indigo-100/80" : 
        "text-blue-700 hover:bg-blue-50 p-2 rounded-md -mx-1"
      }`}
      style={delayStyle}
    >
      <div className="flex items-start gap-2">
        {icon && <span className="mt-1 flex-shrink-0 transition-all duration-300 hover:scale-110">{icon}</span>}
        <div className="w-full">
          <span className="font-medium">{title}:</span> {description}
          {highlighted && (
            <span className="inline-flex items-center ml-1 text-xs font-medium text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3 mr-1" /> Key benefit
            </span>
          )}
          
          {hasExample && exampleText && (
            <div className="mt-2 text-sm bg-white/80 p-2 rounded border border-indigo-100 flex items-start gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <span className="text-indigo-700 italic">{exampleText}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

const ValueMetricsBenefits = () => {
  return (
    <div className="bg-white/80 p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Heading className="text-lg font-medium text-blue-800 flex items-center animate-fade-in">
          <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
          How Data Mining Enhances Value Metrics
        </Heading>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
          <Database className="h-3.5 w-3.5 mr-1" />
          Internet Data Analysis
        </span>
      </div>
      
      <div className="mb-4 text-sm text-blue-600 bg-blue-50 rounded-md p-2.5 border border-blue-100 animate-fade-in" style={{ animationDelay: "50ms" }}>
        Our AI-powered internet data mining captures real-world information about product usage, longevity, and customer experiences from across the web to create more accurate value metrics.
      </div>
      
      <ul className="space-y-1 pl-0">
        <BenefitItem 
          title="Accurate Lifespan Estimation"
          description="Real-world usage data provides more accurate product lifespan estimates than manufacturer claims alone"
          icon={<Clock className="h-4 w-4 text-blue-600" />}
          animationDelay={100}
          hasExample
          exampleText="A premium face serum advertised to last 30 days actually lasts 45 days for most users based on online usage reports"
        />
        <BenefitItem 
          title="Satisfaction Verification"
          description="Verifies customer satisfaction claims across multiple platforms and sources"
          icon={<Sparkles className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={200}
          hasExample
          exampleText="92% of online reviews confirm the product's effectiveness matches or exceeds Escentual.com's product description"
        />
        <BenefitItem 
          title="Usage Pattern Recognition"
          description="Identifies how customers actually use products in their routines"
          icon={<LineChart className="h-4 w-4 text-blue-600" />}
          animationDelay={300}
        />
        <BenefitItem 
          title="Comparative Analysis"
          description="Helps compare similar products based on aggregated internet sentiment and reported results"
          icon={<Scale className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={400}
          hasExample
          exampleText="When comparing luxury moisturizers, our data shows the £85 option lasts 20% longer than the £65 alternative, making it a better value"
        />
        <BenefitItem 
          title="Trend Identification"
          description="Spots emerging trends in product usage and effectiveness over time"
          icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
          animationDelay={500}
        />
        <BenefitItem 
          title="External Data Integration"
          description="Incorporates third-party product reviews and expert assessments"
          icon={<ExternalLink className="h-4 w-4 text-blue-600" />}
          animationDelay={600}
        />
        <BenefitItem 
          title="Cost-Per-Use Accuracy"
          description="Calculates more precise cost-per-use metrics based on actual usage amounts reported online"
          icon={<BarChart className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={700}
          hasExample
          exampleText="Data shows customers use 25% less product per application than recommended, extending value by 33%"
        />
      </ul>
      
      <div className="mt-4 pt-3 border-t border-blue-100 text-sm text-blue-700 flex items-center justify-between animate-fade-in" style={{ animationDelay: "800ms" }}>
        <div className="flex items-center">
          <Database className="h-4 w-4 mr-1.5" />
          <span>Updated hourly with new internet data</span>
        </div>
        <div className="text-xs bg-blue-50 px-2 py-1 rounded-full">
          Confidence score: 94%
        </div>
      </div>
    </div>
  );
};

export default ValueMetricsBenefits;
