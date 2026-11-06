import { Injectable } from '@nestjs/common';
import {
  UpdateTransactionSchemaReturn,
  type UpdateTransactionSchemaReturnType,
  type UpdateTransactionSchemaType,
} from '@starter/shared';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class UpdateTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    body: UpdateTransactionSchemaType,
    id: string,
  ): Promise<UpdateTransactionSchemaReturnType> {
    const transaction = await this.transactionRepository.update(body, id);

    return UpdateTransactionSchemaReturn.parse(transaction);
  }
}
