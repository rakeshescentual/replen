
import React from 'react';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { FeedbackResponseType, FeedbackSchedule, formatDate, getResponseText, getStatusBadgeClass } from '@/types/customer-feedback';

interface FeedbackTableRowProps {
  schedule: FeedbackSchedule;
  isLoading: boolean;
  onSendNow: (scheduleId: string) => void;
  onSimulateResponse: (scheduleId: string, response: FeedbackResponseType) => void;
}

const FeedbackTableRow: React.FC<FeedbackTableRowProps> = ({
  schedule,
  isLoading,
  onSendNow,
  onSimulateResponse
}) => {
  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{schedule.customerName}</div>
          <div className="text-sm text-gray-500">{schedule.customerEmail}</div>
        </div>
      </TableCell>
      <TableCell>{schedule.productName}</TableCell>
      <TableCell>{formatDate(schedule.predictedDate)}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(schedule.status)}`}>
          {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
        </span>
      </TableCell>
      <TableCell>
        {schedule.status === 'responded' ? (
          <span>{getResponseText(schedule.response)}</span>
        ) : (
          <span className="text-gray-400">No response yet</span>
        )}
      </TableCell>
      <TableCell>
        {schedule.status === 'scheduled' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSendNow(schedule.id)}
            disabled={isLoading}
          >
            Send Now
          </Button>
        )}
        {schedule.status === 'sent' && (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSimulateResponse(schedule.id, 'yes')}
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
            >
              Yes
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSimulateResponse(schedule.id, 'not_yet')}
              className="bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200"
            >
              Soon
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSimulateResponse(schedule.id, 'no')}
              className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
            >
              No
            </Button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
};

export default FeedbackTableRow;
