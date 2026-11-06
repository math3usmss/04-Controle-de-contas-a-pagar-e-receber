import { z } from "zod";

import { CreateTransactionSchema } from "./createTransaction.schema";
import { TransactionResponseSchema } from "./transaction.schema";

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type UpdateTransactionSchemaInput = z.input<
  typeof UpdateTransactionSchema
>;

export type UpdateTransactionSchemaType = z.infer<
  typeof UpdateTransactionSchema
>;

export const UpdateTransactionSchemaReturn = TransactionResponseSchema;

export type UpdateTransactionSchemaReturnType = z.infer<
  typeof UpdateTransactionSchemaReturn
>;
