type long = number;
const long = {
  from(x: unknown): long {
    // @ts-ignore
    return Math.trunc(x);
  },
};
export default long;
