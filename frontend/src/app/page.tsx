"use client";
import { useState } from "react";

import {
  DialogCreateTransaction,
  ListTransactions,
} from "@/modules/transaction/components";

export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <main className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Controle de contas</h2>
        <DialogCreateTransaction />
      </div>
      <ListTransactions page={page} setPage={setPage} />
    </main>
  );
}
