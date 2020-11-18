const isNullish = <T>(value: T | null | undefined): value is null | undefined => value === null || value === undefined;


interface Container {
  map: (...args: any) => any;
  tap: (...args: any) => any;
}

interface MaybeType extends Container {}

class Maybe<T> implements Container {
  private readonly value: T | null | undefined;

  constructor(value: T | null | undefined) {
    this.value = value;
  }

  public static of<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe<T>(value);
  }

  public getValue(): T | null | undefined {
    return this.value;
  }

  public map<X>(func: (value: T) => X | null | undefined): Maybe<X> {
    if (isNullish(this.value)) {
      return Maybe.of<X>(this.value);
    }

    const result = func(this.value);
    if (isNullish(result)) {
      return Maybe.of<X>(result)
    }

    return Maybe.of(result);
  }

  public tap(func: (value: T) => any): this {
    if (this.value) func(this.value);
    return this;
  }
}

export const maybe = <T>(value: T): Maybe<T> => new Maybe(value);
