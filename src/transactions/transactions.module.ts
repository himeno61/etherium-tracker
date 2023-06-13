import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../typeorm';
import { BlacklistModule } from '../blacklist/blacklist.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), BlacklistModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
