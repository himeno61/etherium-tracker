import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../typeorm';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.findRecent();
  }
}
