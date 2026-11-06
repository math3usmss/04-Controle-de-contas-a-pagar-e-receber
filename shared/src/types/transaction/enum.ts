export const TransactionStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

export const TransactionType = {
  PAYABLE: "PAYABLE",
  RECEIVABLE: "RECEIVABLE",
} as const;

export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];
