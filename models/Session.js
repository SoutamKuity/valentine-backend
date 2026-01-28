const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  sessionId: String,
  firstRole: String,        // "girl" or "boy"
  firstAnswers: Object,
  secondAnswers: Object,
  score: Number
});

module.exports = mongoose.model("Session", SessionSchema);
