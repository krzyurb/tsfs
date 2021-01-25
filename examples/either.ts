import { maybe } from 'src';
import * as L from '..';

class X<T> {
  private readonly val: T;
  constructor(val: T) {
    this.val = val;
  }

  public getVal(): T | null | undefined {
    return this.val;
  }
}

const dupa = (...args: any): number | null => null;

interface Person {
  age?: number | null;
  name?: string;
}

const p1: Person = { name: 'a', age: 10 };
const p2: Person = { name: 'a' };
const p3: Person = { age: 32 };

// Maybe

const maybeResult = L.maybe(p2)
  .map(p => p.name)
  .getValue();
  // .tap(p => console.log('Taped', p))
  // .map(p => p * 10);


console.log(maybeResult.getValue());

// Either

const eitherResult = L.either(p3)
  .flatMap((d) => {
    return d.age
    ? L.right(d)
    : L.left(new Error('No age defined'));
  })
  .tap((d) => console.log('Taped', d))
  .flatMap((d) => {
    return d.name
    ? L.right(d.name)
    : L.left(new Error('No name defined'));
  })
  .map((d) => d);

console.log(eitherResult.getValue());

// IO

let val = 0;
const ioResult = L.io(() => val+=10)
  .map((d) => d*=2)
  .map((d) => d*=2)
  .tap(() => console.log('Taped', val)) // => 0
  .map((d) => d*=2)
  .map((d) => d*=2);

console.log(ioResult.getValue());
