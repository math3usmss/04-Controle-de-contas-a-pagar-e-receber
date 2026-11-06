import { z } from "zod";
export declare const CreateTransactionSchema: z.ZodObject<
  {
    amount: z.ZodNumber;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodCoercedDate<unknown>;
    type: z.ZodEnum<{
      PAYABLE: "PAYABLE";
      RECEIVABLE: "RECEIVABLE";
    }>;
  },
  z.core.$strip
>;
export type CreateTransactionSchemaInput = z.input<
  typeof CreateTransactionSchema
>;
export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;
export declare const CreateTransactionSchemaReturn: z.ZodObject<
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
export type CreateTransactionSchemaReturnType = z.infer<
  typeof CreateTransactionSchemaReturn
>;
