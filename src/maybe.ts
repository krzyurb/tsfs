const isNullish = <T>(value: T | null | undefined): value is (null | undefined) => value === null || value === undefined;

// interface Container<T> {
//   getValue: () => T | null;
// }

export interface MaybeType<T> {// extends Container<T> {
  getValue: () => T | null;
  // map<R>(func: (value: T) => R): MaybeType<R>;
  // tap(func: (value: T | Error) => void): this;
}

class Maybe<T> implements MaybeType<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public static of<T>(value: T): Maybe<T> {
    return new Maybe<T>(value);
  }

  public getValue(): T | null {
    return this.value ? this.value : null;
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

  public map<X>(func: (value: T) => X): MaybeType<any> {
    if (isNullish(this.value)) {
      return Nothing.of(null);
    }

    const result = func(this.value);
    if (isNullish(result)) {
      return Nothing.of(null);
    }

    return Just.of(result);
  }

  public tap(func: (value: T) => void): this {
    if (this.value) func(this.value);
    return this;
  }
}

class Nothing extends Maybe<null> implements MaybeType<null> {
  public getValue(): null {
    return null;
  }
}

class Just<T> extends Maybe<T> implements MaybeType<T> {
  public getValue(): T {
    return this.value;
  }
}

export const maybe = <T>(value: T): Maybe<T> => new Maybe(value);
