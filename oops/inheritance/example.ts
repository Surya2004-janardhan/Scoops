// Example of inheritance in TypeScript
class Animal {
  constructor(public name: string, public age: number) {}

  makeSound() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age);
  }

  bark() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog("Buddy", 3, "Golden Retriever");
dog.makeSound(); // Output: Buddy makes a sound.
dog.bark(); // Output: Buddy barks.

// INDUSTRY STANDARD: This code demonstrates the use of inheritance in TypeScript, where the Dog class extends the Animal class, allowing it to inherit properties and methods while also adding its own unique functionality. This is a common practice in object-oriented programming to promote code reusability and maintainability.    

// backend inheritance example with industry standard used way in nodejs backend dev
class User {
  constructor(public username: string, public email: string) {}

  getUserInfo() {
    return `Username: ${this.username}, Email: ${this.email}`;
  }
}

class Admin extends User {
  constructor(username: string, email: string, public role: string) {
    super(username, email);
  }

  getAdminInfo() {
    return `${this.getUserInfo()}, Role: ${this.role}`;
  }
}

const admin = new Admin("adminUser", "admin@example.com", "Super Admin");
console.log(admin.getAdminInfo()); // Output: Username: adminUser, Email: admin@example.com, Role: Super Admin

// another example of inheritance in a Node.js backend context, using Express.js for handling HTTP requests
import express from 'express';


class BaseController {
  constructor(public req: express.Request, public res: express.Response) {}

  sendResponse(data: any) {
    this.res.json(data);
  }
}

class UserController extends BaseController {
  getUser() {
    const userData = { id: 1, name: "John Doe" };
    this.sendResponse(userData);
  }
}

const app = express();

app.get('/user', (req, res) => {
  const userController = new UserController(req, res);
  userController.getUser();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// INDUSTRY STANDARD: In this example, we have a BaseController that handles common functionality for sending responses. The UserController extends the BaseController, allowing it to utilize the sendResponse method while also implementing its own specific logic for handling user-related requests. This approach promotes code reuse and separation of

