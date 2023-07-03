/**
 * @template {object} O
 * @template {keyof O | string} N
 * @template {{ from(x: unknown): any }[]} T
 * @param {O} object
 * @param {N} name
 * @param {T} [attrType]
 * @returns {O}
 */
export default function defineAttribute(object, name, attrType = undefined) {
  const { get, set } = Object.getOwnPropertyDescriptor(object, name);
  Object.defineProperty(object, name, {
    get() {
      let x = get.call(this);
      if (attrType) {
        x = attrType.from(x);
      }
      return x;
    },
    ...(set && {
      set(x) {
        if (attrType) {
          x = attrType.from(x);
        }
        set.call(this, x);
      },
    }),
    enumerable: true,
    configurable: true,
  });
  return object;
}
