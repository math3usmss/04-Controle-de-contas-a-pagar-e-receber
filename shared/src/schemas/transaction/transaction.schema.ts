import { z } from "zod";
import { TransactionType } from "../../types/transaction/enum";
export const TransactionSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  dueDate: z.coerce.date({
    error: "Data de vencimento inválida",
  }),
  type: z.enum(Object.values(TransactionType)),
});

export const TransactionResponseSchema = TransactionSchema.extend({
  id: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
