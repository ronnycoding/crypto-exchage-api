import { Controller, Get, Post, Body, HttpCode, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePairDto } from './create-pair.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  @Post('pairs')
  createPairs(@Body() createPairDto: CreatePairDto): Promise<string> {
    return this.appService.createPair(createPairDto);
  }

  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  @Get('pairs')
  getPairs(): Promise<string> {
    return this.appService.getPairs();
  }
}
