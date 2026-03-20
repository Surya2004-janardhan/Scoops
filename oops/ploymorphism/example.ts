//  one basic example of polymorphism in typescript
class Shape {
  area(): number {
    return 0;
  }
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];

shapes.forEach(shape => {
  console.log(`Area: ${shape.area()}`);
});

// INDUSTRY STANDARD: This code demonstrates polymorphism in TypeScript, where the Shape class defines a method area() that is overridden by the Circle and Rectangle classes. This allows us to treat different shapes uniformly while still providing specific implementations for calculating their areas. Polymorphism is a fundamental concept in object-oriented programming that promotes flexibility and extensibility in code design.

// backend most used example of polymorphism in a Node.js backend context, using Express.js for handling HTTP requests
import express from 'express';

class BaseController {
  constructor(public req: express.Request, public res: express.Response) {}

  sendResponse(data: any) {
    this.res.json(data);
  }
}

class UserController extends BaseController {
  getUser() {
    const user = { id: 1, name: 'John Doe' };
    this.sendResponse(user);
  }
}

class ProductController extends BaseController {
  getProduct() {
    const product = { id: 1, name: 'Laptop', price: 999 };
    this.sendResponse(product);
}
}

const app = express();

app.get('/user', (req, res) => {
  const userController = new UserController(req, res);
  userController.getUser();
});

app.get('/product', (req, res) => {
  const productController = new ProductController(req, res);
  productController.getProduct();
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// INDUSTRY STANDARD: This code demonstrates polymorphism in a Node.js backend context using Express.js. The BaseController class defines a method sendResponse() that is used by both UserController and ProductController to send JSON responses. This allows us to handle different types of requests (for users and products) in a consistent manner while still providing specific implementations for each controller. Polymorphism in this context promotes code reusability and separation of concerns, which are essential principles in backend development.

// another backend based example of polymorphism in a Node.js backend only 
class Logger {
  log(message: string) {
    console.log(`Log: ${message}`);
  }
}

class FileLogger extends Logger {
  log(message: string) {
    // Simulate logging to a file
    console.log(`File Log: ${message}`);
  }
}

class DatabaseLogger extends Logger {
  log(message: string) {
    // Simulate logging to a database
    console.log(`Database Log: ${message}`);
  }
}

function logMessage(logger: Logger, message: string) {
  logger.log(message);
}

const fileLogger = new FileLogger();
const databaseLogger = new DatabaseLogger();

logMessage(fileLogger, "This is a file log message."); // Output: File Log: This is a file log message.
logMessage(databaseLogger, "This is a database log message."); // Output: Database Log: This is a database log message.

// INDUSTRY STANDARD: This code demonstrates polymorphism in a Node.js backend context by defining a Logger class with a log()