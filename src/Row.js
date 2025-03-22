import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios.js";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = "https://images.tmdb.org/t/p/w500/"; // Using w500 for reliability

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        console.log("API Response:", request.data.results); // Log for debugging
        setMovies(request.data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row_posters">
          {movies.map((movie) => {
            const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path;
            // Log image paths for debugging
            console.log("Image path for", movie.name || movie.title, ":", imagePath);
            return imagePath ? (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                key={movie.id}
                src={`${base_url}${imagePath}`}
                alt={movie.name || movie.title || "Movie"}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
}

export default Row;