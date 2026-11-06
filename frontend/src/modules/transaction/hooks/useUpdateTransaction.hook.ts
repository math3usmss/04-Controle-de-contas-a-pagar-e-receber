import {
  type UpdateTransactionSchemaReturnType,
  type UpdateTransactionSchemaType,
} from "@starter/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import AxiosInstance from "@/lib/axios";

export default function useUpdateTransaction(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTransaction", id],

    mutationFn: async (transactionData: UpdateTransactionSchemaType) => {
      const response =
        await AxiosInstance.patch<UpdateTransactionSchemaReturnType>(
          `/transaction/${id}`,
          transactionData,
        );

      return response.data;
    },

    onSuccess: async () => {
      toast.success("Transação atualizada com sucesso");

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["transactions"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["transaction", id],
        }),
      ]);
    },

    onError: (error) => {
      toast.error("Falha ao atualizar Transação");
      console.error("Falha ao atualizar Transação:", error);
    },
  });
}
