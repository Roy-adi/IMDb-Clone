import React from 'react'
import { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import './style.css';
import { getCategoryMovies } from '../service/api';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'; 
import HeroBanner from './HeroBanner';
import CircleRating from './CircleRating';


const UpComing = () => {

  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
 const NOWPLAYING_API_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US';
  const [movies, setMovies] = useState([]);
  const [shuffledMovies, setShuffledMovies] = useState([]);
 
  const searchQuery = useSelector((state) => state.search);

  useEffect(() => {
    getDatas();
  }, [searchQuery]);

  // Fetch movies from the API using Axios
  const getDatas = async () => {

  try {
     
    let apiEndpoint = NOWPLAYING_API_URL;
  
    if (searchQuery) {
      apiEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US`;
    }
            
    let response = await getCategoryMovies(apiEndpoint);
    
    const shuffledMovies = shuffleArray(response.results);  
    if (searchQuery && shuffledMovies.length === 0) {
      // Case 3: No matching movies found, set movies to an empty array
      setMovies(movies);
    } else if (searchQuery) {
      // Case 1: Display matching movies when searchQuery is not empty and matching movies found
      setMovies(shuffledMovies.slice(0, 8));
    } else {
      // Case 2: Display popular movies when searchQuery is empty
      setMovies(shuffledMovies.slice(0, 8));
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
}

  // Shuffle array utility function
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Shuffle movies when movies state updates
  // useEffect(() => {
  //   if (movies.length > 0) {
  //     setShuffledMovies(shuffleArray(movies));
  //   }
  // }, [movies]);

  function formatReleaseDate(releaseDate) {
    const date = new Date(releaseDate);
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString(undefined, options);
  }

  const category = 'TopRated'; // Remove the hyphen



  return (
    <>
    <HeroBanner movies={movies} category={category} />
    <div className='container'>
        <div className='row'>
          <div className='popular-table'>
          <table className="table centered-table">
          <thead>
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Name</th>
              <th scope="col">Release_Date</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
          {movies.slice(0,8).map((popu) => {
            // console.log(popu.id); // Add this line to inspect the 'popu' object
            return (
              <tr key={popu.id} style={{ textAlign: 'center' }}>
              <td>
                <Link to={`/${popu.id}`}>
                  <img
                    className="popular-tables"
                    src={`https://image.tmdb.org/t/p/original${popu.backdrop_path}`}
                    alt={popu.original_title}
                  />
                </Link>
              </td>
              <td>{popu.original_title}</td>
              <td>{formatReleaseDate(popu.release_date)}</td>
              <td>
                <span className='tending-vote'>
                  <CircleRating rating={popu.vote_average.toFixed(1)} />
                </span>
              </td>
            </tr>
            );
          })}
        </tbody>
        
        </table>
          </div>
        </div>
    </div>
    </>
  )
}

export default UpComing