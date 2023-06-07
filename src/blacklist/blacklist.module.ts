import { Module } from '@nestjs/common';
import { BlacklistGuard } from './blacklist.guard';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from '../typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistEntity])],
  exports: [BlacklistGuard, BlacklistService],
  providers: [BlacklistGuard, BlacklistService],
})
export class BlacklistModule {}
