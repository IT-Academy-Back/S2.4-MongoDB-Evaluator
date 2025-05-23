const { MongoClient } = require("mongodb");
const chalk = require("chalk");

const MONGO_URI = "mongodb://localhost:27017";
const DATABASE = "nyc";
const COLLECTION = "restaurants";

