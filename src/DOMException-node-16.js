/** @type {typeof globalThis.DOMException} */
let DOMException;
try {
  atob(1);
} catch (error) {
  DOMException = error.constructor;
}

export default DOMException;
