import { z } from "zod";
export declare const QueryTransactionSchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
  },
  z.core.$strip
>;
export type QueryTransactionSchemaType = z.infer<typeof QueryTransactionSchema>;
