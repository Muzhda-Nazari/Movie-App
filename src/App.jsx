import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const API_KEY = "4ef0393a";

  useEffect(() => {
    searchMovie("batman");
  }, []);

  const searchMovie = async (searchTerm = movie) => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie name.");
      setData(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
      );

      const result = await response.json();

      if (result.Response === "False") {
        setError("No movies found.");
        setData(null);
      } else {
        setData(result);
      }
    } catch (error) {
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );

      const result = await response.json();

      setSelectedMovie(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">

      <h1>Movie Finder 🎬</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movie..."
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchMovie()}
        />

        <button onClick={() => searchMovie()}>
          Search
        </button>
      </div>

      {loading && <p className="status-message">Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {data && data.Search && (
        <div className="movie-list">

          {data.Search.map((item) => (

            <div
              className="movie-card"
              key={item.imdbID}
              onClick={() => fetchMovieDetails(item.imdbID)}
            >

              <h3>{item.Title}</h3>

              <img
                src={
                  item.Poster !== "N/A"
                    ? item.Poster
                    : "https://placehold.co/300x450?text=No+Image"
                }
                alt={item.Title}
              />

              <p>{item.Year}</p>

            </div>
          ))}

        </div>
      )}

      {selectedMovie && (
        <div className="movie-details">

          <h2>{selectedMovie.Title}</h2>

          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
          />

          <p><strong>Year:</strong> {selectedMovie.Year}</p>

          <p><strong>Genre:</strong> {selectedMovie.Genre}</p>

          <p><strong>IMDb:</strong> {selectedMovie.imdbRating}</p>

          <p>{selectedMovie.Plot}</p>

          <button onClick={() => setSelectedMovie(null)}>
            Close
          </button>

        </div>
      )}

    </div>
  );
}

export default App;