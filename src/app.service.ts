import { Injectable } from '@nestjs/common';
import { CreatePairDto } from './create-pair.dto';

@Injectable()
export class AppService {
  async createPair(pair: CreatePairDto): Promise<string> {
    return 'Pair created';
  }

  async getPairs(): Promise<string> {
    return 'Pair found';
  }
}
