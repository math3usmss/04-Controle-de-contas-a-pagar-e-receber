"use client";

import { useState } from "react";

import { DialogCreateTransaction, ListTransactions } from "../components";

export default function TransactionPage() {
  const [page, setPage] = useState(1);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>

        <DialogCreateTransaction />
      </div>

      <ListTransactions page={page} setPage={setPage} />
    </section>
  );
}
