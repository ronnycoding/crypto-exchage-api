import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Header,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationPipe } from './validation.pipe';
import { CreatePairDto } from './create-pair.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @Post('pairs')
  createPairs(
    @Body(new ValidationPipe()) createPairDto: CreatePairDto,
  ): Promise<string> {
    return this.appService.createPair(createPairDto);
  }

  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @Get('pairs')
  getPairs(): Promise<void> {
    return this.appService.getPairs();
  }

  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @Get('average')
  getAverage(
    @Query('symbol') symbol: string,
    @Query('lectures') lectures = 1,
  ): Promise<string> {
    return this.appService.getAverage(symbol, lectures);
  }
}
