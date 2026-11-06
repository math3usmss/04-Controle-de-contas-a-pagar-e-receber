import { ApiBodyOptions } from '@nestjs/swagger';

export const CreateTransactionSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      // Campos da transaction
    },
    required: [
      // Campos obrigatórios
    ],
  },
};
