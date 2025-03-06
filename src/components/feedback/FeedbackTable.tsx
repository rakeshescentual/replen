
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import FeedbackTableRow from './FeedbackTableRow';
import { FeedbackResponseType, FeedbackSchedule } from '@/types/customer-feedback';

interface FeedbackTableProps {
  feedbackSchedules: FeedbackSchedule[];
  isLoading: boolean;
  onSendNow: (scheduleId: string) => void;
  onSimulateResponse: (scheduleId: string, response: FeedbackResponseType) => void;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedbackSchedules,
  isLoading,
  onSendNow,
  onSimulateResponse
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Predicted Depletion</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbackSchedules.map((schedule) => (
          <FeedbackTableRow
            key={schedule.id}
            schedule={schedule}
            isLoading={isLoading}
            onSendNow={onSendNow}
            onSimulateResponse={onSimulateResponse}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default FeedbackTable;
