type DOMString = string;
const DOMString = {
  from(x: unknown): DOMString {
    return `${x}`;
  },
};

export default DOMString;
