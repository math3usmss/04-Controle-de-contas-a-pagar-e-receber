"use client";

import { ListPagination } from "@/components/common";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/states";

import { useTransactions } from "../../hooks";
import { ListItemTransaction } from ".";

interface ListTransactionsProps {
  page: number;
  setPage: (page: number) => void;
}

export default function ListTransactions({
  page,
  setPage,
}: ListTransactionsProps) {
  const {
    data: { transactions, limit, totalPages } = {},
    isLoading,
    isError,
  } = useTransactions(page);

  if (isLoading) {
    return (
      <LoadingState items={5}>
        <div className="bg-muted h-16 animate-pulse rounded-md" />
      </LoadingState>
    );
  }

  if (isError) {
    return <ErrorState title="Erro ao carregar transações." />;
  }

  if (!transactions?.length) {
    return <EmptyState title="Nenhuma transação encontrada." />;
  }

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-3">
        {transactions.map((transaction) => (
          <ListItemTransaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>

      {totalPages && totalPages > 1 && (
        <div className="mt-3 flex justify-end">
          <ListPagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            limit={limit}
          />
        </div>
      )}
    </div>
  );
}
