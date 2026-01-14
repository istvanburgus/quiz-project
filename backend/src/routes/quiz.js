import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { Question } from "../models/Question.js";
import { User } from "../models/User.js";

const router = Router();

// Lähetetään vastaukset ja lasketaan pisteet
router.post("/submit", auth, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Bad input" });
    }

    const ids = answers.map((a) => a.questionId);
    const questions = await Question.find({ _id: { $in: ids } });

    const map = new Map(questions.map((q) => [q._id.toString(), q.correctIndex]));

    let score = 0;
    for (const a of answers) {
      const correct = map.get(a.questionId);
      if (correct === a.selectedIndex) score++;
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ error: "User not found" });

    user.gamesPlayed += 1;
    if (score > user.bestScore) user.bestScore = score;
    await user.save();

    res.json({ score, bestScore: user.bestScore, gamesPlayed: user.gamesPlayed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;