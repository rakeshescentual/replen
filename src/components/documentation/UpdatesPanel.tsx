
import React from "react";
import { Heading } from "@/components/ui/shadcn";

interface UpdateItem {
  title: string;
  description: string;
}

interface UpdatesPanelProps {
  items: UpdateItem[];
}

const UpdatesPanel: React.FC<UpdatesPanelProps> = ({ items }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
      <Heading className="text-lg font-semibold mb-2 text-blue-800">Latest Documentation Updates</Heading>
      <ul className="list-disc pl-6 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-blue-700">
            <span className="font-medium">{item.title}</span> {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdatesPanel;
