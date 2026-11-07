import { FindByIdTransactionSchemaReturnType } from "@starter/shared";
import { useQuery } from "@tanstack/react-query";

import AxiosInstance from "@/lib/axios";

export type HistoryAction =
  "CREATED" | "UPDATED" | "PAID" | "CANCELED" | "REOPENED";

export interface TransactionHistory {
  id: string;
  transactionId: string;
  action: HistoryAction;
  description: string;
  createdAt: string | Date;
  transaction: FindByIdTransactionSchemaReturnType;
}

export default function useTransactionHistory(
  transactionId: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["transaction-history", transactionId],

    queryFn: async () => {
      const response = await AxiosInstance.get<TransactionHistory[]>(
        `/transaction/${transactionId}/history`,
      );

      return response.data;
    },

    enabled: enabled && !!transactionId,
  });
}
