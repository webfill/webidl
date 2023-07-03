/**
 * @param {string | string[]} nameOrNames
 * @returns {(t: "value", n: string, v: any) => void}
 */
export default function Global(nameOrNames) {
  const names = Array.isArray(nameOrNames) ? nameOrNames : [nameOrNames];
  return (t, n, v) => {
    for (const name of names) {
      if (isInstanceOf(globalThis, name)) {
        Object.defineProperty(globalThis, n, {
          value: v,
          writable: true,
          configurable: true,
          enumerable: true,
        });
        return;
      }
    }
  };
}
