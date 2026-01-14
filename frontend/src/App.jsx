import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Ranking from "./pages/Ranking.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
        <Link to="/">Quiz</Link>
        <Link to="/login">Login</Link>
        <Link to="/ranking">Ranking</Link>
      </nav>

      <div
        style={{
          padding: "18px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.08)"
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
    </div>
  );
}
