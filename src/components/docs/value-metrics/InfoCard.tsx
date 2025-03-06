
import React, { ReactNode } from "react";
import { Card, Heading, Text } from "@/components/ui/shadcn";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const InfoCard = ({ icon: Icon, title, description }: InfoCardProps) => {
  return (
    <Card className="p-4 bg-white/80 border border-blue-200">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <Heading className="text-lg font-medium mb-1">{title}</Heading>
          <Text className="text-sm">{description}</Text>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard;
