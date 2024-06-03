const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  urlCode: String,
  date: { type: String, default: Date() },
});

const Urls = mongoose.model("Urls", urlSchema);

module.exports = Urls;
