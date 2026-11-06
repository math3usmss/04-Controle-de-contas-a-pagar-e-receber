import { Injectable } from '@nestjs/common';
import {
  FindAllTransactionSchemaReturn,
  type FindAllTransactionSchemaReturnType,
  type QueryTransactionSchemaType,
} from '@starter/shared';

import { TransactionRepository } from '../repository/transaction.repository';

@Injectable()
export class FindAllTransactionUsecase {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    query: QueryTransactionSchemaType,
  ): Promise<FindAllTransactionSchemaReturnType> {
    const result = await this.transactionRepository.findAll(query);

    return FindAllTransactionSchemaReturn.parse(result);
  }
}
