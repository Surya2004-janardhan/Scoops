// Backend app entry point app with expressjs

const express = require("express");
const connectToDb = require("./db/connectToDb");

const app = express();


// app = server



// Middleware to parse JSON bodies
app.use(express.json());

// run app on port 3000

const PORT = 3000;
// put post get and delete routes here

//localhost:3000/something

connectToDb(); // Connect to the database before starting the server

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/welcome", (req, res) => {
  res.send("Welcome to the Scoops server!");
});

// ### Authentication
// | Method | Endpoint | Description |
// |--------|----------|-------------|
// | POST | `/api/auth/register` | Create new account |
// | POST | `/api/auth/login` | Log in, get JWT token |
// | POST | `/api/auth/logout` | Invalidate session |



// ### User Management

// GET - to get some data from server 
// POST - to send some data to server
// DELETE - to delete some data from server
// PUT - to update some data on server

// endpoints for user registration, login, logout, and fetching user info

app.post("/api/auth/register", (req, res) => {

    // data inside req

    const { username, password } = req.body;

    // here we would normally save the user to the database
    // but for this example, we'll just return a success message

    res.status(201).json({ message: "User registered successfully", username });
});


app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;

    // here we would normally check the user's credentials against the database
    // but for this example, we'll just return a success message and a fake JWT token   

    res.status(200).json({ message: "User logged in successfully", token: "fake-jwt-token" });
});

app.post("/api/auth/logout", (req, res) => {
    // here we would normally invalidate the user's session or JWT token
    // but for this example, we'll just return a success message
    res.status(200).json({ message: "User logged out successfully" });
});

app.post("/api/user/delete", (req, res) => {
    const { username } = req.body;

    // here we would normally delete the user from the database
    // but for this example, we'll just return a success message
    res.status(200).json({ message: `User ${username} deleted successfully` });
});


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
