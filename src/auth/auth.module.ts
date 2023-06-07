import { Module } from '@nestjs/common';
import { BasicStrategy } from './auth-basic.strategy';

@Module({
  providers: [BasicStrategy],
  exports: [BasicStrategy],
})
export class AuthModule {}
