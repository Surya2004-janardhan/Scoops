// lets implement rabbitmq main code here and there are other 2 files producer and consumer
const connectDB = require("./db").connect;
const express = require("express");

// const consume = require("./consumer"); we dont need consume here because we will run the consumer in a separate process and we will just run the producer in this process and we will call the producer from the task endpoint to produce messages to the queue and then we will consume those messages in the consumer process and we will save those tasks in the database and then we will update the status of the task to completed after 5 seconds to simulate some work being done
const { produce } = require("./producer");
const app = express();
app.use(express.json());
const PORT = 3000;

app.post("/tasks", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required" });
  }
  try {
    const channel = await getChannel();
    await produce(channel, name);
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
