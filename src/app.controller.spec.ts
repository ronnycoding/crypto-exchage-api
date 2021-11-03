import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './task.service';

import { pairs, average, symbol } from './utils';

const mocks = {
  pairs,
  average,
  symbol,
};

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  const mockAppService = {
    createPair: jest.fn(async () => null),
    getPairs: jest.fn(async () => mocks.pairs),
    getAverage: jest.fn(async () => mocks.average),
  };
  const mockTasksService = {
    handleCron: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, TasksService],
    })
      .overrideProvider(AppService)
      .useValue(mockAppService)
      .overrideProvider(TasksService)
      .useValue(mockTasksService)
      .compile();

    appService = moduleRef.get<AppService>(AppService);
    controller = moduleRef.get<AppController>(AppController);
  });

  it('it should be defined', () => {
    expect(controller).toBeDefined();
    expect(appService).toBeDefined();
  });

  it('it should work get pairs', async () => {
    const pairs = await controller.getPairs();
    expect(pairs).toEqual(pairs);
    expect(mockAppService.getPairs).toHaveBeenCalled();
  });

  it('it should work get average', async () => {
    const average = await controller.getAverage(mocks.symbol);
    expect(average).toEqual(mocks.average);
    expect(mockAppService.getPairs).toHaveBeenCalled();
  });

  it('it should work create pair', async () => {
    await controller.createPairs({ symbol: mocks.symbol });
    expect(mockAppService.createPair).toHaveBeenCalled();
  });
});
