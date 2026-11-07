"use client";

import {
  CheckCircle2,
  FilePlus2,
  History,
  Pencil,
  RotateCcw,
  XCircle,
} from "lucide-react";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/common/states";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import useTransactionHistory from "../../hooks/useTransactionsHistory.hook";

interface DialogTransactionHistoryProps {
  transactionId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatHistoryDescription(description: string): string {
  return description.replace(
    /dueDate:\s*(\S+)\s*→\s*(\S+)/g,
    (_, oldDate: string, newDate: string) => {
      const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          dateStyle: "short",
        }).format(new Date(date));
      };

      return `Vencimento: ${formatDate(oldDate)} → ${formatDate(newDate)}`;
    },
  );
}

const actionConfig = {
  CREATED: {
    label: "Transação criada",
    icon: FilePlus2,
    color: "text-blue-600 bg-blue-500/10",
  },
  UPDATED: {
    label: "Transação atualizada",
    icon: Pencil,
    color: "text-yellow-600 bg-yellow-500/10",
  },
  PAID: {
    label: "Pagamento registrado",
    icon: CheckCircle2,
    color: "text-green-600 bg-green-500/10",
  },
  CANCELED: {
    label: "Transação cancelada",
    icon: XCircle,
    color: "text-red-600 bg-red-500/10",
  },
  REOPENED: {
    label: "Transação reaberta",
    icon: RotateCcw,
    color: "text-purple-600 bg-purple-500/10",
  },
} as const;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export default function DialogTransactionHistory({
  transactionId,
  open,
  onOpenChange,
}: DialogTransactionHistoryProps) {
  const {
    data: histories,
    isLoading,
    isError,
  } = useTransactionHistory(transactionId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="size-5" />
            Histórico da transação
          </DialogTitle>

          <DialogDescription>
            Acompanhe todas as alterações realizadas.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <LoadingState items={3}>
            <div className="bg-muted h-20 animate-pulse rounded-md" />
          </LoadingState>
        ) : isError ? (
          <ErrorState title="Erro ao carregar histórico." />
        ) : !histories?.length ? (
          <EmptyState title="Nenhum histórico encontrado." />
        ) : (
          <div className="max-h-[60vh] overflow-y-auto py-2">
            <ol className="relative ml-4 border-l">
              {histories.map((history) => {
                const config = actionConfig[history.action];
                const Icon = config.icon;

                return (
                  <li key={history.id} className="relative mb-6 ml-6 last:mb-0">
                    <div
                      className={`border-background absolute -left-9.75 flex size-8 items-center justify-center rounded-full border-4 ${config.color}`}
                    >
                      <Icon className="size-4" />
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-semibold">
                          {config.label}
                        </h4>

                        <p className="text-muted-foreground text-xs">
                          {dateFormatter.format(new Date(history.createdAt))}
                        </p>
                      </div>

                      <div className="bg-muted/40 rounded-lg p-3">
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {formatHistoryDescription(history.description)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
