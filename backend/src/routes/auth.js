import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";


const router = Router();

// Rekisteröinti
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password || password.length < 6) {
      return res.status(400).json({ error: "Bad input" });
    }

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ error: "Username taken" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, passwordHash });

    res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Kirjautuminen
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Testi: kirjautunut käyttäjä
router.get("/me", auth, (req, res) => {
  res.json(req.user);
});

export default router;