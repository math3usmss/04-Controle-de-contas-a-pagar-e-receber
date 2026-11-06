import { z } from "zod";

import {
  TransactionSchema,
  TransactionResponseSchema,
} from "./transaction.schema";

export const CreateTransactionSchema = TransactionSchema;

export type CreateTransactionSchemaInput = z.input<
  typeof CreateTransactionSchema
>;

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;

export const CreateTransactionSchemaReturn = TransactionResponseSchema;

export type CreateTransactionSchemaReturnType = z.infer<
  typeof CreateTransactionSchemaReturn
>;
