// Backend app entry point app with expressjs

const express = require("express");
const connectToDb = require("./db/connectToDb");
const User = require("./models/User");
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

app.post("/api/auth/register", async (req, res) => {
  // data inside req
  try {
    const { username, email, password } = req.body;
    // let save abv details to user model
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();

    // here we would normally save the user to the database
    // but for this example, we'll just return a success message

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // check whether the username exists
  try {
    const existingUser = await User.findOne({ username: username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    userPassword = existingUser.password;

    if (userPassword !== password) {
      return res.status(401).json({ message: "Invalid password" });
    } else {
      return res.status(200).json({ message: "User logged in successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
});

app.post("/api/auth/logout", (req, res) => {
  // here we would normally invalidate the user's session or JWT token
  // but for this example, we'll just return a success message
  res.status(200).json({ message: "User logged out successfully" });
});

app.post("/api/user/delete", async (req, res) => {
  const { username } = req.body;
  try {
    await User.deleteOne({
      username: username,
    });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }

  // here we would normally delete the user from the database
  // but for this example, we'll just return a success message
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
