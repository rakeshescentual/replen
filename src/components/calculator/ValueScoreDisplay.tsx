
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, TrendingUp } from "lucide-react";

interface ValueScoreDisplayProps {
  costPerDay: number;
  daysLasting: number;
  valueScore: number;
  getValueScoreColor: (score: number) => string;
}

const ValueScoreDisplay: React.FC<ValueScoreDisplayProps> = ({
  costPerDay,
  daysLasting,
  valueScore,
  getValueScoreColor
}) => {
  return (
    <div className="pt-2.5 border-t border-gray-100">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
          <DollarSign className="h-4 w-4 mx-auto mb-1 text-blue-600" />
          <div className="text-xs text-blue-600 mb-1">Cost per Day</div>
          <div className="font-medium text-sm">£{costPerDay.toFixed(2)}</div>
        </div>
        
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
          <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
          <div className="text-xs text-blue-600 mb-1">Days Lasting</div>
          <div className="font-medium text-sm">{daysLasting}</div>
        </div>
        
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center shadow-sm">
          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-blue-600" />
          <div className="text-xs text-blue-600 mb-1">Value Score</div>
          <div className="font-medium text-sm">
            <Badge className={`font-normal px-1.5 ${getValueScoreColor(valueScore)}`}>
              {Math.round(valueScore)}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueScoreDisplay;
