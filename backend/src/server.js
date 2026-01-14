import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import questionRoutes from "./routes/questions.js";
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import rankingRoutes from "./routes/ranking.js";

const app = express();

// Perus jutut
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/ranking", rankingRoutes);

app.get("/api/health", (req, res) => {
  // Testi reitti
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;

async function start() {
  // Käynnistys
  await connectDB(process.env.MONGODB_URI);

  app.listen(PORT, () => {
    // Serveri käynnissä
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Startup error:", err.message);
  process.exit(1);
});