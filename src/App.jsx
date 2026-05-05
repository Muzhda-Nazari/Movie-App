import { useState } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "4ef0393a";

const searchMovie = async () => {
  if (!movie.trim()) {
    setError("Please enter a movie name.");
    setData(null);
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`
    );

    const result = await response.json();

    if (result.Response === "False") {
      setError("No movies found. Try another title.");
      setData(null);
    } else {
      setData(result);
    }
  } catch (error) {
    setError("Something went wrong. Please try again.");
    setData(null);
  }

  setLoading(false);
};

  return (
    <div className="search-box">
      <h1>Movie Finder 🎬</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movie..."
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovie()}
        />
        <button onClick={searchMovie}>Search</button>
      </div>

{loading && <p className="status-message">Loading...</p>}
{error && <p className="error-message">{error}</p>}

{data && data.Search && (
  <div className="movie-list">
    {data.Search.map((item) => (
      <div className="movie-card" key={item.imdbID}>
        <h3>{item.Title}</h3>
<img
  src={item.Poster !== "N/A" ? item.Poster : "https://placehold.co/300x450?text=No+Poster"}
  alt={item.Title}
/>
        <p>{item.Year}</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;