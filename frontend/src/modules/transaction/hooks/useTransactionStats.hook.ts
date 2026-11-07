import { useQuery } from "@tanstack/react-query";

import AxiosInstance from "@/lib/axios";

export default function useTransactionStats() {
  return useQuery({
    queryKey: ["transaction-stats"],

    queryFn: async () => {
      const response = await AxiosInstance.get(`/transaction/stats`);

      return response.data;
    },

    enabled: true,
  });
}
