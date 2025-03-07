
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";
import { LucideIcon } from "lucide-react";

interface FeatureHighlightProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  variant: "purple" | "green" | "amber" | "blue";
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({
  icon: Icon,
  title,
  description,
  items,
  variant,
}) => {
  const getStyles = () => {
    switch (variant) {
      case "purple":
        return {
          bg: "bg-gradient-to-r from-purple-50 to-indigo-50",
          border: "border-purple-100",
          text: "text-purple-700",
          heading: "text-purple-800",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        };
      case "green":
        return {
          bg: "bg-gradient-to-br from-green-50 to-teal-50",
          border: "border-green-100",
          text: "text-green-700",
          heading: "text-green-800",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        };
      case "amber":
        return {
          bg: "bg-gradient-to-r from-amber-50 to-yellow-50",
          border: "border-amber-100",
          text: "text-amber-700",
          heading: "text-amber-800",
          iconBg: "bg-amber-100",
          iconColor: "text-amber-600",
        };
      case "blue":
        return {
          bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
          border: "border-blue-100",
          text: "text-blue-700",
          heading: "text-blue-800",
          iconBg: "",
          iconColor: "",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`mb-8 ${styles.bg} p-5 rounded-lg border ${styles.border}`}>
      <Heading className={`text-lg font-semibold mb-3 ${styles.heading} flex items-center`}>
        {Icon && <Icon className={`h-5 w-5 mr-2 ${styles.iconColor}`} />}
        {title}
      </Heading>
      <Text className={`${styles.text} mb-4`}>{description}</Text>

      {variant === "purple" ? (
        <ol className={`list-decimal pl-6 space-y-2 ${styles.text}`}>
          {items.map((item, index) => (
            <li key={index}>
              {item.includes(":") ? (
                <>
                  <span className="font-medium">{item.split(":")[0]}</span>
                  {item.split(":")[1]}
                </>
              ) : (
                item
              )}
            </li>
          ))}
        </ol>
      ) : (
        <div className="pl-0 md:pl-12">
          <ul className={`list-disc pl-6 space-y-1 ${styles.text}`}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeatureHighlight;
