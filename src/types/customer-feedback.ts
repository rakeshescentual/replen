
export type FeedbackResponseType = 'yes' | 'no' | 'not_yet';

export interface FeedbackSchedule {
  id: string;
  productId: string;
  productName: string;
  customerEmail: string;
  customerName: string;
  predictedDate: Date;
  status: 'scheduled' | 'sent' | 'responded';
  response?: FeedbackResponseType;
  emailTemplate: string;
}

export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'sent':
      return 'bg-yellow-100 text-yellow-800';
    case 'responded':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getResponseText = (response?: string): string => {
  switch (response) {
    case 'yes':
      return '✅ Yes, running out';
    case 'no':
      return '❌ No, still has plenty';
    case 'not_yet':
      return '⌛ Not yet, but soon';
    default:
      return '—';
  }
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};
