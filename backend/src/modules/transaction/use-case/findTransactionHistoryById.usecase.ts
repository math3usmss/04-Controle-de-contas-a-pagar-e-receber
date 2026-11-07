import { Injectable } from '@nestjs/common';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class FindTransactionHistoryByTransactionIdUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: string) {
    return this.transactionRepository.findHistoryByTransactionId(transactionId);
  }
}
