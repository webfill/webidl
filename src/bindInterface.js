/**
 * @template {{ new (...a: any[]): any }} T
 * @param {T} Class
 * @param {string} name
 * @param {boolean} [constructable]
 * @returns {T}
 */
export default function bindInterface(Class, name, constructable = undefined) {
  Object.defineProperty(Class, "name", { value: name, configurable: true });
  Object.defineProperty(Class.prototype, Symbol.toStringTag, {
    value: name,
    configurable: true,
  });

  if (constructable == null) {
    constructable = /\Wconstructor\(/.test(
      Function.prototype.toString.call(Class)
    );
  }

  if (!constructable) {
    Object.defineProperty(Class, "length", { value: 0, configurable: true });
    Class = new Proxy(Class, {
      construct() {
        throw new TypeError(`Illegal constructor`);
      },
    });
  }

  return Class;
}
