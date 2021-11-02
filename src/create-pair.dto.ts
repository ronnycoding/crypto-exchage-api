import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePairDto {
  @ApiProperty()
  @IsString()
  symbol: string;
}
