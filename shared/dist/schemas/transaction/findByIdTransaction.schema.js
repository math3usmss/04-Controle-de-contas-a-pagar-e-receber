"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdTransactionSchemaReturn = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../types/transaction/enum");
const transaction_schema_1 = require("./transaction.schema");
exports.FindByIdTransactionSchemaReturn =
  transaction_schema_1.TransactionResponseSchema.extend({
    status: zod_1.z.enum(Object.values(enum_1.TransactionStatus)),
  });
