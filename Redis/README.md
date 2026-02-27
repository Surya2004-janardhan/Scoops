# Redis

In-memory data store used for caching and rate limiting.

## What It Does

- Stores data in RAM for fast access
- Key-value based storage
- Persists to disk (optional)

## Basic Concepts

| Term | Definition |
|------|------------|
| **Key** | Unique identifier for data |
| **Value** | Data stored (string, list, hash, etc.) |
| **TTL** | Time-to-live (auto-expiry) |
| **Client** | Application connecting to Redis |

## Project Structure

```
Redis/
└── index.js    # Express server with Redis caching + rate limiting
```

## Commands

```bash
# Start Redis server
docker run -d --name redis -p 6379:6379 redis

# Or with redis-cli
redis-server

# Connect to Redis CLI
redis-cli

# Start the app
node index.js

# Test endpoint
curl -X POST http://localhost:3000/test -H "Content-Type: application/json" -d '{"ip":"192.168.1.1"}'
```

## Redis CLI Commands

```bash
# Set a value
SET key "value"

# Get a value
GET key

# Set with expiry (seconds)
SETEX key 60 "value"

# Delete a key
DEL key

# Check if key exists
EXISTS key

# Set TTL on existing key
EXPIRE key 60

# Get remaining TTL
TTL key

# List all keys
KEYS *

# Clear all data
FLUSHALL
```

## Data Types

| Type | Example | Use Case |
|------|---------|----------|
| **String** | `SET name "redis"` | Simple values, counters |
| **List** | `LPUSH queue "item"` | Queues, recent items |
| **Set** | `SADD tags "redis"` | Unique collections |
| **Hash** | `HSET user:1 name "John"` | Objects, user data |
| **Sorted Set** | `ZADD scores 100 "player1"` | Leaderboards |

## Medium-Level Topics

### Caching Pattern

```javascript
// Check cache first
const cached = await client.get(key);
if (cached) return JSON.parse(cached);

// Fetch from DB, store in cache
const data = await fetchData();
await client.set(key, JSON.stringify(data));
await client.expire(key, 3600); // 1 hour TTL
```

### Rate Limiting

```javascript
// Key = IP address
// Value = { count, startTime }
// Check if count exceeds limit within time window
```

### Cache Invalidation

- **TTL-based**: Auto-expires after time
- **Manual**: Delete on data update
- **Pattern**: Delete matching keys with `KEYS pattern`

### Pub/Sub

```javascript
// Subscribe
client.subscribe('channel');

// Publish
client.publish('channel', 'message');
```

### Persistence Options

| Mode | Description |
|------|-------------|
| **RDB** | Snapshots at intervals |
| **AOF** | Logs every write operation |

## Ports

- **6379** - Default Redis port