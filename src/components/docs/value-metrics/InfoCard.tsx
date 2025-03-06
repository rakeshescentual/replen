
import React, { ReactNode } from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "primary" | "success" | "warning" | "info";
  actionLink?: string;
  actionText?: string;
  className?: string;
  iconClassName?: string;
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
    }
  };

  const colors = colorVariants[variant];

  return (
    <Card className={`p-4 bg-white/80 border ${colors.card} ${className}`}>
      <div className="flex items-start gap-3">
        <div className={`${colors.iconBg} p-2 rounded-lg ${iconClassName}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <div>
          <Heading className={`text-lg font-medium mb-1 ${colors.title}`}>{title}</Heading>
          <Text className={`text-sm ${colors.text}`}>{description}</Text>
          
          {actionLink && actionText && (
            <a 
              href={actionLink} 
              className={`mt-2 inline-block font-medium text-sm ${colors.icon} hover:underline`}
            >
              {actionText}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
