import { z } from "zod";
export declare const TransactionSchema: z.ZodObject<
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
export declare const TransactionResponseSchema: z.ZodObject<
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
