"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionSchemaReturn = exports.CreateTransactionSchema =
  void 0;
const transaction_schema_1 = require("./transaction.schema");
exports.CreateTransactionSchema = transaction_schema_1.TransactionSchema;
exports.CreateTransactionSchemaReturn =
  transaction_schema_1.TransactionResponseSchema;
