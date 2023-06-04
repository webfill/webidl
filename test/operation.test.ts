import test from "node:test";
import assert from "node:assert";
import interface_ from "../src/interface_.js";
import operation from "../src/operation.js";
import DOMString from "../src/types/DOMString.js";
import long from "../src/types/long.js";
import undefined_ from "../src/types/undefined_.js";

test("Dog interface with operations", async (t) => {
  let Dog = class {
    bark() {
      console.log("woof");
    }
    eat(food: string) {
      console.log("eating!", food);
    }
  };
  Dog = interface_("Dog", Dog);
  Dog.prototype.bark = operation(undefined_, [], Dog.prototype.bark);
  Dog.prototype.eat = operation(undefined_, [DOMString], Dog.prototype.eat);

  await test("keeps .name of bark()", () => {
    assert.equal(Dog.prototype.bark.name, "bark");
  });
  await test("keeps .length of bark()", () => {
    assert.equal(Dog.prototype.bark.length, 0);
  });
  await test("keeps .name of eat()", () => {
    assert.equal(Dog.prototype.eat.name, "eat");
  });
  await test("keeps .length of eat()", () => {
    assert.equal(Dog.prototype.eat.length, 1);
  });
  await test("eat() throws TypeError when no arguments are passed", () => {
    // @ts-ignore
    assert.throws(() => Dog.prototype.eat(), TypeError);
  });
  await test("eat() doesn't throw when more than one argument is passed", () => {
    // @ts-ignore
    assert.doesNotThrow(() => Dog.prototype.eat("foo", "bar"));
  });
});

test("add() unbound operation", async (t) => {
  let add = function (a: number, b: number) {
    return a + b;
  };
  add = operation(long, [long, long], add);

  await test("keeps .name", () => {
    assert.equal(add.name, "add");
  });
  await test("keeps .length", () => {
    assert.equal(add.length, 2);
  });
  await test("throws TypeError when no arguments are passed", () => {
    // @ts-ignore
    assert.throws(() => add(), TypeError);
  });
  await test("doesn't throw when more than two arguments are passed", () => {
    // @ts-ignore
    assert.doesNotThrow(() => add(1, 2, 3));
  });
  await test("coerces string => long", () => {
    // @ts-ignore
    assert.equal(add("1", "2"), 3);
  });
  await test("coerces double => long", () => {
    // @ts-ignore
    assert.equal(add(1.2, 2.2), 3);
  });
});
