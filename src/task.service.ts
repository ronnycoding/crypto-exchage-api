import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class TasksService {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Running crone job every one hour');
    await this.appService.syncPairsAveragePricing();
    this.logger.debug('Crone job finished');
  }
}
