import { z } from "zod";
export declare const PaginationQuerySchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
  },
  z.core.$strip
>;
export type PaginationQuerySchemaType = z.infer<typeof PaginationQuerySchema>;
