import { IsNotEmpty } from 'class-validator';

export class CreateBlacklistDto {
  @IsNotEmpty()
  ipAddress: string;

  reason: string;
}
