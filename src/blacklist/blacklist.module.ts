import { Module } from '@nestjs/common';
import { BlacklistGuard } from './blacklist.guard';
import { BlacklistService } from './blacklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from '../typeorm';
import { BlacklistController } from './blacklist.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistEntity]), AuthModule],
  exports: [BlacklistGuard, BlacklistService],
  providers: [BlacklistGuard, BlacklistService],
  controllers: [BlacklistController],
})
export class BlacklistModule {}
