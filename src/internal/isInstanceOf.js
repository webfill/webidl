export function isInstanceOf(value, classOrClassName) {
  for (let p = value; p; p = Object.getPrototypeOf(p)) {
    if (Object.prototype.toString.call(p).slice(8, -1) === classOrClassName) {
      return true;
    }
  }
  return false;
}
