import { Router } from "express";
import { User } from "../models/User.js";

const router = Router();

// Haetaan top-lista
router.get("/", async (req, res) => {
  const top = await User.find({}, { username: 1, bestScore: 1, _id: 0 })
    .sort({ bestScore: -1 })
    .limit(10);

  res.json(top);
});

export default router;