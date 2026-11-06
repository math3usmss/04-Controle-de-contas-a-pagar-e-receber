"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionSchemaReturn = exports.UpdateTransactionSchema =
  void 0;
const createTransaction_schema_1 = require("./createTransaction.schema");
const transaction_schema_1 = require("./transaction.schema");
exports.UpdateTransactionSchema =
  createTransaction_schema_1.CreateTransactionSchema.partial();
exports.UpdateTransactionSchemaReturn =
  transaction_schema_1.TransactionResponseSchema;
