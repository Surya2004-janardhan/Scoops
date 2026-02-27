# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scoops is a learning project for backend development with multiple microservices demonstrating different backend technologies and patterns.

## Architecture

This is a multi-service Node.js project organized into separate directories:

```
Scoops/
├── Backend/        # Main Express API server (port 3000)
├── rabbitmq/       # RabbitMQ microservice (producer on 3000, consumer on 3001)
├── Redis/          # Redis caching service (port 3000)
├── Docker/         # Docker configuration files and templates
└── mongoDB/        # MongoDB learning notes (not code)
```

### Backend Service
- Express.js REST API with MongoDB (Mongoose)
- User authentication endpoints: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`
- User management: `/api/user/delete`
- Models: `User`, `Post`, `Highlight`
- Database: MongoDB at `mongodb://localhost:27017/scoops`

### RabbitMQ Microservice
- **Producer** (`index.js`): Runs on port 3000, accepts POST `/tasks` requests
- **Consumer** (`consumer.js`): Runs on port 3001, processes tasks from queue
- Queue name: `tasks` (durable)
- Uses MongoDB database: `mongodb://localhost:27017/rabbitmq`

### Redis Service
- Express.js API with Redis caching
- POST `/test` endpoint with IP rate limiting (10 requests/hour)
- Caches JSONPlaceholder API data in Redis
- Redis connection: `redis://localhost:6379`

## Commands

### Backend
```bash
cd Backend
npm install
npm start                    # Runs server.js with nodemon
# Requires MongoDB running on localhost:27017
```

### RabbitMQ Microservice
```bash
cd rabbitmq
npm install

# Terminal 1 - Start producer
node index.js                # Runs on port 3000

# Terminal 2 - Start consumer (separate process)
node consumer.js             # Runs on port 3001

# Requires: RabbitMQ on localhost:5672, MongoDB on localhost:27017
```

### Redis Service
```bash
cd Redis
npm install
node index.js                # Runs on port 3000

# Requires: Redis on localhost:6379
```

### Docker
```bash
# Build images
docker build -t my-node-app .

# Run containers
docker run -p 3000:3000 my-node-app

# Docker Compose
docker-compose up -d
docker-compose down
```

## Key Patterns

- **Database connections**: Each service connects to its database on startup before listening on the port
- **Mongoose models**: Located in `models/` directory with schema definitions
- **RabbitMQ pattern**: Producer sends tasks to queue; consumer acknowledges after processing (5-second simulated delay)
- **Rate limiting**: Redis stores IP addresses with request counts and timestamps

## Dependencies

- Backend: express, mongoose, jsonwebtoken, cors, mysql2, nodemon
- RabbitMQ: amqplib, mongoose, express, axios
- Redis: redis, express, axios, nodemon

## Infrastructure Requirements

- MongoDB: localhost:27017
- RabbitMQ: localhost:5672
- Redis: localhost:6379