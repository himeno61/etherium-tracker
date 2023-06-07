import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class BlacklistGuard implements CanActivate {
  constructor(private blacklistService: BlacklistService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = request.connection.remoteAddress;
    console.log(`ip address: ${ip}`);
    return this.blacklistService.isIpAllowed(ip);
  }
}
