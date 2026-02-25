// mongose connection and schema definition
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rabbitmq", {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

const taskSchema = new mongoose.Schema({
  name: String,
  status: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = {
  connect,
  Task,
};
