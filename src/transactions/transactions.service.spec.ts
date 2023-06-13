import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Transaction } from '../typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repository: Repository<Transaction>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get(getRepositoryToken(Transaction));
  });

  it('should be defined', async () => {
    const now = new Date();
    const transaction: Transaction = {
      id: 'mockedId',
      to: 'mockedTo',
      from: 'mockedFrom',
      value: 'mockedValue',
      createdAt: now,
      timestamp: now,
    };

    const findOneSpy = jest
      .spyOn(repository, 'find')
      .mockResolvedValue(Array.of(transaction));
    const transactions = await service.findRecent();
    expect(transactions).toContain(transaction);
  });
});
