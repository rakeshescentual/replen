
import React from "react";
import { Heading, Text } from "@/components/ui/shadcn";

interface DocumentationHeaderProps {
  title: string;
  description: string;
}

const DocumentationHeader: React.FC<DocumentationHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <Heading className="text-3xl font-bold mb-4">{title}</Heading>
      <Text className="text-gray-600">{description}</Text>
    </div>
  );
};

export default DocumentationHeader;
