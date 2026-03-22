# lets implement a custom mcp of our own, to test the concept of mcp 
# we are a company having some apis and we want to build mcp such that ai models or agents can use our mcp ?

from typing import Any, Dict, List, Optional

class MCP:
    # we use mcp classs to manage our apis and provide a unified interface for ai models or agents to interact with our apis
    def __init__(self):
        self.apis: Dict[str, Any] = {}  # store our apis in a dictionary
    def register_api(self, name: str, api: Any):
        # we can register our apis with a name and the api itself
        self.apis[name] = api
    def call_api(self, name: str, *args, **kwargs) -> Any:
        # we can call our apis by name and pass any arguments or keyword arguments
        if name not in self.apis:
            raise ValueError(f"API '{name}' not found")
        api = self.apis[name]
        return api(*args, **kwargs)  # call the api with the provided arguments
# let's test our mcp with some dummy apis
def dummy_api_1(x: int) -> int:
    return x * 2
def dummy_api_2(name: str) -> str:
    return f"Hello, {name}!"
# create an instance of mcp and register our dummy apis
mcp = MCP()
mcp.register_api("double", dummy_api_1)
mcp.register_api("greet", dummy_api_2)
# now we can call our apis through the mcp
result1 = mcp.call_api("double", 5)  # should return 10
result2 = mcp.call_api("greet", "Alice")  # should return "Hello, Alice!"
print(result1)  # Output: 10
print(result2)  # Output: Hello, Alice!

# how does this helps agents communicate with the mcp of a company 
# this mcp provides a unified interface for agents to interact with the company's apis, allowing them to call the registered apis without needing to know the underlying implementation details.
# agents can simply call the mcp's call_api method with the appropriate api name and parameters, and the mcp will handle the rest, making it easier for agents to integrate with the company's services and functionalities.

# lets build using new fastmcp framework
# we will create a new mcp class that inherits from the FastMCP base class and implement the required methods to register and call apis.


from fastmcp import FastMCP
class MyMCP(FastMCP):
    def __init__(self):
        super().__init__()
        self.apis: Dict[str, Any] = {}
    def register_api(self, name: str, api: Any):
        self.apis[name] = api
    def call_api(self, name: str, *args, **kwargs) -> Any:
        if name not in self.apis:
            raise ValueError(f"API '{name}' not found")
        api = self.apis[name]
        return api(*args, **kwargs)
# we can now use MyMCP to register and call our apis as before, but now we have the benefits of the FastMCP framework, such as better performance and scalability for handling multiple agents and concurrent API calls.
# create an instance of MyMCP and register our dummy apis
my_mcp = MyMCP()
my_mcp.register_api("double", dummy_api_1)
my_mcp.register_api("greet", dummy_api_2)
# now we can call our apis through MyMCP
result1 = my_mcp.call_api("double", 5)  # should return 10
result2 = my_mcp.call_api("greet", "Alice")  # should return "Hello, Alice!"
print(result1)  # Output: 10
print(result2)  # Output: Hello, Alice! 

# here wts the difference btw just api calling and using mcp
# using an mcp provides a layer of abstraction and management for your APIs, allowing you to easily register, organize, and call your APIs in a consistent way. It also allows for better scalability
# and performance when handling multiple agents and concurrent API calls, as the mcp can manage the interactions and ensure that the APIs are called efficiently. Additionally, using an mcp can help with security and access control, as you can implement authentication and authorization mechanisms within the mcp to protect your APIs from unauthorized access.  

# how does this one class mcp help us manage multiple apis and agents
# the mcp class provides a centralized interface for managing multiple APIs and agents. By registering your APIs with the mcp, you can easily organize and access them through a single point of interaction.
# The mcp can handle multiple agents by allowing them to call the registered APIs concurrently, while managing the interactions and ensuring that the APIs are called efficiently. This allows for better scalability and performance when dealing with multiple agents and API calls, as the mcp can optimize the interactions and manage resources effectively. Additionally, the mcp can implement security measures to control access to the APIs, ensuring that only authorized agents can call certain APIs, thus providing a secure environment for managing multiple APIs and agents.   

# example an agent using the mcp to call an api
class Agent:
    def __init__(self, mcp: MyMCP):
        self.mcp = mcp
    def perform_task(self):
        # the agent can call the mcp to use the registered APIs
        result1 = self.mcp.call_api("double", 5)  # should return 10
        result2 = self.mcp.call_api("greet", "Alice")  # should return "Hello, Alice!"
        print(result1)  # Output: 10
        print(result2)  # Output: Hello, Alice!
# create an instance of Agent and pass the MyMCP instance to it
agent = Agent(my_mcp)
# the agent can now perform its task by calling the APIs through the mcp
agent.perform_task()  # Output: 10 and Hello, Alice!   


# the llm shd understand the mcp protocol such that it shd be able to knw when to call wt to call thus mcp provide info of avl apis and how to call them to the llm or agent, allowing it to make informed decisions about which APIs to call based on the task at hand. The mcp can also provide metadata about the APIs, such as their input and output formats, expected parameters, and any constraints or limitations, enabling the llm or agent to use the APIs effectively and efficiently. This way, the mcp serves as a bridge between the llm or agent and the company's APIs, facilitating seamless communication and interaction.

# example of that is below 
class LLM:
    def __init__(self, mcp: MyMCP):
        self.mcp = mcp
    def decide_and_call_api(self, task: str):
        # based on the task, the llm can decide which api to call
        if task == "double":
            result = self.mcp.call_api("double", 5)  # should return 10
            print(result)  # Output: 10
        elif task == "greet":
            result = self.mcp.call_api("greet", "Alice")  # should return "Hello, Alice!"
            print(result)  # Output: Hello, Alice!
        else:
            print("Unknown task")
# create an instance of LLM and pass the MyMCP instance to it
llm = LLM(my_mcp)
# the llm can now decide which api to call based on the task
llm.decide_and_call_api("double")  # Output: 10
llm.decide_and_call_api("greet")  # Output: Hello, Alice!   