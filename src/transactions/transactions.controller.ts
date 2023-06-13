import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../typeorm';
import { BlacklistGuard } from '../blacklist/blacklist.guard';

@Controller('transactions')
@UseGuards(BlacklistGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(): Promise<Transaction[]> {
    return this.transactionsService.findRecent();
  }
}
