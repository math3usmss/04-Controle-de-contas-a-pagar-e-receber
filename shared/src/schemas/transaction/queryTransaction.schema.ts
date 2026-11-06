import { z } from "zod";

import { PaginationQuerySchema } from "../../common/paginationQuery.schema";

export const QueryTransactionSchema = PaginationQuerySchema;

export type QueryTransactionSchemaType = z.infer<typeof QueryTransactionSchema>;
