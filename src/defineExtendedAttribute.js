/**
 * @template {object} O
 * @param {O} object
 * @param {keyof O | string} name
 * @param {(t: "descriptor", d: PropertyDescriptor) => PropertyDescriptor | null | undefined} ExtendedAttribute
 * @returns {O}
 */
export default function defineExtendedAttribute(
  object,
  name,
  ExtendedAttribute
) {
  let d = Object.getOwnPropertyDescriptor(object, name);
  d = ExtendedAttribute("descriptor", d) ?? d;
  Object.defineProperty(object, name, d);
  return object;
}
