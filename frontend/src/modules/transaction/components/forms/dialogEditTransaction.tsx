"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateTransactionSchema,
  UpdateTransactionSchemaInput,
  type UpdateTransactionSchemaType,
} from "@starter/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FieldFormCurrency from "@/components/common/formLabelCurrency";
import FieldForm from "@/components/common/formLabelInput";
import { Button, Label, Textarea } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import { useTransactionById, useUpdateTransaction } from "../../hooks";
import RadioInput from "./radioInput";

interface DialogEditTransactionProps {
  id: string;
  onOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogEditTransaction({
  id,
  onOpen,
  onOpenChange,
}: DialogEditTransactionProps) {
  const { data: transaction } = useTransactionById(id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<
    UpdateTransactionSchemaInput,
    unknown,
    UpdateTransactionSchemaType
  >({
    resolver: zodResolver(UpdateTransactionSchema),
  });

  useEffect(() => {
    if (!transaction) return;

    reset({
      ...transaction,
      dueDate: transaction.dueDate
        ? new Date(transaction.dueDate).toISOString().split("T")[0]
        : undefined,
    });
  }, [transaction, reset]);

  const { mutate, isPending } = useUpdateTransaction(id);

  const onSubmit = (data: UpdateTransactionSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={onOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Editar Transação
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-3"
        >
          <FieldFormCurrency
            label="Valor"
            name="amount"
            control={control}
            error={errors.amount?.message}
          />

          <div className="space-y-1">
            <Label className="text-lg font-semibold">Descrição</Label>

            <Textarea
              {...register("description")}
              className="w-full resize-none py-4"
            />

            {errors.description?.message && (
              <p className="text-destructive text-sm">
                {errors.description?.message}
              </p>
            )}
          </div>

          <RadioInput name="type" control={control} />

          <FieldForm
            label="Data de vencimento"
            register={register("dueDate", {
              setValueAs: (value) => {
                if (!value) return undefined;
                return new Date(`${value}T00:00:00`);
              },
            })}
            error={errors.dueDate?.message}
            type="date"
          />
          <Button type="submit" disabled={isPending}>
            Editar Transação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
