// we give function support to index it uses in tasks endpoint to send message to rabbitmq and then we will consume that message in consumer.js and save it to database and update the status of the task to completed after 5 seconds to simulate some work being done
const { connect } = require("./index");
async function produce(task) {
  try {
    const channel = await connect();
    const queue = "tasks";
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), {
      persistent: true,
    });
    console.log(`Sent task: ${task.name}`);
  } catch (error) {
    console.error("Failed to send task", error);
    throw error;
  }
}

module.exports = {
  produce,
};
