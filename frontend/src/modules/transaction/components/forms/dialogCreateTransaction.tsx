"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTransactionSchema,
  CreateTransactionSchemaInput,
  type CreateTransactionSchemaType,
} from "@starter/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FieldFormCurrency from "@/components/common/formLabelCurrency";
import FieldForm from "@/components/common/formLabelInput";
import { Textarea } from "@/components/ui";
import { Button, Label } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

import { useCreateTransaction } from "../../hooks";
import { RadioInput } from ".";

export default function DialogCreateTransaction() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<
    CreateTransactionSchemaInput,
    unknown,
    CreateTransactionSchemaType
  >({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type: "PAYABLE",
    },
  });

  const { mutate, isPending } = useCreateTransaction();

  const onSubmit = (data: CreateTransactionSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="bg-primary text-primary-foreground">
            Cadastrar Transação
          </Button>
        }
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Cadastrar Transação
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
            Criar Transação
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
