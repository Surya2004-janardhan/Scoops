// rabbitmq consumer
// connection is established in index.js and we will use that connection to consume messages from the queue we get called from the task endpoint from app server in index.js and we will save that task in the database and then we will update the status of the task to completed after 5 seconds to simulate some work being done

const { connect } = require("./index");
const { Task } = require("./db");

async function consume() {
  try {
    const channel = await connect();
    const queue = "tasks";
    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in ${queue}...`);
    channel.consume(
      queue,
      async (msg) => {
        if (msg !== null) {
          const taskData = JSON.parse(msg.content.toString());
          console.log(`Received task: ${taskData.name}`);
          // Save task to database
          const task = new Task({ name: taskData.name, status: "pending" });
          await task.save();
          console.log(`Task saved to database: ${task.name}`);
          // once consumed
          setTimeout(async () => {
            task.status = "completed";
            await task.save();
            console.log(`Task completed: ${task.name}`);
          }, 5000);
          channel.ack(msg);
        }
      },
      { noAck: false },
    ); //noack : true means that the message will be removed from the queue as soon as it is sent to the consumer, without waiting for an acknowledgment from the consumer. This can lead to message loss if the consumer crashes before processing the message. Setting noAck to false ensures that messages are only removed from the queue after they have been successfully processed and acknowledged by the consumer.
  } catch (error) {
    console.error("Failed to consume tasks", error);
    throw error;
  }
}

module.exports = {
  consume,
};
