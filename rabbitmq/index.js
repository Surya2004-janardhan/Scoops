// lets implement rabbitmq main code here and there are other 2 files producer and consumer
const amqp = require('amqplib');

async function connect() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        throw error;
    }
}

module.exports = {
    connect
};