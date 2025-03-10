import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsModel {
  constructor() { }
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    return cat;
  }

  findAll(): Array<Cat> {
    return this.cats;
  }
}
