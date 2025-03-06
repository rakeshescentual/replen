
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
  BarChart,
  DollarSign,
  Zap
} from "lucide-react";

interface BenefitItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
  animationDelay?: number;
  hasExample?: boolean;
  exampleText?: string;
  tag?: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ 
  title, 
  description, 
  icon,
  highlighted = false,
  animationDelay = 0,
  hasExample = false,
  exampleText,
  tag
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
          <div className="flex items-center justify-between">
            <span className="font-medium">{title}</span>
            {tag && (
              <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {tag}
              </span>
            )}
          </div>
          <p className="mt-1">{description}</p>
          {highlighted && (
            <span className="inline-flex items-center mt-1 text-xs font-medium text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <Heading className="text-lg font-medium text-blue-800 flex items-center animate-fade-in">
          <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
          Data-Enhanced Value Assessment
        </Heading>
        <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
          <Database className="h-3.5 w-3.5 mr-1" />
          AI-Powered Analysis
        </span>
      </div>
      
      <div className="mb-4 text-sm text-blue-600 bg-blue-50 rounded-md p-2.5 border border-blue-100 animate-fade-in" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-500" />
          <span>Our Value Metrics System uses advanced internet data mining to analyze thousands of real-world consumer experiences, providing more accurate value assessments than traditional methods.</span>
        </div>
      </div>
      
      <ul className="space-y-1 pl-0">
        <BenefitItem 
          title="Real-Usage Lifespan Calculation"
          description="Determines how long products actually last based on customer data rather than manufacturer estimates"
          icon={<Clock className="h-4 w-4 text-blue-600" />}
          animationDelay={100}
          hasExample
          exampleText="A luxury serum advertised to last 30 days lasts 45 days for most users according to our analysis"
          tag="High accuracy"
        />
        <BenefitItem 
          title="Satisfaction Verification"
          description="Confirms product satisfaction across multiple data sources and platforms"
          icon={<Sparkles className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={200}
          hasExample
          exampleText="92% of analyzed user comments confirm the product's effectiveness matches its price point"
          tag="Key insight"
        />
        <BenefitItem 
          title="Usage Pattern Recognition"
          description="Identifies typical application amounts and frequency for accurate cost-per-use calculations"
          icon={<LineChart className="h-4 w-4 text-blue-600" />}
          animationDelay={300}
          tag="Pattern analysis"
        />
        <BenefitItem 
          title="Comparative Value Analysis"
          description="Compares similar products based on their true value metrics rather than just price"
          icon={<Scale className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={400}
          hasExample
          exampleText="When comparing two luxury moisturizers, our data shows the £85 option delivers 30% more applications than the £65 alternative"
          tag="Smart comparison"
        />
        <BenefitItem 
          title="Price-to-Performance Ratio"
          description="Calculates how much value each pound spent delivers in terms of efficacy and duration"
          icon={<DollarSign className="h-4 w-4 text-blue-600" />}
          animationDelay={500}
          tag="Value insight"
        />
        <BenefitItem 
          title="Optimal Application Guidance"
          description="Provides recommendations on how to use products most efficiently based on collected data"
          icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
          animationDelay={600}
          tag="Usage tips"
        />
        <BenefitItem 
          title="External Data Integration"
          description="Incorporates professional reviews, expert opinions, and third-party testing data"
          icon={<ExternalLink className="h-4 w-4 text-blue-600" />}
          highlighted
          animationDelay={700}
          hasExample
          exampleText="Data from 15+ beauty forums and 50+ professional review sites contribute to our value assessments"
          tag="Comprehensive"
        />
      </ul>
      
      <div className="mt-4 pt-3 border-t border-blue-100 text-sm text-blue-700 flex items-center justify-between animate-fade-in" style={{ animationDelay: "800ms" }}>
        <div className="flex items-center">
          <Database className="h-4 w-4 mr-1.5" />
          <span>Updated continuously with new internet data</span>
        </div>
        <div className="text-xs bg-blue-50 px-2 py-1 rounded-full">
          System confidence: 96%
        </div>
      </div>
    </div>
  );
};

export default ValueMetricsBenefits;
