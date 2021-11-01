import { IsString } from 'class-validator';

export class CreatePairDto {
  @IsString()
  symbol: string;
}
