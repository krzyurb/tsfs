// import { Nothing } from './nothing';

// export type MaybeValue<T> = T | null;

// const isDefined = <T>(value: MaybeValue<T>): value is T => value != null && value !== undefined;

// export class Maybe<T> {
//   private readonly value: MaybeValue<T>;

//   constructor(value: MaybeValue<T>) {
//     this.value = value;
//   }

//   public static of<T>(value: T): Maybe<T> {
//     return new Maybe(value);
//   }

//   public getValue(): MaybeValue<T> {
//     return this.value ? this.value : null;
//   }

//   public map<X>(func: (value: T) => X) {
//     return isDefined(this.value) ? Maybe.of(func(this.value)) : new Nothing();
//   }
// }
