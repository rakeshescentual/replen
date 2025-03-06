
import React, { ReactNode } from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "primary" | "success" | "warning" | "info" | "danger";
  actionLink?: string;
  actionText?: string;
  className?: string;
  iconClassName?: string;
  children?: ReactNode;
  compact?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  animated?: boolean;
  elevation?: "flat" | "low" | "medium" | "high";
}

const InfoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  variant = "default",
  actionLink,
  actionText,
  className = "",
  iconClassName = "",
  children,
  compact = false,
  bordered = true,
  hoverable = false,
  animated = false,
  elevation = "low",
}: InfoCardProps) => {
  // Define color variants
  const colorVariants = {
    default: {
      card: "border-blue-200",
      iconBg: "bg-blue-100",
      icon: "text-blue-600",
      title: "text-blue-800",
      text: "text-blue-700"
    },
    primary: {
      card: "border-purple-200",
      iconBg: "bg-purple-100",
      icon: "text-purple-600",
      title: "text-purple-800",
      text: "text-purple-700"
    },
    success: {
      card: "border-green-200",
      iconBg: "bg-green-100",
      icon: "text-green-600",
      title: "text-green-800",
      text: "text-green-700"
    },
    warning: {
      card: "border-amber-200",
      iconBg: "bg-amber-100",
      icon: "text-amber-600",
      title: "text-amber-800",
      text: "text-amber-700"
    },
    info: {
      card: "border-sky-200",
      iconBg: "bg-sky-100",
      icon: "text-sky-600",
      title: "text-sky-800",
      text: "text-sky-700"
    },
    danger: {
      card: "border-red-200",
      iconBg: "bg-red-100",
      icon: "text-red-600",
      title: "text-red-800",
      text: "text-red-700"
    }
  };

  // Define elevation classes
  const elevationClasses = {
    flat: "",
    low: "shadow-sm",
    medium: "shadow",
    high: "shadow-md"
  };

  const colors = colorVariants[variant];
  const paddingClass = compact ? "p-3" : "p-4";
  const borderClass = bordered ? `border ${colors.card}` : "border-0";
  const hoverClass = hoverable ? "transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]" : "";
  const animatedClass = animated ? "animate-fade-in" : "";
  const shadowClass = elevationClasses[elevation];

  return (
    <Card 
      className={`bg-white/80 ${paddingClass} ${borderClass} ${hoverClass} ${animatedClass} ${shadowClass} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`${colors.iconBg} p-2 rounded-lg transition-all duration-200 ${hoverable ? "group-hover:scale-110" : ""} ${iconClassName}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <div className="flex-1">
          <Heading className={`text-lg font-medium mb-1 ${colors.title}`}>{title}</Heading>
          <Text className={`text-sm ${colors.text}`}>{description}</Text>
          
          {actionLink && actionText && (
            <a 
              href={actionLink} 
              className={`mt-2 inline-flex items-center font-medium text-sm ${colors.icon} hover:underline transition-all duration-200`}
            >
              <span>{actionText}</span>
              <svg className="w-3 h-3 ml-1.5 transition-transform duration-200 ease-in-out transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
          
          {children && <div className="mt-3">{children}</div>}
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
