import { Module } from '@nestjs/common';
import { BasicStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule.forRoot()],
  providers: [BasicStrategy],
  exports: [BasicStrategy],
})
export class AuthModule {}
