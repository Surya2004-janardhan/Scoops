// lets write very easy and simple code to understand encapsulation in typescript with each step explanation in comments that too very small lines 

// Encapsulation is a fundamental principle of object-oriented programming that allows us to bundle data and methods that operate on that data within a single unit, called a class. It also restricts direct access to some of the object's components, which can help prevent unintended interference and misuse of the data.

// Let's create a simple class to demonstrate encapsulation in TypeScript.

class Person {
    // We declare a private property 'name' which cannot be accessed directly from outside the class.
    private name: string;

    // The constructor is used to initialize the 'name' property when a new instance of the class is created.
    constructor(name: string) {
        this.name = name;
    }

    // We provide a public method to get the value of the 'name' property. This allows controlled access to the private property.
    public getName(): string {
        return this.name;
    }

    // We also provide a public method to set the value of the 'name' property. This allows us to control how the property is modified.
    public setName(name: string): void {
        this.name = name;
    }
}

// Now we can create an instance of the Person class and use the public methods to interact with the private property.

const person = new Person("Alice");

// We cannot access the 'name' property directly because it is private.
// console.log(person.name); // This will cause an error

// Instead, we use the public method to get the name.
console.log(person.getName()); // Output: Alice

// We can also change the name using the public method.
person.setName("Bob");
console.log(person.getName()); // Output: Bob

// In this example, we have successfully encapsulated the 'name' property within the Person class, allowing controlled access through public methods while keeping the actual data hidden from direct access.

// lets see another example of encapsulation with a more complex class

class BankAccount {
    // We declare a private property 'balance' which cannot be accessed directly from outside the class.
    private balance: number;

    // The constructor is used to initialize the 'balance' property when a new instance of the class is created.
    constructor(initialBalance: number) {
        this.balance = initialBalance;
    }

    // We provide a public method to get the current balance. This allows controlled access to the private property.
    public getBalance(): number {
        return this.balance;
    }

    // We also provide a public method to deposit money into the account. This allows us to control how the balance is modified.
    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        } else {
            console.log("Deposit amount must be positive.");
        }
    }

    // We also provide a public method to withdraw money from the account. This allows us to control how the balance is modified and also to prevent overdrawing.
    public withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log("Withdrawal amount must be positive and less than or equal to the current balance.");
        }
    }
}

// Now we can create an instance of the BankAccount class and use the public methods to interact with the private property.

const account = new BankAccount(1000);

// We cannot access the 'balance' property directly because it is private.
// console.log(account.balance); // This will cause an error

// Instead, we use the public method to get the current balance.
console.log(account.getBalance()); // Output: 1000

// We can deposit money into the account using the public method.
account.deposit(500);
console.log(account.getBalance()); // Output: 1500

// We can also withdraw money from the account using the public method.
account.withdraw(200);  
console.log(account.getBalance()); // Output: 1300

// In this example, we have successfully encapsulated the 'balance' property within the BankAccount class, allowing controlled access through public methods while keeping the actual data hidden from direct access. This helps to ensure that the balance is modified in a controlled manner, preventing unintended interference and misuse of the data.

// lets see a backend particualr example where encapsulation is used to hide the implementation details of a class and only expose the necessary methods to interact with it.

class UserService {
    // We declare a private property 'users' which is an array to store user data. This cannot be accessed directly from outside the class.
    private users: string[] = [];

    // We provide a public method to add a user to the service. This allows us to control how users are added.
    public addUser(user: string): void {
        this.users.push(user);
    }

    // We also provide a public method to get the list of users. This allows controlled access to the private property.
    public getUsers(): string[] {
        return this.users;
    }
}

// Now we can create an instance of the UserService class and use the public methods to interact with the private property.

const userService = new UserService();

// We cannot access the 'users' property directly because it is private.
// console.log(userService.users); // This will cause an error

// Instead, we use the public method to add users.
userService.addUser("Alice");
userService.addUser("Bob");

// We can also get the list of users using the public method.
console.log(userService.getUsers()); // Output: ["Alice", "Bob"]

// In this example, we have successfully encapsulated the 'users' property within the UserService class, allowing controlled access through public methods while keeping the actual data hidden from direct access. This helps to ensure that the user data is modified in a controlled manner, preventing unintended interference and misuse of the data.

// complexe backend eexample that big compaines use for encapsulation
class Database {
    // We declare a private property 'connection' which is an object to represent the database connection. This cannot be accessed directly from outside the class.
    private connection: any;

    // The constructor is used to initialize the database connection when a new instance of the class is created.
    constructor(connectionString: string) {
        this.connection = this.connectToDatabase(connectionString);
    }

    // We provide a private method to establish a connection to the database. This method is not accessible from outside the class.
    private connectToDatabase(connectionString: string): any {
        // Simulating a database connection
        console.log(`Connecting to database with connection string: ${connectionString}`);
        return { connected: true };
    }

    // We also provide a public method to execute a query on the database. This allows us to control how queries are executed.
    public executeQuery(query: string): void {
        if (this.connection && this.connection.connected) {
            console.log(`Executing query: ${query}`);
            // Simulating query execution
        } else {
            console.log("No database connection.");
        }
    }
}

// Now we can create an instance of the Database class and use the public method to interact with the private property.

const database = new Database("mongodb://localhost:27017/mydb");

// We cannot access the 'connection' property directly because it is private.
// console.log(database.connection); // This will cause an error

// Instead, we use the public method to execute a query.
database.executeQuery("SELECT * FROM users"); // Output: Executing query: SELECT * FROM users

// In this example, we have successfully encapsulated the 'connection' property within the Database class, allowing controlled access through public methods while keeping the actual data hidden from direct access. This helps to ensure that the database connection is established and used in a controlled manner, preventing unintended interference and misuse of the data.