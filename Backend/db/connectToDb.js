// mongoose connection to the database and exporting

// mongodb itself nsql is a NoSQL database, which means it doesn't use tables and rows like a 
// traditional SQL database. Instead, it uses collections and documents. A collection is like
//  a table, and a document is like a row in that table. Each document is a JSON-like object that can have different fields and data types.
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const res = await mongoose.connect("mongodb://localhost:27017/scoops");
    // console.log(res.success);
    if (res) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectToDb;
