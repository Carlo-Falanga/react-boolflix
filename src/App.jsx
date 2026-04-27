import AppMain from "./assets/components/AppMain";
import AppHeader from "./assets/components/AppHeader";
import { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesAndTvSeriesResults, setMoviesAndTvSeriesResults] = useState([]);


    function formControl(e) {
      e.preventDefault()
      axios.get(api_url_movies).then((res) => {
        const movies = res.data.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            originalTitle: movie.original_title,
            originalLanguage: movie.original_language,
            voteAverage: movie.vote_average,
            posterPath: movie.poster_path,
            overview: movie.overview
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
              overview: tvSerie.overview
            };
          });
  
          const allResults = [...movies, ...tvs];
          setMoviesAndTvSeriesResults(allResults);
        });
      });
    }

  

  const API_KEY = import.meta.env.VITE_API_KEY;
  const api_url_movies = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
  const api_url_tv_series = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;

  function getMovieNames(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <AppHeader
        searchQuery={searchQuery}
        getMovieNames={getMovieNames}
        formControl={formControl}
      />
      <AppMain moviesAndTvSeriesResults={moviesAndTvSeriesResults} />
    </>
  );
}

export default App;
