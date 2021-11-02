import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { HistoricalPrice } from './historical-price.entity';

@Entity()
@Unique(['symbol'])
export class Pair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @OneToMany(() => HistoricalPrice, (historicalPrice) => historicalPrice.pair)
  historicalPrices: HistoricalPrice[];
}
