import test from "node:test";
import assert from "node:assert";
import Interface from "../src/interface";

@Interface("Dog")
class Dog {
  bark() {}
}

@Interface("Cat", true)
class Cat {
  constructor(a?: string) {}
  meow() {}
}

test("@Interface('Dog') is non-constructable", () =>
  assert.throws(() => new Dog()));
test("@Interface('Cat', true) is constructable", () => assert(new Cat()));
test("@Interface('Dog') sets .name", () => assert.strictEqual(Dog.name, "Dog"));
test("@Interface('Dog') sets .length", () => assert.strictEqual(Dog.length, 0));
test("@Interface('Cat', true) sets .name", () =>
  assert.strictEqual(Cat.name, "Cat"));
test("@Interface('Cat', true) doesn't set .length", () =>
  assert.strictEqual(Cat.length, 1));
test("@Interface('Dog') adds ._includes()", () => assert("_includes" in Dog));
test("@Interface('Cat', true) adds ._includes()", () =>
  assert("_includes" in Cat));
