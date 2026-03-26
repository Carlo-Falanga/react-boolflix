import { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesAndTvSeriesResults, setmoviesAndTvSeriesResults] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const api_url_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const api_url_tv_series = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;
  console.log(api_url_movies, api_url_tv_series);

  function getMovieNames(e) {
    setSearchQuery(e.target.value);
  }
  console.log(searchQuery);

  function searchMovies() {
    axios.get(api_url_movies).then((res) => {
      const movies = res.data.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          originalTitle: movie.original_title,
          originalLanguage: movie.original_language,
          voteAverage: movie.vote_average,
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
          };
        });

        const allResults = [...movies, ...tvs];
        setmoviesAndTvSeriesResults(allResults);
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
              {flagCode ? (
                <span className={`fi fi-${flagCode}`}></span>
              ) : (
                movieResult.originalLanguage.toUpperCase()
              )}
            </div>

            <div>{movieResult.voteAverage}</div>
          </div>
        );
      })}
    </>
  );
}

export default App;
