"use client";

import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

import { EmptyState, ErrorState, LoadingState } from "@/components/common";

import { useTransactionStats } from "../../hooks";
import { SkeletonStatsTransaction } from ".";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function StatsTransaction() {
  const { data: transactionStats, isLoading, error } = useTransactionStats();

  if (isLoading) {
    return (
      <LoadingState items={1}>
        <SkeletonStatsTransaction />
      </LoadingState>
    );
  }

  if (error) {
    return <ErrorState title="Erro ao carregar estatísticas de transação" />;
  }

  if (!transactionStats) {
    return <EmptyState title="Nenhuma estatística de transação disponível" />;
  }

  const stats = [
    {
      title: "Total movimentado",
      value: transactionStats.total,
      description: "Soma de todas as transações",
      icon: Wallet,
      color: "text-primary",
      background: "bg-primary/10",
    },
    {
      title: "Contas a pagar",
      value: transactionStats.payable,
      description: "Total de despesas registradas",
      icon: ArrowUpRight,
      color: "text-red-600",
      background: "bg-red-500/10",
    },
    {
      title: "Contas a receber",
      value: transactionStats.receivable,
      description: "Total de receitas registradas",
      icon: ArrowDownLeft,
      color: "text-green-600",
      background: "bg-green-500/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-card hover:border-primary/30 flex flex-col gap-4 rounded-xl border p-5 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </span>

              <div
                className={`flex size-10 items-center justify-center rounded-lg ${stat.background}`}
              >
                <Icon className={`size-5 ${stat.color}`} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className={`text-2xl font-bold tracking-tight ${stat.color}`}>
                {currencyFormatter.format(stat.value)}
              </h3>

              <p className="text-muted-foreground text-xs">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
