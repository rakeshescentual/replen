
import React from "react";
import { Heading } from "@/components/ui/shadcn";
import { Clock } from "lucide-react";

interface UpdateItem {
  title: string;
  description: string;
  date?: string;
}

interface UpdatesPanelProps {
  items: UpdateItem[];
}

const UpdatesPanel: React.FC<UpdatesPanelProps> = ({ items }) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-100 shadow-sm">
      <div className="flex items-center mb-3">
        <Clock className="w-4 h-4 text-blue-600 mr-2" />
        <Heading className="text-lg font-semibold text-blue-800">Latest Documentation Updates</Heading>
      </div>
      <ul className="list-disc pl-6 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm">
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="font-medium text-blue-700 mr-2">{item.title}</span>
              <span className="text-blue-600">{item.description}</span>
              {item.date && (
                <span className="text-xs text-blue-500 sm:ml-auto mt-1 sm:mt-0">
                  {item.date}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdatesPanel;
