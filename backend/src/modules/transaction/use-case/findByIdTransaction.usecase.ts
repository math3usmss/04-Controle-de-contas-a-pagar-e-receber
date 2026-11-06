import { Injectable, NotFoundException } from '@nestjs/common';
import {
  FindByIdTransactionSchemaReturn,
  type FindByIdTransactionSchemaReturnType,
} from '@starter/shared';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class FindByIdTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<FindByIdTransactionSchemaReturnType> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transação não encontrada');
    }

    return FindByIdTransactionSchemaReturn.parse(transaction);
  }
}
