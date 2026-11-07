import { Injectable } from '@nestjs/common';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class StatsTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute() {
    return this.transactionRepository.stats();
  }
}
