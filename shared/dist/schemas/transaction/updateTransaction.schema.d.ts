import { z } from "zod";
export declare const UpdateTransactionSchema: z.ZodObject<
  {
    amount: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    type: z.ZodOptional<
      z.ZodEnum<{
        PAYABLE: "PAYABLE";
        RECEIVABLE: "RECEIVABLE";
      }>
    >;
  },
  z.core.$strip
>;
export type UpdateTransactionSchemaInput = z.input<
  typeof UpdateTransactionSchema
>;
export type UpdateTransactionSchemaType = z.infer<
  typeof UpdateTransactionSchema
>;
export declare const UpdateTransactionSchemaReturn: z.ZodObject<
  {
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodCoercedDate<unknown>;
    type: z.ZodEnum<{
      PAYABLE: "PAYABLE";
      RECEIVABLE: "RECEIVABLE";
    }>;
    id: z.ZodUUID;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
  },
  z.core.$strip
>;
export type UpdateTransactionSchemaReturnType = z.infer<
  typeof UpdateTransactionSchemaReturn
>;
