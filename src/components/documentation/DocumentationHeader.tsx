
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";

interface DocumentationHeaderProps {
  title: string;
  description: string;
  hasUpdates?: boolean;
}

const DocumentationHeader: React.FC<DocumentationHeaderProps> = ({ 
  title, 
  description, 
  hasUpdates = false 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <Heading className="text-3xl font-bold text-blue-800">{title}</Heading>
        {hasUpdates && (
          <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
            Updated
          </span>
        )}
      </div>
      <Text className="text-gray-600 max-w-3xl">{description}</Text>
    </div>
  );
};

export default DocumentationHeader;
