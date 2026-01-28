const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
require("./db");

const Session = require("./models/Session");

const app = express();
app.use(cors());
app.use(express.json());

// create session
app.post("/start", async (req, res) => {
  const sessionId = uuidv4();
  await Session.create({ sessionId });
  res.json({ sessionId });
});

// save first person answers
app.post("/first/:id", async (req, res) => {
  await Session.findOneAndUpdate(
    { sessionId: req.params.id },
    {
      firstRole: req.body.role,
      firstAnswers: req.body.answers
    }
  );
  res.json({ success: true });
});

// save second person answers + calculate score
app.post("/second/:id", async (req, res) => {
  const session = await Session.findOne({ sessionId: req.params.id });

  let score = 0;
  const total = Object.keys(session.firstAnswers).length * 10;

  for (let key in session.firstAnswers) {
    if (session.firstAnswers[key] === req.body.answers[key]) {
      score += 10;
    }
  }

  session.secondAnswers = req.body.answers;
  session.score = Math.round((score / total) * 100);
  await session.save();

  res.json({ success: true });
});

// get result
app.get("/result/:id", async (req, res) => {
  const session = await Session.findOne({ sessionId: req.params.id });
  res.json({ score: session.score });
});

app.listen(5000, () =>
  console.log("🔥 Server running on http://localhost:5000")
);
