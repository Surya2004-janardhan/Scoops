// next concepts in ts 
// we will cover generics, decorators, and advanced types in the next section of this file

// generics in TypeScript allow us to create reusable components that can work with different types.
//  They provide a way to create functions, classes, and interfaces that can operate on a variety of types while still maintaining type safety.
// example of a generic function
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("Hello, World!");
let output2 = identity<number>(42);

// in this example, we have defined a generic function identity that takes a type parameter T. The function takes an argument of type T and returns a value of the same type T. We then call the function with different types (string and number) to demonstrate its flexibility.

// decorators in TypeScript are a way to add metadata to classes, methods, properties, or parameters. They are a powerful tool for modifying the behavior of code at runtime.
// example of a class decorator

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return `Hello, ${this.greeting}!`;
    }
}

// in this example, we have defined a class decorator sealed that takes a constructor function as an argument. 
// The decorator uses Object.seal to prevent new properties from being added to the class and its prototype.
//  We then apply the @sealed decorator to the Greeter class, which means that we cannot add new properties to the Greeter class or its prototype at runtime.

// advanced types in TypeScript include features like union types, intersection types, mapped types, conditional types, and more. These features allow us to create complex type definitions that can express a wide range of scenarios and constraints in our code.

// example of a union type
type Status = "success" | "error" | "pending";

function handleResponse(status: Status) {
    if (status === "success") {
        console.log("Operation was successful!");
    } else if (status === "error") {
        console.log("An error occurred.");
    } else {
        console.log("Operation is pending...");
    }
}

// in this example, we have defined a union type Status that can be one of three string literals: "success", "error", or "pending". 
// The handleResponse function takes a parameter of type Status and uses conditional statements to handle each possible value accordingly. 
// This allows us to ensure that only valid status values are passed to the function, providing type safety and improving code readability.    

// more concepts in TypeScript include type guards, type inference, and type assertions, which we will cover in the next section of this file.
// that are mainly used in core development backend development and frontend development with frameworks like Angular and React. 
// They help us to write more robust and maintainable code by providing additional type safety and flexibility in our TypeScript applications.
// lets see some examples of these concepts 

function isString(value: any): value is string {
    return typeof value === "string";
}

let value: any = "Hello, TypeScript!";

if (isString(value)) {
    console.log(`The value is a string: ${value}`);
} else {
    console.log("The value is not a string.");
}

// in this example, we have defined a type guard function isString that checks if a given value is of type string. 
// The function returns a boolean and uses the "value is string" syntax to indicate that it is a type guard. 
// We then use this type guard in an if statement to check if the value variable is a string and log the appropriate message accordingly.

const inferredValue = "This is a string"; // TypeScript infers the type as string

// in this example, we have declared a constant variable inferredValue and assigned it a string value. 
// TypeScript automatically infers the type of the variable as string based on the assigned value, so we don't need to explicitly specify the type. 
// This is an example of type inference in TypeScript, which allows us to write cleaner and more concise code while still benefiting from type safety.

let someValue: any = "This is a string";
let stringLength: number = (someValue as string).length;

// in this example, we have declared a variable someValue of type any and assigned it a string value. 
// We then use a type assertion (someValue as string) to tell TypeScript that we know someValue is a string, allowing us to access the length property without any type errors. 
// Type assertions are a way to override TypeScript's inferred type and provide more specific information about the type of a value when we are certain about it.

// classes in TypeScript are a powerful way to create objects and define their behavior.
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}

let person1 = new Person("Alice", 30);
console.log(person1.greet());

// in this example, we have defined a class Person with two properties (name and age) and a constructor to initialize those properties. 
// The class also has a method greet that returns a greeting message. 
// We then create an instance of the Person class and call the greet method to see the output.

// we can also use inheritance in TypeScript to create subclasses that extend the functionality of a base class.

class Employee extends Person {
    jobTitle: string;

    constructor(name: string, age: number, jobTitle: string) {
        super(name, age); // call the constructor of the base class
        this.jobTitle = jobTitle;
    }

    work() {
        return `${this.name} is working as a ${this.jobTitle}.`;
    }
}

let employee1 = new Employee("Bob", 25, "Software Engineer");
console.log(employee1.greet());
console.log(employee1.work());

// in this example, we have defined a subclass Employee that extends the Person class. 
// The Employee class has an additional property jobTitle and a method work that returns a message about the employee's job. 
// We then create an instance of the Employee class and call both the greet method inherited from the Person class and the work method defined in the Employee class to see

// lets see oops in ts some complex examples y how

// oops with ts is similar to oops in other programming languages,
//  but with the added benefits of static typing and advanced features like interfaces and generics.

// lets see each oops with industry examples

// encapsulation in TypeScript can be achieved using access modifiers (public, private, protected) to control the visibility of class members.

class BankAccount {
    private balance: number;

    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited: $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Deposit amount must be positive.");
        }
    }

    public withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew: $${amount}. New balance: $${this.balance}`);
        } else {
            console.log("Invalid withdrawal amount.");
        }
    }

    public getBalance(): number {
        return this.balance;
    }
}

let account = new  BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(`Current balance: $${account.getBalance()}`);

// in this example, we have defined a BankAccount class with a private property balance that can only be accessed and modified through public methods (deposit, withdraw, getBalance). 
// This encapsulation ensures that the internal state of the BankAccount is protected and can only be manipulated in controlled ways, providing better security and maintainability for our code.

// inheritance in TypeScript allows us to create a new class that is based on an existing class, inheriting its properties and methods while adding new functionality.

class SavingsAccount extends BankAccount {
    private interestRate: number;

    constructor(initialBalance: number, interestRate: number) {
        super(initialBalance); // call the constructor of the base class
        this.interestRate = interestRate;
    }

    public applyInterest(): void {
        const interest = this.getBalance() * (this.interestRate / 100);
        this.deposit(interest);
        console.log(`Applied interest: $${interest}. New balance: $${this.getBalance()}`);
    }
}

let savingsAccount = new SavingsAccount(2000, 5);
savingsAccount.applyInterest();

// in this example, we have defined a SavingsAccount class that extends the BankAccount class. 
// The SavingsAccount class has an additional property interestRate and a method applyInterest that calculates and applies interest to the account balance. 
// We then create an instance of the SavingsAccount class and call the applyInterest method to see how it works with inheritance.

// polymorphism in TypeScript allows us to use a single interface to represent different types of objects, enabling us to write more flexible and reusable code.    
interface Shape {
    area(): number;
}

class Circle implements Shape {
    radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle implements Shape {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

function calculateArea(shape: Shape): void {
    console.log(`The area is: ${shape.area()}`);
}

let circle = new Circle(5);
let rectangle = new Rectangle(4, 6);

calculateArea(circle);
calculateArea(rectangle);

// in this example, we have defined an interface Shape with a method area. 
// We then create two classes, Circle and Rectangle, that implement the Shape interface and provide their own implementations of the area method. 
// The calculateArea function takes a parameter of type Shape and calls the area method, demonstrating polymorphism as it can work with any object that implements the Shape interface. 
// We create instances of Circle and Rectangle and pass them to the calculateArea function to see how it works with different shapes.   

// abstraction in TypeScript can be achieved using abstract classes and interfaces to define the structure of a class without providing a complete implementation.

abstract class Vehicle {
    abstract startEngine(): void;

    public stopEngine(): void {
        console.log("Engine stopped.");
    }
}

class Car extends Vehicle {
    public startEngine(): void {
        console.log("Car engine started.");
    }
}

class Motorcycle extends Vehicle {
    public startEngine(): void {
        console.log("Motorcycle engine started.");
    }
}

let car = new Car();
let motorcycle = new Motorcycle();

car.startEngine();
car.stopEngine();

motorcycle.startEngine();
motorcycle.stopEngine();

// in this example, we have defined an abstract class Vehicle with an abstract method startEngine and a concrete method stopEngine. 
// The Car and Motorcycle classes extend the Vehicle class and provide their own implementations of the startEngine method. 
// We then create instances of Car and Motorcycle and call both the startEngine and stopEngine methods to see how abstraction allows us to define a common structure for different types of vehicles while still allowing for specific implementations.

// more oops in depth concepts in TypeScript include interfaces, abstract classes, and design patterns like Singleton, Factory, and Observer, 
// which we will cover in the next section of this file.

// lets see each of it 
// 1. interfaces in TypeScript allow us to define the structure of an object, specifying the properties and methods that an object must have.

interface User {
    name: string;
    age: number;
    greet(): string;
}

class Person implements User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}  

// class vs interface 
// a class is a blueprint for creating objects, while an interface is a contract that defines the structure of an object.
// a class can have implementation details, while an interface only defines the shape of an object without providing any implementation.
// a class can be instantiated to create objects, while an interface cannot be instantiated on its own. 
// a class can implement multiple interfaces, while an interface cannot implement other interfaces or classes.

// 2. abstract classes in TypeScript are classes that cannot be instantiated on their own and are meant to be extended by other classes. 
// They can contain both abstract methods (without implementation) and concrete methods (with implementation).

abstract class Animal {
    abstract makeSound(): void;

    public sleep(): void {
        console.log("The animal is sleeping.");
    }
}

class Dog extends Animal {
    public makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    public makeSound(): void {
        console.log("Meow!");
    }
}

let dog = new Dog();
let cat = new Cat();

dog.makeSound();
dog.sleep();

cat.makeSound();
cat.sleep();    

// in this example, we have defined an abstract class Animal with an abstract method makeSound and a concrete method sleep.
// The Dog and Cat classes extend the Animal class and provide their own implementations of the makeSound method.
// We then create instances of Dog and Cat and call both the makeSound and sleep methods to see how abstract classes allow us to define a 
//common structure for different types of animals while still allowing for specific implementations.

// 3. design patterns in TypeScript are reusable solutions to common software design problems. 
// Some popular design patterns include Singleton, Factory, and Observer, which we will cover in the next section of this file.

// definations 
// Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance.

class Singleton {
    private static instance: Singleton;

    private constructor() {
        // private constructor to prevent instantiation
    }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}

// in this example, we have defined a Singleton class with a private static property instance and a private constructor. 
// The getInstance method checks if an instance of the Singleton class already exists; if not, it creates one and returns it. 
// This ensures that there is only one instance of the Singleton class throughout the application, providing a global point of access to that instance.

// Factory pattern provides a way to create objects without specifying the exact class of object that will be created.

interface Product {
    name: string;
    price: number;
}

class ProductFactory {
    public static createProduct(name: string, price: number): Product {
        return { name, price };
    }
}

let product1 = ProductFactory.createProduct("Laptop", 999);
let product2 = ProductFactory.createProduct("Smartphone", 499);

console.log(product1);
console.log(product2);

// in this example, we have defined a Product interface and a ProductFactory class with a static method createProduct that takes a name and price as parameters and returns an object that implements the Product interface. 
// This allows us to create products without needing to know the specific class or implementation details, providing a flexible way to create objects.

// Observer pattern defines a one-to-many dependency between objects, where one object (the subject) maintains a list of its dependents (observers) and notifies them of any state changes.

interface Observer {
    update(message: string): void;
}  



