
import React from "react";
import { Heading } from "@/components/ui/shadcn";
import { ExternalLink, Sparkles, LineChart, TrendingUp, Scale, Clock, CheckCircle } from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ 
  title, 
  description, 
  icon,
  highlighted = false
}) => {
  return (
    <li className={`mb-3 transition-all duration-200 ${highlighted ? 
      "text-indigo-800 bg-indigo-50 p-3 rounded-md -mx-2 border border-indigo-100 shadow-sm" : 
      "text-blue-700 hover:bg-blue-50 p-2 rounded-md -mx-1"
    }`}>
      <div className="flex items-start gap-2">
        {icon && <span className="mt-1 flex-shrink-0">{icon}</span>}
        <div>
          <span className="font-medium">{title}:</span> {description}
          {highlighted && (
            <span className="inline-flex items-center ml-1 text-xs font-medium text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
              <CheckCircle className="w-3 h-3 mr-1" /> Key benefit
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

const ValueMetricsBenefits = () => {
  return (
    <div className="bg-white/80 p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
      <Heading className="text-lg font-medium mb-3 text-blue-800 flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
        How Data Mining Enhances Value Metrics
      </Heading>
      <ul className="space-y-1 pl-0">
        <BenefitItem 
          title="Accurate Lifespan Estimation"
          description="Real-world usage data provides more accurate product lifespan estimates than manufacturer claims alone"
          icon={<Clock className="h-4 w-4 text-blue-600" />}
        />
        <BenefitItem 
          title="Satisfaction Verification"
          description="Verifies customer satisfaction claims across multiple platforms and sources"
          icon={<Sparkles className="h-4 w-4 text-blue-600" />}
          highlighted
        />
        <BenefitItem 
          title="Usage Pattern Recognition"
          description="Identifies how customers actually use products in their routines"
          icon={<LineChart className="h-4 w-4 text-blue-600" />}
        />
        <BenefitItem 
          title="Comparative Analysis"
          description="Helps compare similar products based on aggregated internet sentiment and reported results"
          icon={<Scale className="h-4 w-4 text-blue-600" />}
          highlighted
        />
        <BenefitItem 
          title="Trend Identification"
          description="Spots emerging trends in product usage and effectiveness over time"
          icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
        />
        <BenefitItem 
          title="External Data Integration"
          description="Incorporates third-party product reviews and expert assessments"
          icon={<ExternalLink className="h-4 w-4 text-blue-600" />}
        />
      </ul>
    </div>
  );
};

export default ValueMetricsBenefits;
