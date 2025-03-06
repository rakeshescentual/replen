
import { FeedbackSchedule } from '@/types/customer-feedback';

export const initialFeedbackSchedules: FeedbackSchedule[] = [
  {
    id: "1",
    productId: "1",
    productName: "Daily Face Moisturizer",
    customerEmail: "sarah@example.com",
    customerName: "Sarah Johnson",
    predictedDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'scheduled',
    emailTemplate: "product_depletion_check"
  },
  {
    id: "2",
    productId: "3",
    productName: "Vitamin C Supplements",
    customerEmail: "michael@example.com",
    customerName: "Michael Brown",
    predictedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'scheduled',
    emailTemplate: "product_depletion_check"
  },
  {
    id: "3",
    productId: "4",
    productName: "Shampoo",
    customerEmail: "emma@example.com",
    customerName: "Emma Wilson",
    predictedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: 'sent',
    emailTemplate: "product_depletion_check"
  },
  {
    id: "4",
    productId: "2",
    productName: "Anti-Aging Serum",
    customerEmail: "david@example.com",
    customerName: "David Clark",
    predictedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: 'responded',
    response: 'yes',
    emailTemplate: "product_depletion_check"
  },
  {
    id: "5",
    productId: "5",
    productName: "Toothpaste",
    customerEmail: "jessica@example.com",
    customerName: "Jessica Miller",
    predictedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    status: 'responded',
    response: 'not_yet',
    emailTemplate: "product_depletion_check"
  }
];
