import test from "node:test";
import assert from "node:assert";
import Partial from "../src/partial";
import Interface from "../src/interface";

@Interface("Dog")
class Dog {
  bark() {}
}

@Partial<Dog>("Dog")
@Interface("Dog")
class _Dog {
  speak() {
    this.bark();
  }
}

test("Partial('Dog') doesn't mutate Dog", () =>
  assert(!("speak" in Dog.prototype)));
test("Partial('Dog') is not constructable by itself", () =>
  assert.throws(() => new _Dog()));
test("Partial('Dog') adds ._apply()", () => assert("_apply" in _Dog));
test("_Dog._apply(Dog) does mutate", () => {
  _Dog._apply(Dog);
  assert("speak" in Dog.prototype);
});
