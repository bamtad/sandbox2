import React, { useEffect, useState } from 'react';
import "./Banner.css";
import axios from './axios';
import requests from './requests';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://images.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: `center ${scrollY * 0.5}px`, // Parallax effect
      }}
    >
      <div className="banner_overlay"></div> {/* Dynamic gradient overlay */}
      <div className="banner_contents">
        <h1 className="banner_title">{movie?.title || movie?.name || movie?.original}</h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;