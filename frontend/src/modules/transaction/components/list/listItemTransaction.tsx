import type { FindByIdTransactionSchemaReturnType } from "@starter/shared";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { MenuList } from "@/components/common";
import { Badge } from "@/components/ui";

import { ButtonDeleteTransaction } from "../features";
import { DialogEditTransaction } from "../forms";

interface ListItemTransactionProps {
  transaction: FindByIdTransactionSchemaReturnType;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export default function ListItemTransaction({
  transaction,
}: ListItemTransactionProps) {
  const [isEdit, setIsEdit] = useState(false);
  const isPayable = transaction.type === "PAYABLE";

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
  }).format(new Date(transaction.dueDate));

  return (
    <li className="hover:bg-muted/30 space-y-4 rounded-lg border p-4 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${
            isPayable
              ? "bg-red-500/10 text-red-600"
              : "bg-green-500/10 text-green-600"
          }`}
        >
          {isPayable ? (
            <ArrowUpRight className="size-6" />
          ) : (
            <ArrowDownLeft className="size-6" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold">{transaction.description}</h3>

          <p className="text-muted-foreground text-sm">
            Vencimento: {formattedDate}
          </p>
        </div>

        <div className="text-right">
          <p
            className={`text-lg font-bold ${
              isPayable ? "text-red-600" : "text-green-600"
            }`}
          >
            {isPayable ? "- " : "+ "}
            {currencyFormatter.format(transaction.amount)}
          </p>

          <Badge
            variant="outline"
            className={
              transaction.status === "PENDING"
                ? "border-green-500/30 bg-green-500/10 text-green-600"
                : "border-yellow-500/30 bg-yellow-500/10 text-yellow-600"
            }
          >
            {transaction.status === "COMPLETED"
              ? isPayable
                ? "Pago"
                : "Recebido"
              : "Pendente"}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <span className="text-muted-foreground text-xs">
          {isPayable ? "Conta a pagar" : "Conta a receber"}
        </span>

        <MenuList
          onEdit={() => setIsEdit(true)}
          deleteComponent={<ButtonDeleteTransaction id={transaction.id} />}
          editComponent={
            <DialogEditTransaction
              id={transaction.id}
              onOpen={isEdit}
              onOpenChange={setIsEdit}
            />
          }
        />
      </div>
    </li>
  );
}
