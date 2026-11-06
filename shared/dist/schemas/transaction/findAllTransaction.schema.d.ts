import { z } from "zod";
export declare const FindAllTransactionSchemaReturn: z.ZodObject<
  {
    transactions: z.ZodArray<
      z.ZodObject<
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
      >
    >;
    total: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
  },
  z.core.$strip
>;
export type FindAllTransactionSchemaReturnType = z.infer<
  typeof FindAllTransactionSchemaReturn
>;
