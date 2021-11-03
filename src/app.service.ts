import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CreatePairDto } from './create-pair.dto';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Spot } from '@binance/connector';
import { Repository } from 'typeorm';
import { Pair } from './pair.entity';
import { HistoricalPrice } from './historical-price.entity';

@Injectable()
export class AppService {
  private client: Spot;
  constructor(
    @InjectRepository(Pair)
    private pairsRepository: Repository<Pair>,
    @InjectRepository(HistoricalPrice)
    private historicalPricesRepository: Repository<HistoricalPrice>,
    private connection: Connection,
  ) {
    this.client = new Spot(
      process.env.BINANCE_API_PUBLIC_KEY,
      process.env.BINANCE_API_PRIVATE_KEY,
    );
  }
  async createPair(pair: CreatePairDto): Promise<null> {
    const symbol = pair.symbol.toLowerCase();
    await this.client.exchangeInfo({
      symbol,
    });
    const newPair = new Pair();
    newPair.symbol = pair.symbol.toUpperCase();
    await this.pairsRepository.save(newPair);
    return null;
  }

  async getPairs(): Promise<any> {
    const results = await this.pairsRepository.createQueryBuilder().getMany();
    return {
      results,
    };
  }

  async syncPairsAveragePricing(): Promise<void> {
    const pairs = await this.pairsRepository.createQueryBuilder().getMany();
    await Promise.all(
      pairs.map(async (pair: Pair) => {
        const avgPrice = await this.client.avgPrice(pair.symbol);
        const pairDB = await this.pairsRepository.findOne(pair.id);
        const historicalPrice = new HistoricalPrice();
        historicalPrice.value = avgPrice.data.price;
        historicalPrice.date = new Date();
        historicalPrice.pair = pairDB;
        await this.connection.manager.save(historicalPrice);
        pairDB.historicalPrices?.push(historicalPrice);
        await this.connection.manager.save(pairDB);
        return { price: avgPrice.data.price, pair: pair.symbol };
      }),
    );
  }

  async getAverage(symbol: string, lectures: number = null): Promise<any> {
    const pair = await this.connection
      .getRepository(Pair)
      .createQueryBuilder('pair')
      .where('pair.symbol = :symbol', { symbol })
      .getOne();

    const results: HistoricalPrice[] = await this.historicalPricesRepository
      .createQueryBuilder('historicalPrice')
      .where('historicalPrice.pair = :pair', { pair: pair.id })
      .limit(lectures)
      .getMany();

    const average =
      results?.reduce((acc, curr) => acc + curr?.value, 0) / results.length;

    return {
      average,
      numberOfLectures: results.length,
    };
  }
}
