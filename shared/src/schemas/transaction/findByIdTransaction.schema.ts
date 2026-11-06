import { z } from "zod";
import { TransactionStatus } from "../../types/transaction/enum";
import { TransactionResponseSchema } from "./transaction.schema";

export const FindByIdTransactionSchemaReturn = TransactionResponseSchema.extend(
  {
    status: z.enum(Object.values(TransactionStatus)),
  },
);

export type FindByIdTransactionSchemaReturnType = z.infer<
  typeof FindByIdTransactionSchemaReturn
>;
