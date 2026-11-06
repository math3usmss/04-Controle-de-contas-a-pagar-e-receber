import {
  type CreateTransactionSchemaReturnType,
  type CreateTransactionSchemaType,
} from "@starter/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import AxiosInstance from "@/lib/axios";

export default function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createTransaction"],

    mutationFn: async (transactionData: CreateTransactionSchemaType) => {
      const response =
        await AxiosInstance.post<CreateTransactionSchemaReturnType>(
          "/transaction",
          transactionData,
        );

      return response.data;
    },

    onSuccess: async () => {
      toast.success("Transação criada com sucesso");

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },

    onError: (error) => {
      toast.error("Falha ao criar Transação");
      console.error("Falha ao criar Transação:", error);
    },
  });
}
