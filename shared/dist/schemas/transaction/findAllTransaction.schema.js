"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTransactionSchemaReturn = void 0;
const zod_1 = require("zod");
const transaction_schema_1 = require("./transaction.schema");
const enum_1 = require("../../types/transaction/enum");
exports.FindAllTransactionSchemaReturn = zod_1.z.object({
  transactions: zod_1.z.array(
    transaction_schema_1.TransactionResponseSchema.extend({
      status: zod_1.z.enum(Object.values(enum_1.TransactionStatus)),
    }),
  ),
  total: zod_1.z.number().int().nonnegative(),
  page: zod_1.z.number().int().min(1),
  limit: zod_1.z.number().int().positive(),
  totalPages: zod_1.z.number().int().nonnegative(),
});
