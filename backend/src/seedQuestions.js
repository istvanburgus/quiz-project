import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./db.js";
import { Question } from "./models/Question.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  // Luetaan json tiedosto
  const filePath = path.join(__dirname, "data", "questions.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const questions = JSON.parse(raw);

  // Yhdistetään tietokantaan
  await connectDB(process.env.MONGODB_URI);

  // Tyhjennetään vanhat kysymykset
  await Question.deleteMany({});

  // Lisätään uudet kysymykset
  await Question.insertMany(questions);

  console.log(`Seed done: ${questions.length} questions`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err.message);
  process.exit(1);
});