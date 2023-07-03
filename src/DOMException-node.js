/** @type {typeof globalThis.DOMException} */
let DOMException;
if (process.version.startsWith("v16")) {
  ({ default: DOMException } = await import("./DOMException-node-16.js"));
} else {
  DOMException = globalThis.DOMException;
}

export default DOMException;
