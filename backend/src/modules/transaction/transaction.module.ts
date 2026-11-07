import { Module } from '@nestjs/common';

import { TransactionController } from './controller/transaction.controller';
import { TransactionRepository } from './repository/transaction.repository';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
  FindAllTransactionUsecase,
  FindByIdTransactionUsecase,
  FindTransactionHistoryByTransactionIdUsecase,
  StatsTransactionUsecase,
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
    StatsTransactionUsecase,
    DeleteTransactionUsecase,
    FindTransactionHistoryByTransactionIdUsecase,
  ],
})
export class TransactionModule {}
