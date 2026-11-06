import type { FindAllTransactionSchemaReturnType } from "@starter/shared";
import { useQuery } from "@tanstack/react-query";

import AxiosInstance from "@/lib/axios";

export default function useTransactions(page: number) {
  return useQuery({
    queryKey: ["transactions", page],

    queryFn: async () => {
      const response =
        await AxiosInstance.get<FindAllTransactionSchemaReturnType>(
          "/transaction",
          {
            params: { page },
          },
        );

      return response.data;
    },
  });
}
