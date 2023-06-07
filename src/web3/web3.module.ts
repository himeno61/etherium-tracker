import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  providers: [Web3Service],
})
export class Web3Module {}
