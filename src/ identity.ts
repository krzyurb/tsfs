class Identity<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  public static of<T>(value: T): Identity<T> {
    return new Identity<T>(value);
  }

  public getValue(): T {
    return this.value;
  }

  public map<X>(func: (value: T) => X): Identity<X> {
    return Identity.of(func(this.value));
  }

  public tap(func: (value: T) => void): this {
    func(this.value);
    return this;
  }
}

export const identity = <T>(value: T): Identity<T> => new Identity(value);
