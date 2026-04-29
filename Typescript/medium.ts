// // after objects and types we will move to functions in typescript in the next section of this file
// // functions in typescript are similar to functions in javascript but with some additional features
// // we can specify the types of the parameters and the return type of the function
// // we can also use optional parameters and default parameters in functions

// // here is an example of a function in typescript that takes two numbers as parameters and returns their sum

function add(a: number, b: number): number {
    return a + b;
}

// in this example, we have specified that the parameters a and b are of type number and the return type of the function is also number

// we can also use optional parameters in functions by adding a question mark after the parameter name

function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    } else {
        return `Hello, ${name}!`;
    }
}

// in this example, the greeting parameter is optional and if it is not provided, the function will use a default greeting of "Hello"

// we can also use default parameters in functions by assigning a default value to the parameter

function multiply(a: number, b: number = 1): number {
    return a * b;
}

// in this example, the parameter b has a default value of 1, so if it is not provided when the function is called, it will use the default value of 1

// we can also specify the return type of a function as void if the function does not return anything

function logMessage(message: string): void {
    console.log(message);
}

// in this example, the function logMessage takes a string parameter and does not return anything, so we have specified the return type as void

// we can also specify the return type of a function as never if the function never returns (e.g. it throws an error or has an infinite loop)

function throwError(message: string): never {
    throw new Error(message);
}

// in this example, the function throwError takes a string parameter and throws an error, so we have specified the return type as never

// we can also use function overloading in typescript to define multiple signatures for a function

function example(): void;
function example(name: string): void;
function example(name?: string): void {
    if (name) {
        console.log(`Hello, ${name}!`);
    } else {
        console.log("Hello!");
    }
}

// in this example, we have defined two signatures for the function example, one that takes no parameters and one that takes a string parameter. The implementation of the function checks if the name parameter is provided and logs a greeting accordingly

// non primitive datatypes except objects and types 
// we have arrays, tuples, enums, and interfaces in typescript

// arrays in typescript can be defined using the Array type or using the shorthand syntax with square brackets

let numbers: number[] = [1, 2, 3, 4, 5];
let strings: Array<string> = ["hello", "world"];

// tuples in typescript are a fixed-length array with specified types for each element

let tuple: [string, number] = ["hello", 42];

// enums in typescript are a way to define a set of named constants

enum Color {
    Red,
    Green,
    Blue
}

// interfaces in typescript are a way to define the shape of an object

interface Person {
    name: string;
    age: number;
}

// we can also use interfaces to define the shape of a function

interface GreetFunction {
    (name: string): string;
}

let greetFunction: GreetFunction = function(name: string): string {
    return `Hello, ${name}!`;
}

// in this example, we have defined an interface GreetFunction that specifies the shape of a function that takes a string parameter and returns a string. We then create a variable greetFunction of type GreetFunction and assign it a function that matches the specified shape.

// differen btw object enum interface type alias 
// objects are a collection of key-value pairs, while enums are a way to define a set of named constants. 
// Interfaces are a way to define the shape of an object or a function, while type aliases are a way to create a new name for an existing type.

// key differences where to use we ll use between those 4 
// we use objects when we want to create a collection of related data that can be accessed using keys.
// we use enums when we want to define a set of named constants that can be used in our code.
// we use interfaces when we want to define the shape of an object or a function, and we want to ensure that our code adheres to that shape.
// we use type aliases when we want to create a new name for an existing type, or when we want to create a union or intersection type.

// coding examples with different use cases for objects, enums, interfaces, and type aliases

// example of using an object to store related data
let person = {
    name: "John",
    age: 30,
    city: "New York"
};

// example of using an enum to define a set of named constants
enum Direction {
    Up,
    Down,
    Left,
    Right
}

// example of using an interface to define the shape of an object
interface Car {
    make: string;
    model: string;
    year: number;
}

let myCar: Car = {
    make: "Toyota",
    model: "Camry",
    year: 2020
};

// example of using a type alias to create a new name for an existing type
type ID = string | number;

let userID: ID = "abc123";
let productID: ID = 456;

// in this example, we have created a type alias ID that can be either a string or a number. We then use this type alias to define variables userID and productID that can be of either type.

// next concepts in ts 
// we will cover generics, decorators, and advanced types in the next section of this file

