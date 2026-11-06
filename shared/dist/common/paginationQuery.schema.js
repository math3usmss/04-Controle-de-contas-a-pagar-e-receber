"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQuerySchema = void 0;
const zod_1 = require("zod");
exports.PaginationQuerySchema = zod_1.z.object({
  page: zod_1.z.coerce.number().int().min(1).default(1),
});
