//  lets have a look at abstraction in typescript

//  abstraction is the process of hiding the implementation details and showing only the functionality to the user

//  we can achieve abstraction in typescript using abstract classes and interfaces

//  abstract class is a class that cannot be instantiated and is meant to be subclassed

abstract class Animal {
    abstract makeSound(): void;
    // an abstract method is a method that is declared but not implemented in the abstract class 
    // it uses the abstract keyword and does not have a body
    // even the class must be having the keyword abstract

    move(): void {
        console.log("Moving...");
    }
    //  regular methods can be fully implemented in the abstract class and can be called by the subclass
    // here move is a regular method that is implemented in the abstract class and can be called by the subclass
    // this is a regular method that can be implemented in the abstract class
    // it can be called by the subclass
}

//  now we will create a subclass of the abstract class
class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
    //  here we are implementing the abstract method makeSound in the subclass Dog
    // we must implement all the abstract methods in the subclass otherwise we will get an error
}

const dog = new Dog();
dog.makeSound(); // Output: Woof!
dog.move(); // Output: Moving...

//  we cannot create an instance of the abstract class directly
// const animal = new Animal(); // Error: Cannot create an instance of an abstract class.

//  we can only create an instance of the subclass that extends the abstract class 

// lets see a complex example of abstraction using interfaces

interface Shape {
    area(): number;
    perimeter(): number;
    //  an interface is a contract that defines the structure of an object
    // it can have properties and methods but cannot have any implementation
    // it uses the interface keyword and does not have a body
    //  all the methods in an interface are abstract by default and must be implemented by the class that implements the interface
    //  interfaces are used to define the structure of an object and can be implemented by multiple classes
    //  they dn contain normal methods with implementation since default methods are not allowed in interfaces all defaults are abstract by default
}

class Circle implements Shape {
    constructor(public radius: number) {}

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const circle = new Circle(5);
console.log("Circle Area:", circle.area()); // Output: Circle Area: 78.53981633974483
console.log("Circle Perimeter:", circle.perimeter()); // Output: Circle Perimeter: 31.41592653589793

const rectangle = new Rectangle(4, 6);
console.log("Rectangle Area:", rectangle.area()); // Output: Rectangle Area: 24
console.log("Rectangle Perimeter:", rectangle.perimeter()); // Output: Rectangle Perimeter: 20

//  in this example we have defined an interface Shape that has two methods area and perimeter
//  we have implemented this interface in two classes Circle and Rectangle that provide their own implementation of the area and perimeter methods
//  this is an example of abstraction where we are hiding the implementation details of how the area and perimeter are calculated and only showing the functionality to the user through the interface

// lets see nodejs backend industry standard example of abstraction using interfaces

interface Database {
    connect(): void;
    disconnect(): void;
    query(sql: string): any;
}

class MySQLDatabase implements Database {
    connect(): void {
        console.log("Connecting to MySQL database...");
    }

    disconnect(): void {
        console.log("Disconnecting from MySQL database...");
    }

    query(sql: string): any {
        console.log(`Executing SQL query: ${sql}`);
        // Simulate a database response
        return { data: "MySQL query result" };
    }
}

class MongoDBDatabase implements Database {
    connect(): void {
        console.log("Connecting to MongoDB database...");
    }

    disconnect(): void {
        console.log("Disconnecting from MongoDB database...");
    }

    query(sql: string): any {
        console.log(`Executing MongoDB query: ${sql}`);
        // Simulate a database response
        return { data: "MongoDB query result" };
    }
}

function performDatabaseOperations(db: Database) {
    db.connect();
    const result = db.query("SELECT * FROM users");
    console.log("Query Result:", result);
    db.disconnect();
}

const mysqlDb = new MySQLDatabase();
performDatabaseOperations(mysqlDb);

const mongoDb = new MongoDBDatabase();
performDatabaseOperations(mongoDb);

//  in this example we have defined an interface Database that has three methods connect, disconnect and query
//  we have implemented this interface in two classes MySQLDatabase and MongoDBDatabase that provide their own implementation of the connect, disconnect and query methods
//  we have a function performDatabaseOperations that takes a Database object as a parameter and performs some operations on it
//  this is an example of abstraction where we are hiding the implementation details of how the database operations are performed and only showing the functionality to the user through the interface

// another one industry standard example of abstraction using abstract classes

abstract class Logger {
    abstract log(message: string): void;

    info(message: string): void {
        this.log(`INFO: ${message}`);
    }

    error(message: string): void {
        this.log(`ERROR: ${message}`);
    }
}

class ConsoleLogger extends Logger {
    log(message: string): void {
        console.log(message);
    }
}

class FileLogger extends Logger {
    log(message: string): void {
        // Simulate writing to a file
        console.log(`Writing to file: ${message}`);
    }
}

const consoleLogger = new ConsoleLogger();
consoleLogger.info("This is an info message.");
consoleLogger.error("This is an error message.");

const fileLogger = new FileLogger();
fileLogger.info("This is an info message.");
fileLogger.error("This is an error message.");

//  in this example we have defined an abstract class Logger that has an abstract method log and two regular methods info and error
//  we have implemented this abstract class in two classes ConsoleLogger and FileLogger that provide their own implementation of the log method
//  we can use the info and error methods from the abstract class to log messages without worrying about the underlying implementation of how the messages are logged
