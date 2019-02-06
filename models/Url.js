const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  url: String,
  key: String
});

//export Url model
module.exports = Url = mongoose.model("urls", UrlSchema);
