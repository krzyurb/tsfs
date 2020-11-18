interface Container<T> {
  getValue: () => T | Error;
}

interface EitherType<T> extends Container<T> {
  flatMap<R>(func: (value: T) => Either<R> | Left): EitherType<R>;
  try<R>(func: (value: T) => R): EitherType<R>;
}

export class Either<T> implements EitherType<T> {
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


  public try<R>(func: (value: T) => R): EitherType<R> {
    try {
      return new Right(func(this.value));
    } catch (error) {
      return new Left(error);
    }
  }

  public static right<V>(value: V): Either<V> {
    return new Right(value);
  }

  public static left<E extends Error>(error: E): Left {
    return new Left(error);
  }
}

export class Right<T> extends Either<T> implements EitherType<T> {}

export class Left extends Either<Error> implements EitherType<Error> {
  public flatMap<R = Error>(): EitherType<R> {
    return this;
  }

  public try<R>(): EitherType<R> {
    return this;
  }
}

export const either = <T>(value: T) => new Either(value);
export const left = (error: Error) => new Left(error);
export const right = <T>(value: T) => new Right(value);
