// lets implement rabbitmq main code here and there are other 2 files producer and consumer
const amqp = require("amqplib");
const connectDB = require("./db").connect;
const express = require("express");

const consumer = require("./consumer");
const producer = require("./producer");
const app = express();
app.use(express.json());
const PORT = 3000;
async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    throw error;
  }
}

app.post("/tasks", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }
  try {
    const channel = await connect();
    await producer(channel, name);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Failed to create task", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB()
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Database connection failed", error);
    });
});

module.exports = {
  connect,
};
