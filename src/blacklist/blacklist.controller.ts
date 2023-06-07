import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlacklistEntity } from '../typeorm';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dtos/CreateBlacklistDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @UseGuards(AuthGuard('basic'))
  @Post()
  async create(
    @Body() blacklistDto: CreateBlacklistDto,
  ): Promise<BlacklistEntity> {
    return await this.blacklistService.storeBlackListedIpAddress(blacklistDto);
  }
}
