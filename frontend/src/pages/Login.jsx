import { useState } from "react";
import { API_URL, saveToken } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Login failed");
      return;
    }

    saveToken(data.token);
    setMsg("Logged in");
  }

  return (
    <div style={{ maxWidth: "420px" }}>
      <h2>Login</h2>

      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />

        <button className="btn">Login</button>
      </form>

      {msg && <p style={{ marginTop: "12px" }}>{msg}</p>}
    </div>
  );
}