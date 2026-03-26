export default function AppHeader({
  searchQuery,
  getMovieNames,
  searchMovies,
}) {
  return (
    <header>
      <input
        type="text"
        name="film_name"
        id="film_name"
        placeholder="insert movie name"
        value={searchQuery}
        onChange={getMovieNames}
      />
      <button onClick={searchMovies}>Search</button>
    </header>
  );
}
