import { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const api_url_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const api_url_tvs = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;
  console.log(api_url_movies, api_url_tvs);

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

      axios.get(api_url_tvs).then((res) => {
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
        setMovieResults(allResults);
      });
    });
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

      {movieResults.map((movieResult) => (
        <div key={movieResult.id}>
          <div>{movieResult.title}</div>
          <div>{movieResult.originalTitle}</div>
          <div>{movieResult.originalLanguage}</div>
          <div>{movieResult.vote_average}</div>
        </div>
      ))}
    </>
  );
}

export default App;
