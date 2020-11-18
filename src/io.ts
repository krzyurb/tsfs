class IO<T> {
  private readonly func: () => T;

  constructor(func: () => T) {
    this.func = func;
  }

  public static of<T>(value: T) {
    return new IO(() => value);
  }

  public map<X>(func: (value: T) => X): IO<X> {
    return new IO(() => func(this.func()));
  }

  public getValue(): T {
    return this.func();
  }

  public tap(func: () => any) {
    func();
    return this;
  }
}

export const io = <T>(func: () => T): IO<T> => new IO(func);
