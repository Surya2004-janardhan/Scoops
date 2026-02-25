// lets implement a simple redis client using node-redis package along with jsonplaceholder api to fetch some data and store it in redis cache

const redis = require("redis");
const axios = require("axios");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body" });
  }
  return next(err);
});

// create a redis client
// use redis:// protocol for node-redis
const client = redis.createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => {
  console.error("Redis Client Error", err);
});

// function to fetch data from jsonplaceholder api and store it in redis cache
// lets create test endpoint to fetch data from jsonplaceholder api and store it in redis cache
const fetchDataAndStoreInCache = async () => {
  try {
    // fetch data from jsonplaceholder api
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    const data = response.data;
    // store data in redis cache with a key 'posts'
    await client.set("posts", JSON.stringify(data));
    console.log("Data stored in redis cache");
  } catch (error) {
    console.error("Error fetching data from jsonplaceholder api", error);
  }
};

// function to get data from redis cache
const getDataFromCache = async () => {
  try {
    // get data from redis cache with key 'posts'
    const data = await client.get("posts");
    if (data) {
    //   console.log("Data retrieved from redis cache:", JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.log("No data found in redis cache");
      return null;
    }
  } catch (error) {
    console.error("Error getting data from redis cache", error);
  }
};
// lets implement ip rate limiting using redis to limit the number of requests from a single ip address to 100 requests per hour
const rateLimitingMiddleware = async (req, res, next) => {
  try {
    // prefer explicit IP from body, otherwise use request IP
    const ip = req.body?.ip || req.ip;
    console.log("Client IP:", ip);
    const currentTime = Date.now();
    const windowSize = 60 * 60 * 1000;
    const maxRequests = 10;
    const requests = await client.get(ip);
    if (requests) {
      const requestData = JSON.parse(requests);
      if (currentTime - requestData.startTime < windowSize) {
        if (requestData.count < maxRequests) {
          requestData.count += 1;
          await client.set(ip, JSON.stringify(requestData));
          next();
        } else {
          return res.status(429).json({ message: "Too many requests" });
        }
      } else {
        const newRequestData = {
          count: 1,
          startTime: currentTime,
        };
        await client.set(ip, JSON.stringify(newRequestData));
        next();
      }
    } else {
      const newRequestData = {
        count: 1,
        startTime: currentTime,
      };
      await client.set(ip, JSON.stringify(newRequestData));
      next();
    }
  } catch (error) {
    console.error("Error in rate limiting middleware", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

app.post("/test", rateLimitingMiddleware, async (req, res) => {
  try {
    // use below rate limiting middleware to limit the number of requests from a single ip address to 100 requests per hour
    // if no data in redis cache then fetch data from jsonplaceholder api and store it in redis cach
    // to send get request now we shd include ip address in header as x-forwarded-for to test the rate limiting middleware
    //
    const data = await getDataFromCache();
    if (!data) {
      await fetchDataAndStoreInCache();
      const newData = await getDataFromCache();
      return res.json(newData);
    }
    return res.json(data);
  } catch (error) {
    console.error("Error in /test route", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

async function startServer() {
  await client.connect();
  console.log("Connected to redis server");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
