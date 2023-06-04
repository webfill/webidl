import type { ClassDecorator } from "./decorators.js";

export default function Interface(
  name: string,
  constructable: boolean = false
): ClassDecorator {
  return (value, { addInitializer }) => {
    Object.defineProperty(value, "name", { value: name, configurable: true });
    Object.defineProperty(value.prototype, Symbol.toStringTag, {
      value: name,
      configurable: true,
    });

    const knownNativeKeys = Reflect.ownKeys(Object).concat(
      Reflect.ownKeys(Object.prototype)
    );

    for (const key of Reflect.ownKeys(value).filter(
      (x) => !knownNativeKeys.includes(x)
    )) {
      Object.defineProperty(value, key, { enumerable: true });
    }
    for (const key of Reflect.ownKeys(value.prototype).filter(
      (x) => !knownNativeKeys.includes(x)
    )) {
      Object.defineProperty(value.prototype, key, { enumerable: true });
    }

    if (!constructable) {
      Object.defineProperty(value, "length", { value: 0, configurable: true });
      return new Proxy(value, {
        construct() {
          throw new TypeError("Illegal constructor");
        },
      });
    }
  };
}
