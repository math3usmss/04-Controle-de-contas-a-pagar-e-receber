import { ApiBodyOptions } from '@nestjs/swagger';

export const UpdateTransactionSwagger: ApiBodyOptions = {
  schema: {
    type: 'object',
    properties: {
      // Campos atualizáveis da transaction
    },
  },
};
