import { Injectable } from '@nestjs/common';
import {
  type CreateTransactionSchemaType,
  type QueryTransactionSchemaType,
  type UpdateTransactionSchemaType,
} from '@starter/shared';

import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreateTransactionSchemaType) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: body,
      });

      await tx.transactionHistory.create({
        data: {
          transactionId: transaction.id,
          action: 'CREATED',
          description: 'Transação criada',
        },
      });

      return transaction;
    });
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async findAll(query: QueryTransactionSchemaType) {
    const { page } = query;

    const limit = 5;
    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      this.prisma.transaction.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.transaction.count(),
    ]);

    return {
      transactions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  }

  async findAllHistory(query: QueryTransactionSchemaType) {
    const { page } = query;

    const limit = 5;
    const skip = (page - 1) * limit;

    const [histories, total] = await Promise.all([
      this.prisma.transactionHistory.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          transaction: true,
        },
      }),
      this.prisma.transactionHistory.count(),
    ]);

    return {
      histories: histories,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      limit,
    };
  }

  async findHistoryByTransactionId(transactionId: string) {
    return this.prisma.transactionHistory.findMany({
      where: {
        transactionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async stats() {
    const [total, payable, receivable] = await Promise.all([
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
      }),

      this.prisma.transaction.aggregate({
        where: { type: 'PAYABLE' },
        _sum: { amount: true },
      }),

      this.prisma.transaction.aggregate({
        where: { type: 'RECEIVABLE' },
        _sum: { amount: true },
      }),
    ]);

    return {
      total: total._sum.amount ?? 0,
      payable: payable._sum.amount ?? 0,
      receivable: receivable._sum.amount ?? 0,
    };
  }

  async update(body: UpdateTransactionSchemaType, id: string) {
    return this.prisma.$transaction(async (tx) => {
      const previous = await tx.transaction.findUniqueOrThrow({
        where: { id },
      });

      const changes: string[] = [];

      for (const key of Object.keys(body) as (keyof typeof body)[]) {
        const oldValue = previous[key];
        const newValue = body[key];

        if (newValue === undefined) continue;

        const oldNormalized =
          oldValue instanceof Date
            ? oldValue.toISOString()
            : String(oldValue ?? '');

        const newNormalized =
          newValue instanceof Date
            ? newValue.toISOString()
            : String(newValue ?? '');

        if (oldNormalized !== newNormalized) {
          changes.push(`${key}: ${oldNormalized} → ${newNormalized}`);
        }
      }

      if (changes.length === 0) {
        return previous;
      }

      const transaction = await tx.transaction.update({
        where: { id },
        data: body,
      });

      await tx.transactionHistory.create({
        data: {
          transactionId: transaction.id,
          action: 'UPDATED',
          description: changes.join('; '),
        },
      });

      return transaction;
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.delete({
        where: { id },
      });

      await tx.transactionHistory.create({
        data: {
          transactionId: transaction.id,
          action: 'CANCELED',
          description: 'Transação cancelada',
        },
      });

      return transaction;
    });
  }
}
