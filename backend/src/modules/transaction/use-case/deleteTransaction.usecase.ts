import { Injectable } from '@nestjs/common';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class DeleteTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(id: string): Promise<void> {
    await this.transactionRepository.delete(id);
  }
}
