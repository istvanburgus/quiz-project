import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Ranking() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/ranking`)
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <div style={{ maxWidth: "600px" }}>
      <h2>Ranking</h2>

      {items.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ol>
          {items.map((u, i) => (
            <li key={i}>
              {u.username} - {u.bestScore}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}