const { DB_URI } = require("./main_configs");
const mongoose = require("mongoose");
const userSchema = require("../models/userModel");
const productSchema = require("../models/productModel");

require("dotenv").config();

/**
 * -------------- DATABASE ----------------
 */

const connection = mongoose.createConnection(DB_URI, { autoIndex: false });

/**
 * -------------- SCHEMA/MODEL SETUP ----------------
 */

connection.model("Users", userSchema);
connection.model("Products", productSchema);

// Expose the connection
module.exports = connection;
