// lets implement a simple redis client using node-redis package along with jsonplaceholder api to fetch some data and store it in redis cache

const redis = require("redis");
const axios = require("axios");
const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());

// create a redis client
const client = redis.createClient({
  url: "http://localhost:6379",
});

//  connect to redis server
client.connect((err) => {
  if (err) {
    console.error("Error connecting to redis server", err);
  } else {
    console.log("Connected to redis server");
  }
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
      console.log("Data retrieved from redis cache:", JSON.parse(data));
      return JSON.parse(data);
    } else {
      console.log("No data found in redis cache");
      return null;
    }
  } catch (error) {
    console.error("Error getting data from redis cache", error);
  }
};

app.get("/test", async (req, res) => {
  // if no data in redis cache then fetch data from jsonplaceholder api and store it in redis cache
  const data = await getDataFromCache();
  if (!data) {
    await fetchDataAndStoreInCache();
    const newData = await getDataFromCache();
    res.json(newData);
  } else {
    res.json(data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // fetch data from jsonplaceholder api and store it in redis cache
});
