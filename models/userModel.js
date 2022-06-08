"use strict";

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  phone: Number,
  hash: String,
  salt: String,
  browsers: [String],
});

module.exports = userSchema;
