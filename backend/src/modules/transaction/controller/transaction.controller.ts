import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTransactionSchema,
  type CreateTransactionSchemaReturnType,
  type CreateTransactionSchemaType,
  type FindAllTransactionSchemaReturnType,
  type FindByIdTransactionSchemaReturnType,
  QueryTransactionSchema,
  type QueryTransactionSchemaType,
  UpdateTransactionSchema,
  type UpdateTransactionSchemaReturnType,
  type UpdateTransactionSchemaType,
} from '@starter/shared';

import { ZodValidationPipe } from '../../../common/pipes/zod-validation.pipe';
import { CreateTransactionSwagger, UpdateTransactionSwagger } from '../swagger';
import {
  CreateTransactionUsecase,
  DeleteTransactionUsecase,
  FindAllTransactionUsecase,
  FindByIdTransactionUsecase,
  UpdateTransactionUsecase,
} from '../use-case';

@ApiTags('transactions')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly createTransactionUsecase: CreateTransactionUsecase,
    private readonly findAllTransactionUsecase: FindAllTransactionUsecase,
    private readonly findByIdTransactionUsecase: FindByIdTransactionUsecase,
    private readonly updateTransactionUsecase: UpdateTransactionUsecase,
    private readonly deleteTransactionUsecase: DeleteTransactionUsecase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova Transação' })
  @ApiResponse({
    status: 201,
    description: 'Transação criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiBody(CreateTransactionSwagger)
  async create(
    @Body(new ZodValidationPipe(CreateTransactionSchema))
    body: CreateTransactionSchemaType,
  ): Promise<CreateTransactionSchemaReturnType> {
    return this.createTransactionUsecase.execute(body);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todas as transações' })
  @ApiResponse({
    status: 200,
    description: 'Transações encontradas com sucesso',
  })
  async findAll(
    @Query(new ZodValidationPipe(QueryTransactionSchema))
    query: QueryTransactionSchemaType,
  ): Promise<FindAllTransactionSchemaReturnType> {
    return this.findAllTransactionUsecase.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma transação pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Transação encontrada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Transação não encontrada',
  })
  async findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<FindByIdTransactionSchemaReturnType> {
    return this.findByIdTransactionUsecase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza uma transação pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Transação atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Transação não encontrada',
  })
  @ApiBody(UpdateTransactionSwagger)
  async update(
    @Body(new ZodValidationPipe(UpdateTransactionSchema))
    body: UpdateTransactionSchemaType,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UpdateTransactionSchemaReturnType> {
    return this.updateTransactionUsecase.execute(body, id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleta uma transação pelo ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Transação deletada com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Transação não encontrada',
  })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    await this.deleteTransactionUsecase.execute(id);

    return {
      message: 'Transação deletada com sucesso',
    };
  }
}
