interface Container<T> {
  getValue: () => T | Error;
}

export interface EitherType<T> extends Container<T> {
  flatMap<R>(func: (value: T) => Either<R> | Left): EitherType<R>;
  map<R>(func: (value: T) => R): EitherType<R>;
  tap(func: (value: T | Error) => void): this;
}

class Either<T> implements EitherType<T> {
  protected readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public static of<T>(value: T): Either<T> {
    return new Either(value);
  }

  public getValue(): T | Error {
    return this.value;
  }

  public flatMap<R>(func: (value: T) => Right<R> | Left): EitherType<R> {
    return func(this.value);
  }

  public map<R>(func: (value: T) => R): EitherType<R> {
    try {
      return new Right(func(this.value));
    } catch (error) {
      return new Left(error);
    }
  }

  public static right<V>(value: V): Right<V> {
    return new Right(value);
  }

  public static left<E extends Error>(error: E): Left {
    return new Left(error);
  }

  public tap(func: (value: T | Error) => void): this {
    func(this.value);
    return this;
  }
}

class Right<T> extends Either<T> implements EitherType<T> {}

class Left extends Either<Error> implements EitherType<Error> {
  public flatMap<R = Error>(): EitherType<R> {
    return this;
  }

  public map<R>(): EitherType<R> {
    return this;
  }
}

export const either = <T>(value: T): Either<T> => new Either(value);
export const left = (error: Error): Left => new Left(error);
export const right = <T>(value: T): Right<T> => new Right(value);
