import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pair } from './pair.entity';
import { HistoricalPrice } from './historical-price.entity';
import { TasksService } from './task.service';

@Module({
  exports: [TypeOrmModule],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Pair, HistoricalPrice],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Pair, HistoricalPrice]),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private taskService: TasksService,
  ) {
    this.taskService.handleCron();
  }
}
