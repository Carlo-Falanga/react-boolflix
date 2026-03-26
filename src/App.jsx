import { useState } from "react";


function App() {
  
  const [searchQuery, setSearchQuery] = useState('')
  const [movieResults, setMovieResults] = useState([])
  
  const API_KEY = import.meta.env.VITE_API_KEY
  const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
  console.log(api_url);
  

  function getMovieNames(e){
    setSearchQuery(e.target.value)
  }
  console.log(searchQuery);


  

  

  return (
    <>
     <input type="text" name="film_name" id="film_name" placeholder="insert movie name" value={searchQuery} onChange={getMovieNames}/>
     <button onClick={searchMovies}>Search</button>
    </>
  )
}

export default App
