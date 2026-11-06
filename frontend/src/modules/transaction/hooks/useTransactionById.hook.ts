import type { FindByIdTransactionSchemaReturnType } from "@starter/shared";
import { useQuery } from "@tanstack/react-query";

import AxiosInstance from "@/lib/axios";

export default function useTransactionById(id: string) {
  return useQuery({
    queryKey: ["transaction", id],

    queryFn: async () => {
      const response =
        await AxiosInstance.get<FindByIdTransactionSchemaReturnType>(
          `/transaction/${id}`,
        );

      return response.data;
    },

    enabled: !!id,
  });
}
