"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResponseSchema = exports.TransactionSchema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../types/transaction/enum");
exports.TransactionSchema = zod_1.z.object({
  amount: zod_1.z.number(),
  description: zod_1.z.string().optional(),
  dueDate: zod_1.z.coerce.date({
    error: "Data de vencimento inválida",
  }),
  type: zod_1.z.enum(Object.values(enum_1.TransactionType)),
});
exports.TransactionResponseSchema = exports.TransactionSchema.extend({
  id: zod_1.z.uuid(),
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
});
