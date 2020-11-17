import { Maybe } from "./src/maybe";

interface Person {
  age?: number;
  name?: string;
}

const p1: Person = { name: 'a' };

const result = Maybe.of(p1)
  .map((a) => a.age)
  .map((a) => a + 10);

console.log(result);

