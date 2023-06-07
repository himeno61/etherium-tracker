import { Injectable } from '@nestjs/common';
import { BlacklistEntity } from '../typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { extractAddress } from './utils';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlacklistEntity)
    private blacklistRepository: Repository<BlacklistEntity>,
  ) {}

  async isIpAllowed(ipAddress: string): Promise<boolean> {
    const blacklists = await this.blacklistRepository.find({
      where: { ipAddress: extractAddress(ipAddress) },
    });
    console.log(
      `checking ip: ${extractAddress(ipAddress)} and got: ${blacklists}`,
    );
    return blacklists.length === 0;
  }

  async storeBlackListedIpAddress(ipAddress: string): Promise<BlacklistEntity> {
    return await this.blacklistRepository.save({
      ipAddress: extractAddress(ipAddress),
    });
  }
}
