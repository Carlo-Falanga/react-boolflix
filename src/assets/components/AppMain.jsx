import { useState } from "react";
import axios from "axios";
import placeholderImage from "../images/movie_img_placeholder.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default function AppMain() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesAndTvSeriesResults, setMoviesAndTvSeriesResults] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const api_url_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const api_url_tv_series = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;

  function getMovieNames(e) {
    setSearchQuery(e.target.value);
  }

  function searchMovies() {
    axios.get(api_url_movies).then((res) => {
      const movies = res.data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          originalTitle: movie.original_title,
          originalLanguage: movie.original_language,
          voteAverage: movie.vote_average,
          posterPath: movie.poster_path,
        };
      });

      axios.get(api_url_tv_series).then((res) => {
        const tvs = res.data.results.map((tvSerie) => {
          return {
            id: tvSerie.id,
            title: tvSerie.name,
            originalTitle: tvSerie.original_name,
            originalLanguage: tvSerie.original_language,
            voteAverage: tvSerie.vote_average,
            posterPath: tvSerie.poster_path,
          };
        });

        const allResults = [...movies, ...tvs];
        setMoviesAndTvSeriesResults(allResults);
      });
    });
  }

  function getFlagCode(language) {
    if (language === "en") return "gb";
    if (language === "it") return "it";
    if (language === "ja") return "jp";
    if (language === "es") return "es";
    if (language === "fr") return "fr";
    if (language === "de") return "de";

    return null;
  }

  const posterBaseUrl = "https://image.tmdb.org/t/p/w342";

  function getStars(voteAverage) {
    const rating = Math.ceil(voteAverage / 2);
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesomeIcon className="star" icon={faStarSolid} key={i} />,
        );
      } else {
        stars.push(
          <FontAwesomeIcon className="star" icon={faStarRegular} key={i} />,
        );
      }
    }
    return stars;
  }

  return (
    <>
      <input
        type="text"
        name="film_name"
        id="film_name"
        placeholder="insert movie name"
        value={searchQuery}
        onChange={getMovieNames}
      />
      <button onClick={searchMovies}>Search</button>

      {moviesAndTvSeriesResults.map((movieResult) => {
        const flagCode = getFlagCode(movieResult.originalLanguage);

        return (
          <div key={movieResult.id}>
            <div>{movieResult.title}</div>
            <div>{movieResult.originalTitle}</div>
            <div>
              {movieResult.posterPath ? (
                <img
                  src={`${posterBaseUrl}${movieResult.posterPath}`}
                  alt={movieResult.title}
                />
              ) : (
                <img className="placeholder_img" src={placeholderImage}></img>
              )}
            </div>

            <div>
              {flagCode ? (
                <span className={`fi fi-${flagCode}`}></span>
              ) : (
                movieResult.originalLanguage.toUpperCase()
              )}
            </div>

            <div>{getStars(movieResult.voteAverage)}</div>
          </div>
        );
      })}
    </>
  );
}
