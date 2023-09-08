import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import CircleRating from './CircleRating';
import { Link } from 'react-router-dom';
import { setSearchQuery } from '../Store/SearchSlice';
import { useSelector, useDispatch } from 'react-redux'; 

const MoviePoster = () => {
  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
  const NOWPLAYING_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
  const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredMovieCast, setHoveredMovieCast] = useState([]);
  

  const searchQuery = useSelector((state) => state.search);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const fetchData = async () => {
    try {
      let apiEndpoint = NOWPLAYING_API_URL;
  
      if (searchQuery) {
        apiEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US`;
      }
  
      const [nowPlayingResponse, genreResponse] = await Promise.all([
        axios.get(apiEndpoint),
        axios.get(GENRE_API_URL)
      ]);
  
      const shuffledMovies = shuffleArray(nowPlayingResponse.data.results);
      setGenres(genreResponse.data.genres);
  
      if (searchQuery && shuffledMovies.length === 0) {
        // Case 3: No matching movies found, set movies to an empty array
        setMovies(movies);
      } else if (searchQuery) {
        // Case 1: Display matching movies when searchQuery is not empty and matching movies found
        setMovies(shuffledMovies.slice(0, 3));
      } else {
        // Case 2: Display popular movies when searchQuery is empty
        setMovies(shuffledMovies.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const fetchCastData = async (movieId) => {
    try {
      const CAST_API_URL = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
      const response = await axios.get(CAST_API_URL);
      setHoveredMovieCast(response.data.cast);
    } catch (error) {
      console.error('Error fetching cast data:', error);
    }
  };

  const handleHover = (movieId) => {
    setHoveredId(movieId);
    fetchCastData(movieId);
  };

  

  const getGenreName = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.name : 'Unknown';
  };

  const renderMovieCards = () => {
    return movies.map((movie) => (
      <Link
        key={movie.id}
        to={`/${movie.id}`}
        className="card"
        onMouseEnter={() => handleHover(movie.id)}
        onMouseLeave={() => handleHover(null)}
      >
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="details">
          <h1>{movie.title}</h1>
          <h2>{movie.release_date}</h2>
          <div className="rating">
            <span>
              <CircleRating rating={movie.vote_average.toFixed(1)} />
            </span>
          </div>
          <div className="tags">
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <span key={genreId} className="tag">
                {getGenreName(genreId)}
              </span>
            ))}
          </div>
          <p className="desc">
            {movie.overview &&
              `${movie.overview.slice(0, 170)}${
                movie.overview.length > 170 ? '...' : '.'
              }`}
          </p>
          {hoveredId === movie.id && (
            <div className="hovered-cast">
              <h3>Cast</h3>
              <ul>
                {hoveredMovieCast.slice(0, 2).map((actor) => (
                  <li key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                      alt={actor.name}
                      title={actor.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    ));
  };

  return <div className="wrapper">{renderMovieCards()}</div>;
};

export default MoviePoster;
