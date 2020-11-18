const isNullish = <T>(value: T | null | undefined): value is null | undefined => value === null || value === undefined;

interface Container {
  map: (...args: any) => any;
  tap: (...args: any) => any;
}

class Maybe<T> implements Container {
  private readonly value: T | null | undefined;

  constructor(value: T | null | undefined) {
    this.value = value;
  }

  public static of<T>(value: T | null | undefined): Maybe<T> {
    return new Maybe<T>(value);
  }

  public getValue(): T | undefined {
    return isNullish(this.value) ? undefined : this.value;
  }

  public getValueOr<X>(or: X): T | X {
    return isNullish(this.value) ? or : this.value;
  }

  public getValueOrThrow(error: Error): T {
    if (!isNullish(this.value)) {
      return this.value;
    }

    throw error;
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

  public tap(func: (value: T) => void): this {
    if (this.value) func(this.value);
    return this;
  }
}

export const maybe = <T>(value: T): Maybe<T> => new Maybe(value);
