"use client";

import { type ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  title?: string;
  description?: string;
  trigger?: ReactNode;
  onConfirm: () => Promise<unknown>;
  isPending?: boolean;
}

export default function ConfirmDeleteDialog({
  title = "Você tem certeza?",
  description = "Esta ação não pode ser desfeita.",

  onConfirm,
  isPending = false,
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className="w-full cursor-pointer">
            Apagar
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              void handleConfirm();
            }}
          >
            {isPending ? "Excluindo..." : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
