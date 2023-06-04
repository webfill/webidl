import test from "node:test";
import assert from "node:assert";
import interface_ from "../src/interface_.js";

test("Dog interface", async (t) => {
  let Dog = class {};
  Dog = interface_("Dog", Dog);

  await test("sets .name", () => {
    assert.equal(Dog.name, "Dog");
  });
  await test("sets .prototype[Symbol.toStringTag]", () => {
    assert.equal(Dog.prototype[Symbol.toStringTag], "Dog");
  });
  await test("sets .length", () => {
    assert.equal(Dog.length, 0);
  });
  await test("constructor throws TypeError", () => {
    assert.throws(() => new Dog(), TypeError);
  });
});
