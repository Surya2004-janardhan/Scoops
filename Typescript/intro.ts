// STRICT RULE : MAKE SURE EACH LINE BELOW ONLY CONTAIN MAX OF 14 WORDS IF MORE THATN 15 IN SINGLE LINE THEN SPLIT IT INTO MULTIPLE LINES
// this fill consists of both definations as well as coding examples of typescript from basics to medium level
// intro to ts

// lets first see all the topics names of ts from start small basic to advanced each detail 
// 1. Introduction to TypeScript
// 2. Basic Types in TypeScript
// 3. Functions in TypeScript
// 4. Classes and Interfaces in TypeScript
// 5. Generics in TypeScript
// 6. Decorators in TypeScript
// 7. Advanced Types in TypeScript
// 8. Type Guards, Inference, and Assertions in TypeScript
// 9. Modules and Namespaces in TypeScript
// 10. TypeScript with React and Angular
// 11. TypeScript Best Practices and Tips

// we will cover each topic in detail with coding examples and explanations in the next sections of this file. 
// these topics are essential for understanding and mastering TypeScript, and they are widely used in various applications and frameworks.

// what is typescript
// typescript is a superset of javascript which means it has all the features of javascript and also has additional features like static typing, interfaces, classes, etc.
// it is developed and maintained by microsoft and it is open source
// it is used to build large scale applications and it helps in catching errors at compile time rather than runtime
// it is also used to improve the developer experience by providing better tooling and autocompletion

// installing typescript
// to install typescript globally on your machine you can use the following command
// npm install -g typescript
// to check if typescript is installed correctly you can use the following command
// tsc --version

// creating a typescript file
// to create a typescript file you can use any code editor and create a file with .ts extension
// for example you can create a file named index.ts

// compiling a typescript file
// to compile a typescript file you can use the following command
// tsc index.ts
// this will generate a javascript file named index.js in the same directory
// you can also specify the output directory for the compiled javascript file using the --outDir flag
// tsc index.ts --outDir dist
// this will generate the index.js file in the dist directory

// running a typescript file
// to run a typescript file you need to first compile it to javascript and then run the generated javascript file using node
// for example if you have compiled index.ts to index.js you can run it using the following command
// node index.js

// basic types in typescript
// typescript has several basic types like number, string, boolean, null, undefined, etc.
// you can declare a variable with a specific type using the following syntax
// let variableName: type = value;
// for example
let age: number = 25;
let name: string = "John";
let isStudent: boolean = true;

// you can also declare a variable without initializing it and assign a value later
let city: string;
city = "New York";

// typescript also has a special type called any which allows you to assign any type of value to a variable
let randomValue: any = 10;
randomValue = "Hello";
randomValue = true;

// it is generally recommended to avoid using the any type as it defeats the purpose of using typescript and can lead to potential errors at runtime
// symbol type in typescript
// symbol is a unique and immutable primitive value that can be used as a key for object properties
// you can create a symbol using the Symbol function
let sym1: symbol = Symbol("sym1");
let sym2: symbol = Symbol("sym2");

// each symbol is unique even if they have the same description
console.log(sym1 === sym2); // false

// you can also use symbols as keys for object properties
let obj: { [key: symbol]: string } = {};
obj[sym1] = "Value for sym1";
obj[sym2] = "Value for sym2";

console.log(obj[sym1]); // Value for sym1
console.log(obj[sym2]); // Value for sym2

// null and undefined types in typescript
// null represents the intentional absence of any object value and undefined represents the uninitialized state of a variable
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// you can also use the union type to allow a variable to have multiple types
let nullableString: string | null = "Hello"; //here hello is assigned to nullableString which is of type string or null 
nullableString = null; // this is allowed

// void type in typescript
// void represents the absence of any type and is typically used as the return type of functions that do not return a value
function logMessage(message: string): void {
    console.log(message);
}

// this function does not return anything so its return type is void
logMessage("Hello, TypeScript!");

// never type in typescript
// never represents the type of values that never occur and is typically used as the return type of functions that always throw an error or have an infinite loop
function throwError(message: string): never {
    throw new Error(message);
}

// this function always throws an error so its return type is never
throwError("This is an error!");

// object type in typescript
// object represents a non-primitive type that is not number, string, boolean, symbol, null, or undefined
let person: { name: string; age: number } = {
    name: "Alice",
    age: 30,
};

// you can also use the type alias to define a custom type for an object
type Person = {
    name: string;
    age: number;
};

let person1: Person = {
    name: "Bob",
    age: 25,
};
// difference between type alias and object type in typescript
// type alias is a way to give a name to a type and can be used for any type including primitive types, union types, intersection types, etc.
// object type is a specific type that represents an object with certain properties and their types
// for example
type StringOrNumber = string | number; // this is a type alias for a union type of string and number

let value: StringOrNumber = "Hello"; // this is allowed
value = 42; // this is also allowed

// in contrast, an object type would require you to define the structure of the object with specific properties and their types
type User = {
    name: string;
    age: number;
};

let user: User = {
    name: "Charlie",
    age: 28,
};

// in summary, type alias is a more flexible way to define types while object type is a specific way to define the structure of an object with certain properties and their types

// const let and var in typescript and js(properties and differences)
// const, let, and var are all used to declare variables in JavaScript and TypeScript but they have different properties and behaviors
// var is function-scoped and can be redeclared and updated within its scope
// let is block-scoped and can be updated but not redeclared within its scope
// const is block-scoped and cannot be updated or redeclared within its scope

// for example
function example() {
    var x = 10;
    if (true) {
        var x = 20; // this redeclares and updates x within the same function scope
        console.log(x); // 20
    }
    console.log(x); // 20
}

example();

function exampleLet() {
    let y = 10;
    if (true) {
        let y = 20; // this creates a new variable y that is block-scoped to the if statement
        console.log(y); // 20
    }
    console.log(y); // 10
}

exampleLet();

function exampleConst() {
    const z = 10;
    if (true) {
        const z = 20; // this creates a new variable z that is block-scoped to the if statement
        console.log(z); // 20
    }
    console.log(z); // 10
}

exampleConst();

// in summary, var is function-scoped and can be redeclared and updated, let is block-scoped and can be updated but not redeclared, and const is block-scoped and cannot be updated or redeclared. It is generally recommended to use let and const over var to avoid potential issues with variable scoping and redeclaration.
// here block and function scoped truly means that the variable is only accessible within the block or function it is declared in, and cannot be accessed outside of it. This helps to prevent unintended side effects and makes the code easier to understand and maintain.

// hoisting in js and ts
// hoisting is a behavior in JavaScript and TypeScript where variable and function declarations are moved to the top of their containing scope during the compilation phase
// this means that you can use a variable or function before it is declared in the code
// for example
console.log(hoistedVar); // undefined
var hoistedVar = "This variable is hoisted";

// in this example, the declaration of hoistedVar is hoisted to the top of the scope, but its initialization is not, so it is undefined when we try to log it before the assignment

// however, with let and const, only the declarations are hoisted but not the initializations, so if you try to access them before they are initialized, you will get a ReferenceError
console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "This variable is not fully hoisted";

console.log(hoistedConst); // ReferenceError: Cannot access 'hoistedConst' before initialization
const hoistedConst = "This variable is also not fully hoisted";

// in summary, var declarations are fully hoisted, meaning both the declaration and initialization are moved to the top of the scope, while let and const declarations are only partially hoisted, meaning only the declaration is moved to the top of the scope but not the initialization. This is why it is generally recommended to use let and const over var to avoid potential issues with hoisting and variable scoping.    

// scope in js and ts
// scope refers to the accessibility of variables and functions in different parts of the code
// there are three types of scope in JavaScript and TypeScript: global scope, function scope, and block scope

// global scope is the outermost scope that is accessible throughout the entire code
var globalVar = "I am a global variable";

function exampleGlobalScope() {
    console.log(globalVar); // I am a global variable
}

exampleGlobalScope();

// function scope is the scope that is created when a function is defined and is accessible only within that function
function exampleFunctionScope() {
    var functionVar = "I am a function variable";
    console.log(functionVar); // I am a function variable
}

exampleFunctionScope();
// console.log(functionVar); // ReferenceError: functionVar is not defined

// block scope is the scope that is created when a block of code is defined using curly braces {} and is accessible only within that block
if (true) {
    let blockVar = "I am a block variable";
    console.log(blockVar); // I am a block variable
}
// console.log(blockVar); // ReferenceError: blockVar is not defined

// in summary, global scope is accessible throughout the entire code, function scope is accessible only within the function it is defined in, and block scope is accessible only within the block of code it is defined in. Understanding scope is important for managing variable accessibility and avoiding potential issues with variable naming conflicts and unintended side effects.

// after objects and types we will move to functions in typescript in the next section of this file

