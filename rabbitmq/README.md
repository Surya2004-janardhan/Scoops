# RabbitMQ

Message broker for async communication between services.

## What It Does

- **Producer** sends messages to a queue
- **Consumer** receives and processes messages
- Decouples services - they don't need to know about each other

## Basic Concepts

| Term | Definition |
|------|------------|
| **Queue** | Buffer that stores messages |
| **Exchange** | Routes messages to queues |
| **Binding** | Link between exchange and queue |
| **Routing Key** | Determines which queue receives message |

## Project Structure

```
rabbitmq/
├── index.js      # Producer server (port 3000)
├── consumer.js   # Consumer server (port 3001)
├── producer.js   # Message sending logic
└── db.js         # MongoDB connection + Task model
```

## Commands

```bash
# Start RabbitMQ server (requires Docker or local install)
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

# Start producer
node index.js

# Start consumer (separate terminal)
node consumer.js

# Test: Send a task
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"name":"my-task"}'
```

## Management UI

Access at `http://localhost:15672` (guest/guest)

## Medium-Level Topics

### Message Durability
- `durable: true` - Queue survives broker restart
- `persistent: true` - Message saved to disk

### Acknowledgment (Ack)
- `noAck: false` - Message removed only after explicit ack
- Prevents message loss if consumer crashes

### Exchange Types

| Type | Behavior |
|------|----------|
| **direct** | Routes by exact routing key |
| **fanout** | Broadcasts to all bound queues |
| **topic** | Routes by pattern matching |
| **headers** | Routes by message headers |

### Dead Letter Queue (DLQ)
- Stores failed/unprocessed messages
- Configure with `x-dead-letter-exchange` argument

### Prefetch Count
```javascript
channel.prefetch(1); // Process one message at a time
```
- Controls how many unacked messages a consumer can have

## Common Patterns

### Work Queue
One producer, multiple consumers sharing work.

### Pub/Sub
One publisher, multiple subscribers get all messages.

### RPC
Request-reply pattern using correlation IDs.

## Ports

- **5672** - AMQP protocol (app connection)
- **15672** - Management UI