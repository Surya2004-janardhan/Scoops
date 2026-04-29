oops 

class - template pattern for creating objects
emp
{
    name,
    getSalary,
    age
}
abv is template 

object - instance of a class( ah template pattukoni create chesina oka entity)  car - class - audi, bmw, mercedes - objects of car 

obj1 = new emp("srikanth", 25000, 25)
ob1.getSalary() - 25000 

<!-- 4 pillars  -->
1. Encapsulation - data hiding (private, public, protected)
2. Inheritance - parent child relationship (single, multilevel, hierarchical, multiple)
3. Polymorphism - many forms (method overloading, method overriding)
4. Abstraction - hiding complexity and showing only essential features (abstract classes, interfaces)

<!-- encapsulation -->
defination : wrapping data and methods into a single unit (class) and restricting access to some of the 
object's components (data hiding)

code : 
class emp:
    def __init__(self, name, salary, age):
        self.balance = balance  # private variable
        self.__salary = salary  # private variable
        self.__age = age  # private variable

    def getSalary(self):
        <!-- if account -->
        return self.__salary

    def credit(self):
        self.balance = self.balance + 5000




emp1 = emp("srikanth", 25000, 25)
print(emp1.getSalary())  # 25000

emp1.credit()  # modifying balance (public variable)

print(emp1.__salary)  # AttributeError: 'emp' object has no attribute '__salary'

<!-- y do we need really methods to access private variables? instadd of direct access : 

-->

-- y do we need methods to access private variables? instead of direct access :
1. Control: Methods allow you to control how the private variables are accessed and modified. You can add validation or additional logic before allowing access to the private variables, ensuring that they are used correctly and preventing unintended consequences. 
2. Encapsulation: Using methods to access private variables promotes encapsulation, which is a fundamental principle of object-oriented programming. It allows you to hide the internal implementation details of the class and only expose a controlled interface for interacting with the object's data. This helps to maintain the integrity of the object's state and prevents external code from directly manipulating the private variables, which can lead to bugs or security issues.
<!-- protected keyword -->

protected keyword - in python we can use single underscore to indicate that a variable or method is intended for internal use within the class and its subclasses. It is a convention to indicate that the variable or method should not be accessed directly from outside the class, but it is not enforced by the language.


2. inheritance
defination : mechanism where a new class (child class) is derived from an existing class (parent class) and inherits its properties and behaviors. The child class can also have its own additional properties and behaviors, and can override the inherited ones if needed.

class parent:
    def __init__(self, name):
        self.name = name    

    def display(self):
        print("Name:", self.name)


class child(parent):

    <!-- DEF __INIT__(): -->

    def __init__(self, name, age):
        super().__init__(name)  # calling parent class constructor
        self.some_name = name
        self.age = age

    def display(self):
        super().display()  # calling parent class method
        print("Age:", self.age , "Name:", self.some_name)

CHIND3 = NEW CHILD()
<!-- int a ; a = 10 
int a = 10; -->

child1 = NEW child("srikanth", 25)
child1.display()

<!--constructor -->

constructor - a special method that is automatically called when an object is created. It is used to initialize the object's attributes and set up any necessary resources. In Python, the constructor method is defined using the __init__() method.


3. Polymorphism
defination : ability of an object to take on many forms. It allows objects of different classes to be treated as objects of a common superclass. Polymorphism is achieved through method overriding and method overloading.

class parent:
    def display(self):
        +500
        print("This is the parent class.")

class child(parent):
    def display(self):
        -500


        print("This is the child class.")


parent1 = parent()
child1 = child()
child2 = child()


parent1.display()  # Output: This is the parent class.
child1.display()   # Output: This is the child class.

here the display() method is overridden in the child class, allowing it to provide a different implementation than the parent class. This is an example of polymorphism, as both the parent and child classes can be treated as objects of the same type (parent), but they exhibit different behaviors when the display() method is called.

method overriding - when a child class provides a specific implementation of a method that is already defined in its parent class. The method in the child class has the same name, return type, and parameters as the method in the parent class.

Method overloading - when a class has multiple methods with the same name but different parameters (different number of parameters or different types of parameters). Python does not support method overloading in the traditional sense, but it can be achieved using default arguments or variable-length arguments.
 
 we will use default arguments to achieve method overloading in python
class Calculator:

    def add(self, a, b):
        return a + b

    def add(self, a, b, c=0):
        return a + b + c    

calc = Calculator()
print(calc.add(2, 3))       # Output: 5
print(calc.add(2, 3, 4))    # Output: 9

method overloading : 