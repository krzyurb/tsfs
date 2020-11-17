import { Nothing } from './nothing';

const isNullish = <T>(value: T | null | undefined): value is null | undefined => value === null || value === undefined;


export class Maybe<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public static of<T>(value: T | null | undefined): Maybe<T> | Nothing<T> {
    return value ? new Maybe(value) : new Nothing<T>();
  }

  public getValue(): T {
    return this.value;
  }

  public map<X>(func: (value: T) => X | null | undefined): Maybe<X> | Nothing<X> {
    if (isNullish(this.value)) {
      return new Nothing<X>();
    }

    const result = func(this.value);
    if (isNullish(result)) {
      return new Nothing<X>()
    }

    return Maybe.of(result);
  }
}
