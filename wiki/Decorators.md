https://github.com/tc39/proposal-decorators

```ts
type Decorator = (
  value: Input,
  context: {
    kind: string;
    name: string | symbol;
    access: {
      get?(): unknown;
      set?(value: unknown): void;
    };
    private?: boolean;
    static?: boolean;
    addInitializer?(initializer: () => void): void;
  }
) => Output | void;
```

```ts
type ClassMethodDecorator = (
  value: Function,
  context: {
    kind: "method";
    name: string | symbol;
    access: { get(): unknown };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```

```ts
type ClassGetterDecorator = (
  value: Function,
  context: {
    kind: "getter";
    name: string | symbol;
    access: { get(): unknown };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```

```ts
type ClassSetterDecorator = (
  value: Function,
  context: {
    kind: "setter";
    name: string | symbol;
    access: { set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```

```ts
type ClassFieldDecorator = (
  value: undefined,
  context: {
    kind: "field";
    name: string | symbol;
    access: { get(): unknown; set(value: unknown): void };
    static: boolean;
    private: boolean;
  }
) => (initialValue: unknown) => unknown | void;
```

```ts
type ClassDecorator = (
  value: Function,
  context: {
    kind: "class";
    name: string | undefined;
    addInitializer(initializer: () => void): void;
  }
) => Function | void;
```

```ts
type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set(value: unknown) => void;
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    static: boolean;
    private: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  init?: (initialValue: unknown) => unknown;
} | void;
```
