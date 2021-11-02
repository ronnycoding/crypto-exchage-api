import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Pair } from './pair.entity';

@Entity()
export class HistoricalPrice {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  date: Date;

  @Column('float')
  value: number;

  @ManyToOne(() => Pair, (pair) => pair.historicalPrices)
  pair: Pair;
}
