import { z } from "zod";

import { TransactionResponseSchema } from "./transaction.schema";
import { TransactionStatus } from "../../types/transaction/enum";

export const FindAllTransactionSchemaReturn = z.object({
  transactions: z.array(
    TransactionResponseSchema.extend({
      status: z.enum(Object.values(TransactionStatus)),
    }),
  ),
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
});

export type FindAllTransactionSchemaReturnType = z.infer<
  typeof FindAllTransactionSchemaReturn
>;
