import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import AxiosInstance from "@/lib/axios";

export default function useDeleteTransaction(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTransaction", id],

    mutationFn: async () => {
      await AxiosInstance.delete(`/transaction/${id}`);
    },

    onSuccess: async () => {
      toast.success("Transação deletada com sucesso");

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.removeQueries({
        queryKey: ["transaction", id],
      });
    },

    onError: (error) => {
      toast.error("Falha ao deletar Transação");
      console.error("Falha ao deletar Transação:", error);
    },
  });
}
