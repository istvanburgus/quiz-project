import { useEffect, useState } from "react";
import { API_URL, getToken } from "../api";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/questions/random?count=5`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  async function submitToBackend(finalAnswers) {
    const token = getToken();
    if (!token) {
      setResult({ msg: "Not logged in, score not saved." });
      return;
    }

    const res = await fetch(`${API_URL}/api/quiz/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ answers: finalAnswers })
    });

    const data = await res.json();

    if (!res.ok) {
      setResult({ msg: data.error || "Submit failed" });
      return;
    }

    setResult({
      msg: "Score saved",
      score: data.score,
      bestScore: data.bestScore,
      gamesPlayed: data.gamesPlayed
    });
  }

  if (questions.length === 0) return <p>Loading...</p>;

  if (done) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h2>Done</h2>

        {result ? (
          <div style={{ marginTop: "12px" }}>
            <p>{result.msg}</p>
            {typeof result.score === "number" && (
              <>
                <p>Score: {result.score}</p>
                <p>Best: {result.bestScore}</p>
                <p>Games: {result.gamesPlayed}</p>
              </>
            )}
          </div>
        ) : (
          <p>Saving...</p>
        )}
      </div>
    );
  }

  const q = questions[index];

  function next() {
    if (selected === null) return;

    const newAnswers = [
      ...answers,
      { questionId: q._id, selectedIndex: selected }
    ];

    setAnswers(newAnswers);
    setSelected(null);

    if (index === questions.length - 1) {
      setDone(true);
      submitToBackend(newAnswers);
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <p>
        Question {index + 1} / {questions.length}
      </p>

      <h2>{q.question}</h2>

      {q.options.map((opt, i) => {
        const active = selected === i;

        return (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "12px 14px",
              margin: "10px 0",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.12)",
              background: active ? "rgba(0,0,0,0.06)" : "white",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        );
      })}

      <button
  onClick={next}
  className="btn"
  style={{
    cursor: "pointer"
  }}
>
  {index === questions.length - 1 ? "Finish" : "Next"}
</button>
    </div>
  );
}