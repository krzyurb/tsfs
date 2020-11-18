import * as L from '..';

interface Person {
  age?: number | null;
  name?: string;
}

const p1: Person = { name: 'a', age: 10 };
const p3: Person = { age: 32 };

// Maybe

const maybeResult = L.maybe(p1)
  .map(p => p.age)
  .tap(p => console.log('Taped', p))
  .map(p => p * 10);

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
  .try((d) => {
    return d;
  })

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
