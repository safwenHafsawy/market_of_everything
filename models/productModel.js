const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: { type: String, required: true},
  price: { type: Number, required: true},
  categ: { type: String, required: true},
  desc:  { type: String, required: true},
  region: { type: String, required: true},
  images:  { type: [String], required: true},
  pubDate: { type: Date, required: true},
  author: { type: String, required: true},
});

module.exports = productSchema;
