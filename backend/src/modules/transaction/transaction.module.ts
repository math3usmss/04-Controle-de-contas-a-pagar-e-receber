import { Module } from '@nestjs/common';

import { TransactionController } from './controller/transaction.controller';
import { TransactionRepository } from './repository/transaction.repository';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
  FindAllTransactionUsecase,
  FindByIdTransactionUsecase,
  UpdateTransactionUsecase,
} from './use-case';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [
    TransactionRepository,
    CreateTransactionUsecase,
    FindAllTransactionUsecase,
    FindByIdTransactionUsecase,
    UpdateTransactionUsecase,
    DeleteTransactionUsecase,
  ],
})
export class TransactionModule {}
