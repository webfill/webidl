type Coercer<T> = { from(x: unknown): T };

function operation<
  R extends Coercer<unknown>,
  A extends Coercer<unknown>[],
  F extends (...a: any[]) => any
>(returnType: R, argumentTypes: A, function_: F): F {
  function w(this: ThisType<F>, ...a: Parameters<F>): ReturnType<F> {
    if (a.length < function_.length) {
      throw new TypeError(
        `Failed to execute '${function_.name}' on '${this}': ${
          function_.length
        } argument${function_.length === 1 ? "" : "s"} required, but only ${
          a.length
        } present.`
      );
    }

    const c = a.map((x, i) =>
      i < argumentTypes.length ? argumentTypes[i].from(x) : x
    );
    const r = function_.call(this, ...c);
    return returnType.from(r) as ReturnType<F>;
  }
  const s = Object.getOwnPropertyDescriptors(function_);
  delete s.arguments;
  delete s.caller;
  delete s.callee;
  delete s.prototype;
  Object.defineProperties(w, s);
  return w as F;
}

export default operation;
