import { z } from "zod";

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export type PaginationQuerySchemaType = z.infer<typeof PaginationQuerySchema>;
