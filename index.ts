import { Either, either, right, left } from "./src/either";
import { maybe } from "./src/maybe";

interface Person {
  age?: number | null;
  name?: string;
}

const p1: Person = { name: 'a', age: 10 };
const p2: Person = { name: 'a' };
const p3: Person = { age: 32 };

const maybeResult = maybe(p1)
  .map(p => p.age)
  .tap(p => console.log('Taped', p))
  .map(p => p * 10);

console.log(maybeResult.getValue());

const eitherResult = either(p3)
  .flatMap((d) => {
    return d.age
    ? right(d)
    : left(new Error('No age defined'));
  })
  .flatMap((d) => {
    return d.name
    ? Either.right(d.name)
    : Either.left(new Error('No name defined'));
  })
  .try((d) => {
    return d;
  })

console.log(eitherResult.getValue());
