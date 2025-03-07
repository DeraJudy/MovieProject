// import './App.css'

import { useState, useEffect } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`
  }
}


function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    // to start the loading state as we are fetching the api
    setIsLoading(true);
    // seting the error message to empty because we are just calling the Api
    setErrorMessage('');

    try {
      // Where we want our movies to come from
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);      

      // if response is not okay throw error message
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    } 
    // For Catching Errors
    catch (error) {
      console.error(`Error Fetching Movies: $(error)`);
      setErrorMessage('Error Fetching Movies. Please try again later')
    } finally{
      // To stop loading state
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero Banner" />
            <h1>Find 
              <span className="text-gradient"> Movies</span> 
              You'll Enjoy Without the Hassle
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>

          <section className="all-movies">
            <h2 className="mt-[48px]">All Movies</h2>

            {isLoading ? (
              <Spinner />
            ): errorMessage ? (
              <p>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </section>
        </div>
    </main>
  )
}

export default App
