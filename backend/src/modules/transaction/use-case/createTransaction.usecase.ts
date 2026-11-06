import { Injectable } from '@nestjs/common';
import {
  CreateTransactionSchemaReturn,
  type CreateTransactionSchemaReturnType,
  type CreateTransactionSchemaType,
} from '@starter/shared';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class CreateTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    body: CreateTransactionSchemaType,
  ): Promise<CreateTransactionSchemaReturnType> {
    const transaction = await this.transactionRepository.create(body);

    return CreateTransactionSchemaReturn.parse(transaction);
  }
}
