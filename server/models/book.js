const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },

  quantity: Number,
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", bookSchema);
