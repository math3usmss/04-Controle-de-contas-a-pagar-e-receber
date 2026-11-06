import { z } from "zod";
export declare const FindByIdTransactionSchemaReturn: z.ZodObject<
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
    status: z.ZodEnum<{
      PENDING: "PENDING";
      COMPLETED: "COMPLETED";
      CANCELLED: "CANCELLED";
    }>;
  },
  z.core.$strip
>;
export type FindByIdTransactionSchemaReturnType = z.infer<
  typeof FindByIdTransactionSchemaReturn
>;
