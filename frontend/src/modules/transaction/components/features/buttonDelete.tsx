"use client";

import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";

import { useDeleteTransaction } from "../../hooks";

interface ButtonDeleteTransactionProps {
  id: string;
}

export default function ButtonDeleteTransaction({
  id,
}: ButtonDeleteTransactionProps) {
  const { mutateAsync: deleteTransaction, isPending } =
    useDeleteTransaction(id);

  return (
    <ConfirmDeleteDialog
      description="Esta ação não pode ser desfeita. Isso irá deletar permanentemente a Transação."
      onConfirm={() => deleteTransaction()}
      isPending={isPending}
    />
  );
}
