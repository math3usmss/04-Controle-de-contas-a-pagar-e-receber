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
    return this.prisma.transaction.create({
      data: body,
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

  async;

  async update(body: UpdateTransactionSchemaType, id: string) {
    return this.prisma.transaction.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
