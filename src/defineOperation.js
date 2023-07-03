/**
 * @template {object} O
 * @template {keyof O | string} N
 * @template {{ from(x: unknown): any }[]} A
 * @template {{ from(x: any): any }} R
 * @param {O} object
 * @param {N} name
 * @param {A} [argTypes]
 * @param {R} [returnType]
 * @returns {O}
 */
export default function defineOperation(
  object,
  name,
  argTypes = undefined,
  returnType = undefined
) {
  const original = object[name];
  const { value } = {
    value() {
      if (argTypes) {
        for (const [i, argType] of argTypes.entries()) {
          arguments[i] = argType.from(arguments[i]);
        }
      }
      let result = original.apply(this, arguments);
      if (returnType) {
        result = returnType.from(result);
      }
      return result;
    },
  };
  Object.defineProperties(value, Object.getOwnPropertyDescriptors(original));
  Object.defineProperty(object, name, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
  return object;
}
