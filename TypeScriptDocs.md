# TypeScript Documentation & Best Practices

## Table of Contents
1. [Basic Types](#basic-types)
2. [Object Types & Interfaces](#object-types--interfaces)
3. [Function Typing](#function-typing)
4. [Union Types & Narrowing](#union-types--narrowing)
5. [Generic Functions](#generic-functions)
6. [Component Patterns](#component-patterns)
7. [Object Types Deep Dive](#object-types-deep-dive)
8. [Generics Deep Dive](#generics-deep-dive)
9. [Type Operators](#type-operators)
10. [Common Mistakes & Fixes](#common-mistakes--fixes)

## Basic Types

### Primitive Types
```typescript
// Basic primitives
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Any type (avoid when possible)
let anything: any = "can be anything";

// Unknown type (safer than any)
let unknownValue: unknown = "needs type checking";
```

### Type Annotations
```typescript
// Variable type annotations
let message: string = "Hello World";

// Function parameter types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Return type annotations
function getAge(): number {
  return 25;
}
```

## Object Types & Interfaces

### Interface Definition
```typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
  readonly id: number; // Read-only property
}

// Using the interface
const user: User = {
  name: "Alice",
  age: 30,
  id: 123
};
```

### Type Aliases vs Interfaces
```typescript
// Interface (extensible)
interface Point {
  x: number;
  y: number;
}

interface Point {
  z?: number; // Can extend existing interface
}

// Type alias (not extensible)
type Point2D = {
  x: number;
  y: number;
};

// Union types (use type aliases)
type Status = "loading" | "success" | "error";
```

### Optional Properties
```typescript
interface Config {
  host: string;
  port?: number; // Optional
  timeout?: number;
}

// All valid
const config1: Config = { host: "localhost" };
const config2: Config = { host: "localhost", port: 3000 };
const config3: Config = { host: "localhost", port: 3000, timeout: 5000 };
```

## Function Typing

### Function Type Expressions
```typescript
// Function type
type GreetFunction = (name: string) => string;

// Using function type
function greeter(fn: GreetFunction) {
  return fn("World");
}

// Arrow function with type
const greet: (name: string) => string = (name) => `Hello, ${name}!`;
```

### Parameter Destructuring
```typescript
// Destructuring with types
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  return a + b + c;
}

// Using interface for destructuring
interface SumParams {
  a: number;
  b: number;
  c: number;
}

function sum2({ a, b, c }: SumParams) {
  return a + b + c;
}
```

### Optional Parameters
```typescript
function createUser(name: string, age?: number, email?: string) {
  return { name, age, email };
}

// All valid calls
createUser("Alice");
createUser("Alice", 30);
createUser("Alice", 30, "alice@example.com");
```

### Rest Parameters
```typescript
function multiply(n: number, ...m: number[]) {
  return m.map(x => n * x);
}

const result = multiply(10, 1, 2, 3, 4); // [10, 20, 30, 40]
```

## Union Types & Narrowing

### Union Types
```typescript
type ID = string | number;

function processId(id: ID) {
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return id.toFixed(2);
  }
}
```

### Type Guards
```typescript
// typeof type guard
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// instanceof type guard
function processDate(value: Date | string) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return new Date(value).toISOString();
}

// in operator narrowing
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}
```

### Discriminated Unions
```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}
```

## Generic Functions

### Basic Generics
```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// TypeScript infers the type
const first = firstElement([1, 2, 3]); // number
const firstStr = firstElement(["a", "b", "c"]); // string
```

### Generic Constraints
```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}

// Works with arrays and strings
longest([1, 2], [1, 2, 3]); // number[]
longest("hello", "world"); // string
```

### Multiple Type Parameters
```typescript
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n)); // number[]
```

## Component Patterns

### React Component Props Interface
```typescript
import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any; // Index signature for additional props
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  onClick, 
  disabled = false,
  type = 'button',
  ...rest 
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
```

### Component Map Pattern
```typescript
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

const COMPONENT_MAP = {
  Button: ({ className, children, ...rest }: ComponentProps) => (
    <button className={className} {...rest}>
      {children}
    </button>
  ),
  
  Card: ({ className, children, ...rest }: ComponentProps) => (
    <div className={className} {...rest}>
      {children}
    </div>
  ),
  
  Text: ({ className, children, ...rest }: ComponentProps) => (
    <p className={className} {...rest}>
      {children}
    </p>
  )
} as const;

type ComponentType = keyof typeof COMPONENT_MAP;
```

### Dynamic Component Renderer
```typescript
interface ComponentDefinition {
  type: ComponentType;
  props: Record<string, any>;
}

function DynamicComponentRenderer({ definition }: { definition: ComponentDefinition }) {
  const Component = COMPONENT_MAP[definition.type];
  
  if (!Component) {
    return <div>Unknown component type: {definition.type}</div>;
  }
  
  return <Component {...definition.props} />;
}
```

## Object Types Deep Dive

### Property Modifiers

#### Optional Properties
```typescript
interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // ...
}

// With destructuring and defaults
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
}
```

#### Readonly Properties
```typescript
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  console.log(`prop has the value '${obj.prop}'.`);
  // obj.prop = "hello"; // Error: Cannot assign to 'prop' because it is a read-only property
}
```

### Index Signatures
```typescript
// String index signature
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["hello", "world"];
const secondItem = myArray[1]; // string

// Dictionary pattern
interface NumberDictionary {
  [index: string]: number;
  length: number; // OK
  // name: string; // Error: Property 'name' of type 'string' is not assignable to 'string' index type 'number'
}

// Union index signature
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // OK
  name: string; // OK
}

// Readonly index signature
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["hello", "world"];
// myArray[2] = "Mallory"; // Error: Index signature in type 'ReadonlyStringArray' only permits reading
```

### Excess Property Checks
```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

// Error: Object literal may only specify known properties
// let mySquare = createSquare({ colour: "red", width: 100 });

// Solutions:
// 1. Type assertion
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// 2. Index signature
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}

// 3. Assign to variable first
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);
```

### Extending Types
```typescript
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// Multiple inheritance
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};
```

### Intersection Types
```typescript
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

draw({ color: "blue", radius: 42 });
```

### Generic Object Types
```typescript
// Generic Box type
interface Box<Type> {
  contents: Type;
}

let box: Box<string> = { contents: "hello" };
box.contents; // string

// Generic function with Box
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

// Type alias version
type Box<Type> = {
  contents: Type;
};

// Generic helper types
type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
```

### Array Types
```typescript
// Array type is generic
interface Array<Type> {
  length: number;
  pop(): Type | undefined;
  push(...items: Type[]): number;
  // ...
}

// Shorthand syntax
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];
doSomething(myArray);
doSomething(new Array("hello", "world"));
```

### ReadonlyArray Type
```typescript
function doStuff(values: ReadonlyArray<string>) {
  // We can read from 'values'...
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);
  
  // ...but we can't mutate 'values'.
  // values.push("hello!"); // Error: Property 'push' does not exist on type 'readonly string[]'
}

// Shorthand syntax
function doStuff2(values: readonly string[]) {
  // Same behavior as ReadonlyArray
}

// Assignability
let x: readonly string[] = [];
let y: string[] = [];

x = y; // OK
// y = x; // Error: The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'
```

### Tuple Types
```typescript
type StringNumberPair = [string, number];

function doSomething(pair: [string, number]) {
  const a = pair[0]; // string
  const b = pair[1]; // number
  // const c = pair[2]; // Error: Tuple type '[string, number]' of length '2' has no element at index '2'
}

// Destructuring
function doSomething2(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
  console.log(inputString); // string
  console.log(hash); // number
}

// Optional elements
type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
  const [x, y, z] = coord;
  console.log(`Provided coordinates had ${coord.length} dimensions`);
}

// Rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// Readonly tuples
function doSomething3(pair: readonly [string, number]) {
  // pair[0] = "hello!"; // Error: Cannot assign to '0' because it is a read-only property
}
```

## Generics Deep Dive

### Generic Identity Function
```typescript
// Without generics (specific type)
function identity(arg: number): number {
  return arg;
}

// Without generics (any type)
function identity2(arg: any): any {
  return arg;
}

// With generics
function identity<Type>(arg: Type): Type {
  return arg;
}

// Usage
let output = identity<string>("myString"); // Explicit type argument
let output2 = identity("myString"); // Type inference
```

### Working with Generic Type Variables
```typescript
// Error: Property 'length' does not exist on type 'Type'
function loggingIdentity<Type>(arg: Type): Type {
  // console.log(arg.length); // Error
  return arg;
}

// Solution: Work with arrays
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

// Alternative syntax
function loggingIdentity2<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);
  return arg;
}
```

### Generic Types
```typescript
// Generic function type
function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity;

// Different type parameter name
let myIdentity2: <Input>(arg: Input) => Input = identity;

// Object literal type
let myIdentity3: { <Type>(arg: Type): Type } = identity;

// Generic interface
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

let myIdentity4: GenericIdentityFn = identity;

// Generic interface with type parameter
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

let myIdentity5: GenericIdentityFn<number> = identity;
```

### Generic Classes
```typescript
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};
```

### Generic Constraints
```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property
  return arg;
}

// Works
loggingIdentity({ length: 10, value: 3 });

// Error: Argument of type 'number' is not assignable to parameter of type 'Lengthwise'
// loggingIdentity(3);
```

### Using Type Parameters in Generic Constraints
```typescript
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // OK
// getProperty(x, "m"); // Error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'
```

### Using Class Types in Generics
```typescript
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

// More advanced example
class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

### Generic Parameter Defaults
```typescript
declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;

const div = create(); // Container<HTMLDivElement, HTMLDivElement[]>
const p = create(new HTMLParagraphElement()); // Container<HTMLParagraphElement, HTMLParagraphElement[]>
```

## Type Operators

### Keyof Type Operator
```typescript
type Point = { x: number; y: number };
type P = keyof Point; // "x" | "y"

// With index signatures
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // string | number

// Useful with mapped types
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type FeatureFlags = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<FeatureFlags>;
// {
//   darkMode: boolean;
//   newUserProfile: boolean;
// }
```

## Common Mistakes & Fixes

### Mistake 1: Not Typing Destructured Props
```typescript
// WRONG
const Button = ({ className, children }) => (
  <button className={className}>{children}</button>
);

// CORRECT
const Button = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <button className={className}>{children}</button>
);
```

### Mistake 2: Using `any` Instead of Proper Types
```typescript
// WRONG
function processData(data: any) {
  return data.someProperty;
}

// CORRECT
interface DataType {
  someProperty: string;
}

function processData(data: DataType) {
  return data.someProperty;
}
```

### Mistake 3: Not Using Union Types for Literals
```typescript
// WRONG
type ComponentType = string;

// CORRECT
type ComponentType = "Button" | "Card" | "Text" | "Input";
```

### Mistake 4: Forgetting Optional Properties
```typescript
// WRONG
interface User {
  name: string;
  age: number;
  email: string; // Required when it might not exist
}

// CORRECT
interface User {
  name: string;
  age: number;
  email?: string; // Optional
}
```

### Mistake 5: Not Using Type Guards
```typescript
// WRONG
function processValue(value: string | number) {
  return value.toUpperCase(); // Error: number doesn't have toUpperCase
}

// CORRECT
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}
```

### Mistake 6: Not Using Generic Constraints
```typescript
// WRONG
function getLength<T>(arg: T): number {
  return arg.length; // Error: Property 'length' does not exist on type 'T'
}

// CORRECT
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}
```

### Mistake 7: Not Using Index Signatures Properly
```typescript
// WRONG
interface Config {
  host: string;
  port: number;
  // Missing index signature for additional properties
}

// CORRECT
interface Config {
  host: string;
  port: number;
  [key: string]: unknown; // Allow additional properties
}
```

## Best Practices

1. **Always define interfaces** for component props
2. **Use destructuring with explicit typing** for function parameters
3. **Prefer union types over `any`** for better type safety
4. **Use type guards** to narrow union types
5. **Define explicit return types** for complex functions
6. **Use generic constraints** when you need to limit type parameters
7. **Avoid `any` type** - use `unknown` when you need flexibility
8. **Use `readonly`** for immutable properties
9. **Use optional properties (`?`)** instead of making everything required
10. **Use index signatures** (`[key: string]: any`) sparingly
11. **Use `keyof` operator** for type-safe property access
12. **Use generic parameter defaults** to reduce boilerplate
13. **Use intersection types** to combine multiple interfaces
14. **Use tuple types** for fixed-length arrays with specific types
15. **Use `ReadonlyArray`** for immutable arrays

## TypeScript Configuration

### Recommended tsconfig.json Settings
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

*This documentation should be updated as new TypeScript patterns and best practices are discovered.* 