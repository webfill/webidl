import { Class } from "./internal/REF-type-fest/basic.js";

export default function interface_<T extends Class<{}>>(
  name: string,
  Class: T
): T {
  Object.defineProperty(Class, "name", { value: name, configurable: true });
  Object.defineProperty(Class.prototype, Symbol.toStringTag, {
    value: name,
    configurable: true,
  });

  if (/\Wconstructor\(/.test(Function.prototype.toString.call(Class))) {
    return Class;
  } else {
    Object.defineProperty(Class, "length", { value: 0, configurable: true });
    return new Proxy<T>(Class, {
      construct() {
        throw new TypeError(`Illegal constructor`);
      },
    });
  }
}
