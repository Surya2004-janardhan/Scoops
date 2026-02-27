# MongoDB

NoSQL document-oriented database.

## What It Does

- Stores data as JSON-like documents (BSON)
- Flexible schema - no fixed structure required
- Horizontal scaling built-in

## SQL vs MongoDB

| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Primary Key | `_id` field |

## Basic Concepts

| Term | Definition |
|------|------------|
| **Document** | Single record (JSON object) |
| **Collection** | Group of documents |
| **BSON** | Binary JSON (supports more types) |
| **Schema-less** | Documents can have different fields |

## Commands

```bash
# Start MongoDB
docker run -d --name mongodb -p 27017:27017 mongo

# Connect via mongosh
mongosh

# Or with connection string
mongosh mongodb://localhost:27017
```

## Shell Commands

```javascript
// Show all databases
show dbs

// Use/create database
use mydb

// Show collections
show collections

// Insert document
db.users.insertOne({ name: "John", age: 25 })

// Find all
db.users.find()

// Find with filter
db.users.find({ age: { $gt: 20 } })

// Update
db.users.updateOne({ name: "John" }, { $set: { age: 26 } })

// Delete
db.users.deleteOne({ name: "John" })

// Count documents
db.users.countDocuments()
```

## Query Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `$eq` | Equal | `{ age: { $eq: 25 } }` |
| `$ne` | Not equal | `{ age: { $ne: 25 } }` |
| `$gt` | Greater than | `{ age: { $gt: 20 } }` |
| `$gte` | Greater or equal | `{ age: { $gte: 20 } }` |
| `$lt` | Less than | `{ age: { $lt: 30 } }` |
| `$lte` | Less or equal | `{ age: { $lte: 30 } }` |
| `$in` | In array | `{ age: { $in: [20, 25, 30] } }` |
| `$nin` | Not in array | `{ age: { $nin: [20, 25] } }` |
| `$and` | All conditions | `{ $and: [{a:1}, {b:2}] }` |
| `$or` | Any condition | `{ $or: [{a:1}, {b:2}] }` |

## Update Operators

| Operator | Action |
|----------|--------|
| `$set` | Set field value |
| `$unset` | Remove field |
| `$inc` | Increment number |
| `$push` | Add to array |
| `$pull` | Remove from array |

## Mongoose (Node.js)

```javascript
const mongoose = require('mongoose');

// Connect
await mongoose.connect('mongodb://localhost:27017/mydb');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: { type: Number, min: 0 }
});

// Create model
const User = mongoose.model('User', userSchema);

// CRUD operations
await User.create({ name: 'John', email: 'john@example.com' });
await User.find({ age: { $gt: 18 } });
await User.findByIdAndUpdate(id, { age: 25 });
await User.findByIdAndDelete(id);
```

## Medium-Level Topics

### Indexing

```javascript
// Create index
db.users.createIndex({ email: 1 })

// Compound index
db.users.createIndex({ name: 1, age: -1 })

// List indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("index_name")
```

### Aggregation Pipeline

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$userId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

### Stages

| Stage | Purpose |
|-------|---------|
| `$match` | Filter documents |
| `$group` | Group by field |
| `$sort` | Sort results |
| `$project` | Select fields |
| `$limit` | Limit results |
| `$lookup` | Join with another collection |

### Replication

- **Primary**: Accepts writes
- **Secondary**: Replicates from primary
- **Arbiter**: Voting only (no data)
- Automatic failover if primary fails

### Sharding

Horizontal scaling across multiple servers.

- **Shard**: Holds subset of data
- **Config Server**: Stores metadata
- **Mongos**: Query router

### Transactions

```javascript
const session = await mongoose.startSession();
session.startTransaction();
try {
  await User.create([{ name: 'John' }], { session });
  await Account.updateOne({}, { $inc: { balance: -100 } }, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
}
```

## Ports

- **27017** - Default MongoDB port
- **27018** - Shard port
- **27019** - Config server port