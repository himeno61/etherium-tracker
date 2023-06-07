import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BasicStrategy } from '../auth/auth-basic.strategy';
import { BlacklistEntity } from '../typeorm';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dtos/CreateBlacklistDto';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Post()
  @UseGuards(BasicStrategy)
  async create(
    @Body() blacklistDto: CreateBlacklistDto,
  ): Promise<BlacklistEntity> {
    return await this.blacklistService.storeBlackListedIpAddress(blacklistDto);
  }
}
