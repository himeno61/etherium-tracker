import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Transaction } from '../typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async findRecent(): Promise<Transaction[]> {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    return this.transactionsRepository.find({
      take: 10,
      where: { timestamp: MoreThan(yesterday) },
    });
  }

  async storeTransaction(transaction: Partial<Transaction>) {
    console.log(`Storing transaction: ${transaction.id}`);
    const transaction1 = this.transactionsRepository.save(transaction);
    console.log('Stored');
    return transaction1;
  }
}
