import { Router } from "express";
import { Question } from "../models/Question.js";

const router = Router();

// Testi: lisätään yksi kysymys
router.post("/test", async (req, res) => {
  try {
    const q = await Question.create({
      question: "Mikä on Suomen pääkaupunki?",
      options: ["Turku", "Tampere", "Helsinki", "Oulu"],
      correctIndex: 2
    });

    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testi: haetaan kaikki kysymykset
router.get("/test", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

// Haetaan satunnaiset kysymykset ilman oikeaa vastausta
router.get("/random", async (req, res) => {
  const count = Math.min(Number(req.query.count) || 10, 50);

  const questions = await Question.aggregate([
    { $sample: { size: count } },
    {
      $project: {
        correctIndex: 0
      }
    }
  ]);

  res.json(questions);
});

export default router;