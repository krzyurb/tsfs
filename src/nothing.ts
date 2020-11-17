import { Maybe } from "./maybe";

export class Nothing<T> {
  public getValue(): undefined{
    return undefined;
  }

  public map<X>(func: (value: T) => X | null | undefined): Maybe<X> | Nothing<X> {
    return new Nothing<X>();
  }
}
