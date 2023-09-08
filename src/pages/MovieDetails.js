import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactModal from 'react-modal';
import './style.css';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CircleRating from './CircleRating';
import Smiler from './Smiler';
import Recomended from './Recomended';

const MovieDetails = () => {
  const { id } = useParams();
  const API_KEY = '4e44d9029b1270a757cddc766a1bcb63';
  const NOWPLAYING_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const VIDEOS_API_URL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;

  const CAST_API_URL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ MovieCast , setMovieCast ] = useState([]);
  const [ director , setDirector ] = useState([])

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const nowPlayingResponse = await axios.get(NOWPLAYING_API_URL);
        setMovieDetails(nowPlayingResponse.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [NOWPLAYING_API_URL]);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      try {
        const response = await axios.get(VIDEOS_API_URL);
        const trailer = response.data.results.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error fetching trailer key:', error);
      }
    };

    fetchTrailerKey();
  }, [VIDEOS_API_URL]);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const response = await axios.get(CAST_API_URL);
        setMovieCast(response.data.cast);
        const crewData = response.data.crew; // Access the crew data
  
        // Filter the crew array to find the director
        const director = crewData.find(member => member.job === 'Director');
        
        // Set the director name in state
        setDirector(director ? director.name : ''); // Set an empty string if no director is found
  
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };
  
    fetchCastData();
  }, [CAST_API_URL]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const backgroundImageUrl = movieDetails
  ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
  : '';

// Create an inline style for the container with the background image
const containerStyle = {
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImageUrl})`,
};

function toHoursAndMinutes(runtimeInMinutes) {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function formatReleaseDate(releaseDate) {
  const date = new Date(releaseDate);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString(undefined, options);
}

  return (
    <>
    <div className="container-fluid all-wrap" style={containerStyle} >
    {movieDetails ? (
      <div className="row">
        {/* Movie Poster */}
        <div className="col-md-3">
          <div className="movie-poster-container">
            <img
              className="movie-poster img-fluid"
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              alt={movieDetails.original_title}
            />
          </div>
        </div>
        
        {/* Movie Details */}
        <div className="col-md-9">
          <div className="movie-details">
            <h2 className="movie-title">{movieDetails.title}</h2>
            <h3 className="movie-tagline">{movieDetails.tagline}</h3>
            <p className="movie-overview">{movieDetails.overview}</p>
            <p className="movie-overview">Director : {director}</p>
            

            <div className="details-container">
            <div className="runtime">
              <h5>RunTime : </h5>
              <span>{toHoursAndMinutes(movieDetails.runtime)}</span>
            </div>
          
            {/* Genres */}
            <div className="tags">
             <h5>Genres : </h5>
              {movieDetails.genres ? (
                movieDetails.genres.slice(0, 2).map((genre) => (
                  <span key={genre.id} className="tag">
                    {genre.name}
                  </span>
                ))
              ) : (
                <span className="tag">Genres not available</span>
              )}
            </div>
          </div>
            <div className='releseDate'> 
            <h5>Release Date : </h5>
            <h5 className="movie-release">{formatReleaseDate(movieDetails.release_date)}</h5> </div> 
            
            {/* Rating */}
            <div className="md-rating">
              <span>
              <h5>IMDB Rating : </h5>
                <CircleRating  rating={movieDetails.vote_average.toFixed(1)} />
              </span>
              <button onClick={openModal} className="button">Trailer</button>
            </div>

            <div className="hovered-cast">
            <h5>CAST : </h5>
            <ul>
              {MovieCast.slice(0, 3).map((actor) => (
                <li key={actor.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                    title={actor.name}
                    className="cast-image"
                  />
                </li>
              ))}
            </ul>
          </div>
            
            
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  
  <div className='smiler'>
  <h3> Smiler Movies </h3>
  <Smiler/>
  </div>
 
  <div className='recomended'>
  <h3> Recomended Movies </h3>
  <Recomended/>
  </div>

      {/* React Modal for the trailer */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer Modal"
        className="trailer-modal"
        overlayClassName="trailer-overlay"
      >
        {/* Add the iframe for the trailer video */}
        {trailerKey && (
          <iframe
            title="Trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}

        <button className="trailer-modal-close" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </ReactModal>
     
     
    </>
  );
};

export default MovieDetails;
