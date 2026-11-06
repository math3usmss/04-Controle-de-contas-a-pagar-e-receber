export declare const TransactionStatus: {
  readonly PENDING: "PENDING";
  readonly COMPLETED: "COMPLETED";
  readonly CANCELLED: "CANCELLED";
};
export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const TransactionType: {
  readonly PAYABLE: "PAYABLE";
  readonly RECEIVABLE: "RECEIVABLE";
};
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];
