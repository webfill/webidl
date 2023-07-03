# WebIDL helpers for JavaScript

📚 [WebIDL] infrastructure for making JavaScript ↔️ JavaScript bindings

<div align="center">

![]()

</div>

## Installation

```sh
npm install @webfill/webidl
```

## Usage

```js
import { bindInterface, defineOperation, types } from "@webfill/webidl";

class Dog {
  bark() {
    console.log("woof");
  }
  eat(food) {
    console.log(`eating ${food}`);
  }
}
Dog = bindInterface(Dog, "Dog");
defineOperation(Dog.prototype, "bark", [], types.undefined)
defineOperation(Dog.prototype, "eat", [types.DOMString], types.undefined);

const dog = new Dog();
//=> Uncaught TypeError: Illegal constructor

const dog = Object.create(Dog.prototype);
dog.bark();
//=> 'woof'

dog.eat();
//=> Uncaught TypeError: Failed to execute 'eat' on 'Dog': 1 argument required, but only 0 present.

dog.eat("🥩");
//=> 'eating 🥩'
```

[WebIDL]: https://webidl.spec.whatwg.org/
